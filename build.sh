#!/bin/bash
S=src
{ cat $S/01_head.html; echo '<script>'; cat $S/02_app.js $S/03_engine.js $S/04_test.js $S/05_dict.js $S/06_audio.js; for f in $S/1*_v*.js; do cat "$f"; done; cat $S/99_boot.js; echo '</script>'; } > end252e.html
node -e "
const fs=require('fs');const s=fs.readFileSync('end252e.html','utf8');const m=s.match(/<script>([\s\S]*)<\/script>/);
try{new Function(m[1]);console.log('JS syntax OK');}catch(e){console.log('SYNTAX ERROR',e.message);process.exit(1)}
const src=fs.readFileSync('src/04_test.js','utf8');const q=src.match(/const QB = (\[[\s\S]*?\n\]);/);const QB=new Function('return '+q[1])();
const d=fs.readFileSync('src/05_dict.js','utf8');const DICT=new Function(d+';return DICT;')();
const miss=new Set();for(const x of QB){for(const t of [x.q,...x.o,x.e]){for(const w of (t.match(/[A-Za-z][A-Za-z'’\-]*[A-Za-z]|[A-Za-z]/g)||[])){const k=w.toLowerCase().replace(/[’']/g,\"'\");if(!(k in DICT))miss.add(k);}}}
console.log('questions',QB.length,'dict',Object.keys(DICT).length,'missing',[...miss].join(' ')||'none');
const bad=QB.filter(x=>x.o.length!==4||x.c<0||x.c>3);console.log('malformed',bad.length);
"
ls -la end252e.html
