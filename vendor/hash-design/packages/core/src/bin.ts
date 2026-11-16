#!/usr/bin/env node
import { main } from './cli.js';

main(process.argv.slice(2)).catch((err: unknown) => {
  console.error(`hash-design: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
