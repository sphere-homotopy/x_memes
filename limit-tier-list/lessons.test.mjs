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
test('reader loads lesson files before rendering and has valid JavaScript',()=>{
  for(const file of ['lessons-integration.js','lessons-series.js','lessons-compactness.js']){
    assert.ok(html.indexOf(file)>0);
    assert.ok(html.indexOf(file)<html.indexOf('function appendLesson'));
  }
  assert.ok(html.includes('appendLesson(body,lesson,t[4])'));
  assert.ok(html.includes('Why the hypotheses matter'));
  new vm.Script(html.match(/<script>\s*([\s\S]*?)<\/script>/)[1]);
});
