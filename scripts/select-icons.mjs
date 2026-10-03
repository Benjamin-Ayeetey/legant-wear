import {readFile, writeFile} from 'node:fs/promises';
const all = JSON.parse(await readFile('node_modules/@iconify-json/solar/icons.json', 'utf8'));
const html = await readFile('index.html', 'utf8');
const names = [...html.matchAll(/data-icon="([^"]+)/g)].map(m => m[1]);
await writeFile('src/icons.json', JSON.stringify({icons:Object.fromEntries([...new Set(names)].map(name => [name, all.icons[name]]))}));
