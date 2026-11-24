import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const context=vm.createContext({window:{}});
for(const file of ['theorems.js','theorem-math.js','lessons-integration.js','lessons-series.js','lessons-compactness.js']){
  vm.runInContext(await readFile(new URL(file,import.meta.url),'utf8'),context,{filename:file});
}
const {THEOREMS,THEOREM_MATH,THEOREM_LESSONS}=context.window;
const html=await readFile(new URL('index.html',import.meta.url),'utf8');
test('every theorem has a complete worked lesson and a proof',()=>{
  const ids=THEOREMS.map(t=>t[0]);
  assert.equal(new Set(ids).size,ids.length);
  assert.equal(Object.keys(THEOREM_LESSONS).length,ids.length);
  for(const id of ids){
    const lesson=THEOREM_LESSONS[id];
    assert.ok(lesson,id);
    assert.equal(lesson.steps.length,3,id);
    for(const field of ['title','goal','why','intuition'])assert.ok(lesson[field]?.trim(),id+' '+field);
    for(const step of lesson.steps){assert.equal(step.length,2,id);assert.ok(step.every(s=>s.trim()),id);}
    assert.ok(THEOREM_MATH[id]?.[2]?.trim(),id+' proof');
  }
});
test('math delimiters and TeX braces are balanced',()=>{
  const re=/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;
  for(const [id,l] of Object.entries(THEOREM_LESSONS)){
    for(const source of [...THEOREM_MATH[id],l.goal,l.why,l.intuition,...l.steps.flat()]){
      for(const token of source.split(re)){
        if(!token.startsWith('$')){assert.ok(!token.includes('$'),id);continue;}
        const d=token.startsWith('$$')?2:1;
        const tex=token.slice(d,-d).replace(/\\[{}]/g,'');
        let balance=0;
        for(const ch of tex){if(ch==='{')balance++;if(ch==='}')balance--;assert.ok(balance>=0,id);}
        assert.equal(balance,0,id+' '+tex);
        assert.doesNotMatch(tex,/[\x00-\x1f]/,id);
      }
    }
  }
});
test('reader has an atomic catalogue matching the source files',()=>{
  const payload=JSON.parse(html.match(/<script id="theorem-catalogue" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(JSON.stringify(payload.theorems),JSON.stringify(THEOREMS));
  assert.equal(JSON.stringify(payload.math),JSON.stringify(THEOREM_MATH));
  assert.equal(JSON.stringify(payload.lessons),JSON.stringify(THEOREM_LESSONS));
  assert.ok(html.includes('appendLesson(body,lesson,t[4])'));
  assert.ok(html.includes('Why the hypotheses matter'));
  new vm.Script(html.match(/<script>\s*([\s\S]*?)<\/script>/)[1]);
});


test('X intent is concise and never contains the serialized ranking',()=>{
  const code=html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
  const start=code.indexOf('const publicTierListUrl=');
  const end=code.indexOf('$("tweet").onclick',start);
  assert.ok(start>=0&&end>start);
  const build=new Function('T','tiers','state','lookup',code.slice(start,end)+'\nreturn {text:buildTweet(),intent:tweetIntent()};');
  const tiers=['S','A','B','C','D','F'];
  const ids=THEOREMS.map(t=>t[0]),lookup=new Map(THEOREMS.map(t=>[t[0],t]));
  for(const ranked of [[],['dct','fubini'],ids]){
    const state={S:ranked,A:[],B:[],C:[],D:[],F:[],U:ids.filter(id=>!ranked.includes(id))};
    const {text,intent}=build(THEOREMS,tiers,state,lookup);
    const params=new URL(intent).searchParams;
    assert.equal(params.get('url'),'https://sphere-homotopy.github.io/x_memes/limit-tier-list/');
    assert.equal(params.get('text'),text);
    assert.ok(Array.from(text).length+24<=280);
    if(ranked.length)assert.match(text,/S tier:/);
  }
});
