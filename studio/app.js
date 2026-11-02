import { generate, historyEntries, reproduce, signature, LIBRARY } from '../src/core/index.js';
import { pageHtml, tokensCss, brief } from '../src/render.js';
import { graphicSvg } from '../src/core/graphics.js';
import { mergeHistory } from './history-browser.js';

const $ = s => document.querySelector(s), KEY = 'random-design.history.v1';
let language = localStorage.getItem('random-design.language') ?? 'zh';
let history = [], current, locked, selectedId;
const messages = {
  zh: { headline: '给每次表达，<br>一个新主题。', intro: '颜色、字体、构图与图形一起生成。选择一个方向，把它带到网页或幻灯片。', privacy: '无需账号或 API 密钥。设计在浏览器内生成，历史保存在此浏览器。', scenario: '使用场景', mode: '明暗范围', intensity: '视觉强度', count: '方案数量', brand: '锁定品牌色', generate: '生成下一组方向 ↗', examples: '示例', exportHistory: '导出历史', importHistory: '导入历史', importDesign: '打开规范', ready: '准备好探索下一组方向', directions: '你的候选方向', compareHint: '同一份示例内容，比较视觉差异。点击放大后选择。', method1: '连续参数生成配色；构图规则与程序图形组合成统一的视觉语言。', method2: '筛掉精确重复与近期过近的主题。差异指标是属性比较，不代表审美评分。', method3: '下载网页、设计规范、SVG 或六页可编辑 PPTX。文字内容与风格分开管理。', footer: '字体按需从 Google Fonts 加载；离线时使用本机替代字体。PPTX 不嵌入字体。所有数据仅为示例。', close: '关闭 ×', select: '选择此方向', selected: '已选择 ✓', expand: '放大', explore: '锁定后继续探索', palette: '颜色', font: '字体', graphic: '图形', composition: '构图' },
  en: { headline: 'A new expression.<br>Every time.', intro: 'Colour, type, composition and graphics, generated together. Take a direction to the web or the slide.', privacy: 'No account or API key. Designs are generated here; history stays in this browser.', scenario: 'SCENARIO', mode: 'LIGHT / DARK', intensity: 'INTENSITY', count: 'DIRECTIONS', brand: 'Lock brand colour', generate: 'Generate next directions ↗', examples: 'Examples', exportHistory: 'Export history', importHistory: 'Import history', importDesign: 'Open design', ready: 'Ready for the next direction', directions: 'Your visual directions', compareHint: 'Same content. Different expressions. Open a preview to choose.', method1: 'Continuous colour parameters meet composition rules and procedural graphics.', method2: 'Reject exact duplicates and nearby recent themes. Attribute distance is not an aesthetic score.', method3: 'Download a page, specification, SVG or six editable PowerPoint slides. Content stays separate.', footer: 'Fonts load from Google Fonts when online; local fallbacks apply offline. PPTX fonts are not embedded. All data is illustrative.', close: 'Close ×', select: 'Choose direction', selected: 'Selected ✓', expand: 'Enlarge', explore: 'Explore with locks', palette: 'Palette', font: 'Type', graphic: 'Graphic', composition: 'Layout' }
};
function t(k) { return messages[language][k]; }
function notice(text) { $('#notice').textContent = text; $('#notice').hidden = !text; }
function persist() { localStorage.setItem(KEY, JSON.stringify({ schema: 1, entries: history })); }
try { history = mergeHistory(JSON.parse(localStorage.getItem(KEY) ?? '{"entries":[]}').entries); }
catch (err) { notice(`History could not be loaded: ${err.message}. Export or repair it before generating.`); $('#generate').disabled = true; }
function applyLanguage() {
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => { const value = t(el.dataset.i18n); if (el.dataset.i18n === 'headline') el.innerHTML = value; else el.textContent = value; });
  $('#language').textContent = language === 'zh' ? 'EN' : '中文';
  localStorage.setItem('random-design.language', language);
  if (current) render();
}
function download(name, text, type = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 5000);
}
function addButton(parent, label, handler) {
  const b = document.createElement('button'); b.textContent = label;
  b.onclick = async () => { b.disabled = true; try { await handler(); } catch (err) { notice(err.message); } finally { b.disabled = false; } };
  parent.append(b); return b;
}
function render() {
  const root = $('#results'); root.replaceChildren();
  current.designs.forEach((d, i) => {
    const card = document.createElement('article'); card.className = 'design-card' + (selectedId === d.id ? ' selected' : '');
    const head = document.createElement('div'); head.className = 'design-head';
    const h = document.createElement('h3'); h.textContent = `${String(i + 1).padStart(2, '0')} / ${d.name[language]}`;
    const id = document.createElement('small'); id.textContent = d.id.slice(0, 10); head.append(h, id);
    const wrap = document.createElement('div'); wrap.className = 'preview-wrap'; wrap.tabIndex = 0; wrap.setAttribute('role', 'button'); wrap.setAttribute('aria-label', `${t('expand')} ${d.name[language]}`);
    const iframe = document.createElement('iframe'); iframe.title = d.name[language]; iframe.sandbox = 'allow-same-origin'; iframe.srcdoc = pageHtml(d, { language }); iframe.loading = 'lazy'; wrap.append(iframe);
    const open = () => { $('#preview-title').textContent = d.name[language]; $('#preview-frame').srcdoc = pageHtml(d, { language }); $('#preview').showModal(); };
    wrap.onclick = open; wrap.onkeydown = ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(); } };
    const bottom = document.createElement('div'); bottom.className = 'card-bottom';
    const swatches = document.createElement('div'); swatches.className = 'swatches';
    for (const k of ['paper', 'ink', 'accent', 'accent2']) { const s = document.createElement('span'); s.style.background = d.palette[k]; s.title = `${k} ${d.palette[k]}`; swatches.append(s); }
    const type = document.createElement('span'); type.className = 'card-type'; type.textContent = `${d.typography.display} / ${d.typography.cjk}`; bottom.append(swatches, type);
    const actions = document.createElement('div'); actions.className = 'actions';
    addButton(actions, selectedId === d.id ? t('selected') : t('select'), async () => { selectedId = d.id; const entry = history.find(h => h.id === d.id); if (entry) entry.status = 'selected'; persist(); render(); });
    addButton(actions, 'JSON', () => download(`${d.id.slice(0, 10)}.json`, JSON.stringify(d, null, 2), 'application/json'));
    addButton(actions, 'HTML', () => download('page.html', pageHtml(d, { language }), 'text/html'));
    addButton(actions, 'PPTX', async () => { const { createPresentation } = await import('../src/pptx.js'); await createPresentation(d, { language }).writeFile({ fileName: 'random-design-theme.pptx' }); });
    addButton(actions, 'SVG', () => download('graphic.svg', graphicSvg(d), 'image/svg+xml'));
    addButton(actions, 'CSS', () => download('tokens.css', tokensCss(d), 'text/css'));
    addButton(actions, 'Brief', () => download('brief.md', brief(d, { language })));
    const locks = document.createElement('div'); locks.className = 'locks';
    for (const field of ['palette', 'font', 'graphic', 'composition']) {
      const label = document.createElement('label'), checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.dataset.lock = field; checkbox.setAttribute('aria-label', `Lock ${field}`); label.append(checkbox, document.createTextNode(t(field))); locks.append(label);
    }
    addButton(locks, t('explore'), () => {
      locked = {};
      locks.querySelectorAll('input:checked').forEach(input => { const f = input.dataset.lock; locked[f] = f === 'font' ? d.typography.id : f === 'graphic' ? d.graphic.family : f === 'composition' ? d.layout.composition : d.palette; });
      if (!Object.keys(locked).length) throw new Error(language === 'zh' ? '请至少勾选一个锁定项。' : 'Select at least one dimension to lock.');
      return doGenerate();
    });
    card.append(head, wrap, bottom, actions, locks); root.append(card);
    new ResizeObserver(() => { iframe.style.transform = `scale(${wrap.clientWidth / 1200})`; }).observe(wrap);
  });
}
async function doGenerate(initial = false) {
  $('#generate').disabled = true; notice(''); $('#status').textContent = language === 'zh' ? '正在生成与比较…' : 'Generating and comparing…';
  await new Promise(resolve => setTimeout(resolve, 30));
  try {
    const operation = async () => {
      // Re-read under Web Locks to coordinate tabs on supported browsers.
      history = mergeHistory(JSON.parse(localStorage.getItem(KEY) ?? '{"entries":[]}').entries);
      const request = { count: Number($('#count').value), scenario: $('#scenario').value, mode: $('#mode').value, intensity: $('#intensity').value, language, locks: locked ?? {} };
      if ($('#brand-toggle').checked) request.brand = $('#brand').value;
      const next = generate(request, history);
      const nextHistory = mergeHistory(history, historyEntries(next));
      localStorage.setItem(KEY, JSON.stringify({ schema: 1, entries: nextHistory }));
      history = nextHistory; current = next; selectedId = null; render();
      $('#status').textContent = language === 'zh' ? `${history.length} 个已见方向 · 本轮 ${next.designs.length} 套 · 规则 ${LIBRARY.slice(0, 8)}` : `${history.length} seen · ${next.designs.length} directions · rules ${LIBRARY.slice(0, 8)}`;
    };
    if (navigator.locks) await navigator.locks.request(KEY, operation); else await operation();
  } catch (err) { notice(err.message); $('#status').textContent = language === 'zh' ? '未生成新方案；请调整限制后再试。' : 'No new set. Adjust the constraints and retry.'; }
  finally { locked = undefined; $('#generate').disabled = false; }
}
$('#generate').onclick = () => doGenerate();
$('#language').onclick = () => { language = language === 'zh' ? 'en' : 'zh'; applyLanguage(); };
$('#close-preview').onclick = () => $('#preview').close();
$('#history-export').onclick = () => download('random-design-history.json', JSON.stringify({ schema: 1, entries: history }, null, 2), 'application/json');
$('#history-import').onchange = async ev => {
  try { const data = JSON.parse(await ev.target.files[0].text()); history = mergeHistory(history, data.entries); persist(); notice(language === 'zh' ? `已合并 ${history.length} 条历史。` : `Merged ${history.length} history entries.`); $('#generate').disabled = false; } catch (err) { notice(err.message); } finally { ev.target.value = ''; }
};
$('#design-import').onchange = async ev => {
  try { const data = JSON.parse(await ev.target.files[0].text()); const designs = reproduce(data); current = { designs }; history = mergeHistory(history, historyEntries({ designs })); persist(); render(); notice(''); } catch (err) { notice(err.message); } finally { ev.target.value = ''; }
};
applyLanguage();
if (!$('#generate').disabled) doGenerate(true);
