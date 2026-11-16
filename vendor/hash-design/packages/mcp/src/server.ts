import { existsSync, readFileSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  BANS,
  BRANCHES,
  type BranchFamily,
  type Constraints,
  type RollJson,
  briefJson,
  buildComparePage,
  compareEntriesFromRoll,
  compareSubtitle,
  critiquePage,
  getBranch,
  parseRef,
  readSkill,
  renderBranch,
  renderBranchList,
  renderBrief,
  renderCritique,
  renderRoll,
  renderRollSummary,
  reproduce,
  roll,
  writeRoll,
} from 'hash-design';
import { z } from 'zod';

const here = dirname(fileURLToPath(import.meta.url));
export const SERVER_VERSION = (
  JSON.parse(readFileSync(join(here, '..', 'package.json'), 'utf8')) as { version: string }
).version;

const FAMILIES = ['print', 'document', 'signage', 'screen', 'craft', 'modernist'] as const;

/** Constraint fields shared by roll_designs / get_brief / critique_page. Flat on purpose: easier for models. */
const constraintShape = {
  light_only: z.boolean().optional().describe('Only light palettes.'),
  dark_only: z.boolean().optional().describe('Only dark palettes (branches without one are skipped).'),
  reduced_motion: z.boolean().optional().describe('Force the stillest motion option of each branch.'),
  brand_colors: z
    .array(z.string().regex(/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/))
    .max(2)
    .optional()
    .describe('Brand colours that must be kept: [accent] or [accent, accent2], hex.'),
  families: z.array(z.enum(FAMILIES)).optional().describe('Restrict the branch pool to these families.'),
  include_branches: z.array(z.string()).optional().describe('Restrict the branch pool to these branch ids.'),
  exclude_branches: z.array(z.string()).optional().describe('Remove these branch ids from the pool.'),
};

type ConstraintArgs = {
  light_only?: boolean | undefined;
  dark_only?: boolean | undefined;
  reduced_motion?: boolean | undefined;
  brand_colors?: string[] | undefined;
  families?: BranchFamily[] | undefined;
  include_branches?: string[] | undefined;
  exclude_branches?: string[] | undefined;
};

function toConstraints(a: ConstraintArgs): Constraints {
  return {
    lightOnly: Boolean(a.light_only),
    darkOnly: Boolean(a.dark_only),
    reducedMotion: Boolean(a.reduced_motion),
    brandColors: a.brand_colors ?? [],
    families: a.families ?? [],
    include: a.include_branches ?? [],
    exclude: a.exclude_branches ?? [],
  };
}

const text = (t: string) => ({ type: 'text' as const, text: t });

function fail(err: unknown) {
  return { isError: true, content: [text(`Error: ${err instanceof Error ? err.message : String(err)}`)] };
}

export function bansMarkdown(): string {
  const lines = ['# hash-design global bans', ''];
  for (const b of BANS)
    lines.push(`- **${b.title.zh} / ${b.title.en}** (\`${b.id}\`, ${b.severity}) — ${b.detail}`);
  return lines.join('\n');
}

export const SERVER_INSTRUCTIONS = `hash-design breaks the default "AI page" aesthetic with external randomness.
Workflow: roll_designs (true-random hashes → N distinct frozen briefs) → render ONE independent HTML preview per brief,
following it literally → build_compare_page → STOP and let the user pick a number → build the final page from the
picked brief only → critique_page with brief_ref to self-check. Never choose a style yourself; never "improve" a brief
toward your own taste; never invent facts. Load the hash-design Skill (or the hash-design://workflow resource) for the
full procedure.`;

export function createServer(): McpServer {
  const server = new McpServer(
    { name: 'hash-design', version: SERVER_VERSION },
    { instructions: SERVER_INSTRUCTIONS },
  );

  server.registerTool(
    'roll_designs',
    {
      title: 'Roll design directions',
      description:
        'Roll N true-random SHA-256 hashes (crypto.randomBytes) and map each, through a fixed decision tree, onto a distinct design direction (branch, layout, type, palette, density, motion, motif, anchor, scale, surface, voice, twist). Returns the hashes, the mapping trace and one frozen Markdown brief per direction. Use `seed` only to reproduce examples. Pass `out_dir` to freeze the briefs on disk (roll.json, ROLL.md, briefs/NN-<branch>.md) — recommended, then render each preview from its own brief file.',
      inputSchema: {
        subject: z.string().describe('What the page is for, e.g. "第四巷面包店 一页站".'),
        facts: z
          .array(z.string())
          .optional()
          .describe(
            'The only facts the page may state (hours, prices, address…). Nothing else may be invented.',
          ),
        count: z.number().int().min(1).max(12).optional().describe('How many directions (default 5).'),
        seed: z.string().optional().describe('Reproducible roll for examples/tests. Omit for real use.'),
        language: z
          .enum(['zh', 'en'])
          .optional()
          .describe('Page language (default: auto-detect from subject/facts).'),
        out_dir: z
          .string()
          .optional()
          .describe('Directory (relative to the server cwd) to write roll.json, ROLL.md and briefs/*.md.'),
        detail: z
          .enum(['full', 'summary'])
          .optional()
          .describe(
            'full = every brief inline; summary = table + refs (default: summary when out_dir is set).',
          ),
        ...constraintShape,
      },
      annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const r = roll({
          count: args.count ?? 5,
          ...(args.seed !== undefined ? { seed: args.seed } : {}),
          constraints: toConstraints(args),
          content: {
            subject: args.subject,
            facts: args.facts ?? [],
            ...(args.language ? { language: args.language } : {}),
          },
        });
        const detail = args.detail ?? (args.out_dir ? 'summary' : 'full');
        const parts: string[] = [];
        if (args.out_dir) {
          const written = await writeRoll(r, args.out_dir);
          parts.push(renderRollSummary(r));
          parts.push(
            `Frozen to \`${relative(process.cwd(), written.dir) || '.'}\`:\n${written.files.map((f) => `- ${f}`).join('\n')}`,
          );
          if (detail === 'full') parts.push(renderRoll(r));
        } else {
          parts.push(detail === 'full' ? renderRoll(r) : renderRollSummary(r));
        }
        parts.push(
          'Next: render one self-contained HTML preview per brief (only that brief in view, follow it literally), save as previews/NN-<branch>.html, then call build_compare_page and stop for the user to choose.',
        );
        const machine = {
          source: r.source,
          library: r.library,
          constraints: r.constraints,
          designs: r.designs.map((d, i) => ({ number: i + 1, ref: d.ref, branch: d.branch.id })),
        };
        return { content: [text(parts.join('\n\n')), text(JSON.stringify(machine))] };
      } catch (err) {
        return fail(err);
      }
    },
  );

  server.registerTool(
    'get_brief',
    {
      title: 'Reproduce a brief',
      description:
        'Rebuild the brief for a design ref ("<64-hex hash>" or "<hash>+<probe>") with the same constraints that were used for the roll. Deterministic: the same ref + constraints + library always gives the same brief.',
      inputSchema: {
        ref: z.string().describe('Design ref from roll_designs, e.g. "3fa9…c1" or "3fa9…c1+1".'),
        subject: z.string().optional(),
        facts: z.array(z.string()).optional(),
        language: z.enum(['zh', 'en']).optional(),
        format: z.enum(['markdown', 'json']).optional(),
        ...constraintShape,
      },
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
    },
    async (args) => {
      try {
        const design = reproduce(parseRef(args.ref), toConstraints(args));
        const content = {
          subject: args.subject ?? '',
          facts: args.facts ?? [],
          ...(args.language ? { language: args.language } : {}),
        };
        const body =
          args.format === 'json'
            ? JSON.stringify(briefJson(design, content), null, 2)
            : renderBrief(design, content);
        return { content: [text(body)] };
      } catch (err) {
        return fail(err);
      }
    },
  );

  server.registerTool(
    'list_branches',
    {
      title: 'List design branches',
      description: `List the ${BRANCHES.length} design branches (real-world design genres) in mapping order.`,
      inputSchema: { family: z.enum(FAMILIES).optional() },
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
    },
    async (args) => ({ content: [text(renderBranchList(args.family ? { family: args.family } : {}))] }),
  );

  server.registerTool(
    'get_branch',
    {
      title: 'Get a design branch',
      description:
        'Full detail of one branch: concept, references, tokens and every option per dimension (layouts, type pairings, palettes, motion, motifs, anchors, surfaces).',
      inputSchema: { id: z.string(), format: z.enum(['markdown', 'json']).optional() },
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
    },
    async (args) => {
      const b = getBranch(args.id);
      if (!b) return fail(new Error(`Unknown branch "${args.id}". Call list_branches for valid ids.`));
      return { content: [text(args.format === 'json' ? JSON.stringify(b, null, 2) : renderBranch(b))] };
    },
  );

  server.registerTool(
    'critique_page',
    {
      title: 'Critique a page for AI-template tells',
      description:
        'Static critique of an HTML page (inline <style>, style attributes and optional extra CSS) against the global bans: banned fonts, purple-blue gradients, centered hero + two buttons, identical cards, glassmorphism, emoji icons, buzzwords, soft shadows, invented social proof, framework palettes, scroll fades, pill badges, placeholders, template sections, contrast. With brief_ref (or roll_path + pick) it also scores adherence to the brief (fonts, palette, radius/shadow policy). Provide either html or path.',
      inputSchema: {
        html: z.string().optional().describe('Full HTML source.'),
        path: z.string().optional().describe('Path to an HTML file (relative to the server cwd).'),
        css: z.string().optional().describe('Extra CSS not inlined in the HTML.'),
        brief_ref: z.string().optional().describe('Design ref to check adherence against.'),
        roll_path: z
          .string()
          .optional()
          .describe('roll.json written by roll_designs (alternative to brief_ref).'),
        pick: z.number().int().min(1).optional().describe('Design number inside roll_path.'),
        facts: z
          .array(z.string())
          .optional()
          .describe('Facts; numbers on the page not in the facts are flagged.'),
        format: z.enum(['markdown', 'json']).optional(),
        ...constraintShape,
      },
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
    },
    async (args) => {
      try {
        const html = args.html ?? (args.path ? await readFile(resolve(args.path), 'utf8') : undefined);
        if (!html) throw new Error('Provide html or path.');
        let design;
        let facts = args.facts;
        if (args.roll_path) {
          const r = JSON.parse(await readFile(resolve(args.roll_path), 'utf8')) as RollJson;
          const entry = r.designs.find((d) => d.number === args.pick);
          if (!entry) throw new Error(`pick must be one of ${r.designs.map((d) => d.number).join(', ')}`);
          design = reproduce(parseRef(entry.ref), r.constraints);
          facts ??= r.content.facts;
        } else if (args.brief_ref) {
          design = reproduce(parseRef(args.brief_ref), toConstraints(args));
        }
        const result = critiquePage({
          html,
          ...(args.css ? { css: args.css } : {}),
          ...(design ? { design } : {}),
          ...(facts?.length ? { facts } : {}),
        });
        return {
          content: [text(args.format === 'json' ? JSON.stringify(result, null, 2) : renderCritique(result))],
        };
      } catch (err) {
        return fail(err);
      }
    },
  );

  server.registerTool(
    'build_compare_page',
    {
      title: 'Build the side-by-side compare page',
      description:
        'Write compare.html next to roll.json: every preview in a scaled iframe side by side, with branch/palette/type labels, desktop/mobile toggle and focus mode (keys 1–9). Expects previews at <previews_dir>/NN-<branch>.html.',
      inputSchema: {
        roll_path: z.string().describe('roll.json written by roll_designs (relative to the server cwd).'),
        out_path: z.string().optional().describe('Default: compare.html next to roll.json.'),
        previews_dir: z.string().optional().describe('Relative to roll.json (default "previews").'),
        briefs_dir: z.string().optional().describe('Relative to roll.json (default "briefs").'),
        title: z.string().optional(),
      },
      annotations: { readOnlyHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (args) => {
      try {
        const rollPath = resolve(args.roll_path);
        const r = JSON.parse(await readFile(rollPath, 'utf8')) as RollJson;
        const out = resolve(args.out_path ?? join(dirname(rollPath), 'compare.html'));
        const base = dirname(out);
        const previewDir = relative(base, resolve(dirname(rollPath), args.previews_dir ?? 'previews')) || '.';
        const briefDir = relative(base, resolve(dirname(rollPath), args.briefs_dir ?? 'briefs')) || '.';
        const entries = compareEntriesFromRoll(r, { previewDir, briefDir });
        const missing = entries.filter((e) => !existsSync(resolve(base, e.preview))).map((e) => e.preview);
        await mkdir(base, { recursive: true });
        await writeFile(
          out,
          buildComparePage({
            title: args.title ?? r.content.subject,
            subtitle: compareSubtitle(r),
            entries,
            generatedAt: new Date().toISOString().slice(0, 10),
            language: r.content.language,
          }),
          'utf8',
        );
        const lines = [`Wrote ${relative(process.cwd(), out)} (${entries.length} previews).`];
        if (missing.length)
          lines.push(`Missing previews — render them first:\n${missing.map((m) => `- ${m}`).join('\n')}`);
        lines.push('Now show the compare page to the user and STOP until they pick a number.');
        return { content: [text(lines.join('\n\n'))] };
      } catch (err) {
        return fail(err);
      }
    },
  );

  server.registerPrompt(
    'hash-design',
    {
      title: 'Design a page with hash-design',
      description: 'Start the full roll → 5 previews → compare → pick → build workflow.',
      argsSchema: {
        subject: z.string().describe('What the page is for.'),
        facts: z.string().optional().describe('Facts, one per line.'),
        count: z.string().optional().describe('Number of directions (default 5).'),
      },
    },
    (args) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              `Use hash-design to design: ${args.subject}`,
              args.facts
                ? `Facts (the only content allowed):\n${args.facts}`
                : 'No facts supplied: ask me for them before writing copy.',
              '',
              `1. Call roll_designs with count=${args.count ?? '5'}, the subject and facts, out_dir="design/hash-design". Do not pass a seed.`,
              '2. For each brief in design/hash-design/briefs, read only that brief and write a self-contained preview to design/hash-design/previews/<same name>.html. Follow it literally.',
              '3. Run critique_page with roll_path + pick on each preview; fix every critical/major finding.',
              '4. Call build_compare_page, show me compare.html, and STOP. Wait for my number.',
              '5. Build the final page from the chosen brief only, then critique it again.',
            ].join('\n'),
          },
        },
      ],
    }),
  );

  server.registerResource(
    'bans',
    'hash-design://bans',
    {
      title: 'Global bans',
      description: 'The anti-AI-template ban list copied into every brief.',
      mimeType: 'text/markdown',
    },
    async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: bansMarkdown() }] }),
  );

  server.registerResource(
    'workflow',
    'hash-design://workflow',
    {
      title: 'Workflow (Skill)',
      description: 'The hash-design Skill: full agent workflow.',
      mimeType: 'text/markdown',
    },
    async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: readSkill() }] }),
  );

  server.registerResource(
    'branches',
    'hash-design://branches',
    {
      title: 'Branch library',
      description: 'All design branches in mapping order.',
      mimeType: 'text/markdown',
    },
    async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: renderBranchList() }] }),
  );

  server.registerResource(
    'branch',
    new ResourceTemplate('hash-design://branch/{id}', {
      list: async () => ({
        resources: BRANCHES.map((b) => ({
          uri: `hash-design://branch/${b.id}`,
          name: `${b.name.en} / ${b.name.zh}`,
          mimeType: 'text/markdown',
        })),
      }),
    }),
    {
      title: 'Branch detail',
      description: 'One design branch with every option.',
      mimeType: 'text/markdown',
    },
    async (uri, { id }) => {
      const b = getBranch(String(id));
      if (!b) throw new Error(`Unknown branch ${String(id)}`);
      return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text: renderBranch(b) }] };
    },
  );

  return server;
}
