import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const script = html.match(/<script>\s*('use strict';[\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'expected inline game script');

function mount({ language='en-US', query='', stored=null, deniedStorage=false }={}){
  const ids=new Map();
  function element(id){
    if(!ids.has(id)){
      const listeners=new Map(),attributes=new Map();
      ids.set(id,{
        textContent:'',innerHTML:'',dataset:{},listeners,attributes,
        classList:{add(){},remove(){}},
        addEventListener(type,listener){listeners.set(type,listener);},
        setAttribute(name,value){attributes.set(name,value);},
        getAttribute(name){return attributes.get(name);},
        getContext(){return {};}
      });
    }
    return ids.get(id);
  }
  const languageButtons=['en','ru'].map(lang=>{
    const b=element('language-'+lang);
    b.dataset.lang=lang;return b;
  });
  const document={
    documentElement:{lang:'en'},title:'',getElementById:element,
    querySelector(selector){
      if(selector==='.cabinet')return element('cabinet');
      if(selector==='.language-switch')return element('language-switch');
      throw Error('Unknown selector: '+selector);
    },
    querySelectorAll(selector){
      if(selector==='[data-lang]')return languageButtons;
      throw Error('Unknown selectorAll: '+selector);
    },
    addEventListener(){}
  };
  let saved=stored, lastUrl=null;
  const location={href:'https://example.org/x_memes/mushroom-revenge/'+query,search:query};
  const window={
    location, history:{replaceState(_state,_title,newUrl){lastUrl=newUrl;const url=new URL(newUrl);location.href=url.href;location.search=url.search;}},
    localStorage:{
      getItem(){if(deniedStorage)throw Error('storage disabled');return saved;},
      setItem(_key,value){if(deniedStorage)throw Error('storage disabled');saved=value;}
    },
    addEventListener(){}
  };
  vm.runInNewContext(script,{document,window,navigator:{language,languages:[language]},
    URL,URLSearchParams,requestAnimationFrame(){},console,Math}, {timeout:1000});
  return {game:window.__mushroomGame,document,element,languageButtons,get saved(){return saved;},get lastUrl(){return lastUrl;}};
}

test('the static page has English text before JS runs',()=>{
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Mushroom vs\. Mario — Mini Game<\/title>/);
  assert.match(html, /id="heading">MUSHROOM REVENGE/);
  assert.match(html, /href="\.\.\/go\/kofi\/mushroom-revenge\/"/);
});

test('auto-selects Russian only for Russian browser language',()=>{
  for(const language of ['ru-RU','ru','ru-BY']){
    const page=mount({language});
    assert.equal(page.game.getState().locale,'ru');
    assert.equal(page.document.documentElement.lang,'ru');
    assert.equal(page.element('start').textContent,'НАЧАТЬ ИГРУ ▶');
    assert.equal(page.element('score-label').textContent,'МАРИО');
  }
  for(const language of ['en-US','en-GB','sr-Latn-RS','de-DE']){
    const page=mount({language});
    assert.equal(page.game.getState().locale,'en');
    assert.equal(page.document.documentElement.lang,'en');
    assert.equal(page.element('start').textContent,'START GAME ▶');
    assert.equal(page.element('score-label').textContent,'MARIO');
  }
});

test('explicit URL wins over saved preference and browser language',()=>{
  assert.equal(mount({language:'ru-RU',query:'?lang=en',stored:'ru'}).game.getState().locale,'en');
  assert.equal(mount({language:'en-US',query:'?lang=ru',stored:'en'}).game.getState().locale,'ru');
  assert.equal(mount({language:'en-US',query:'?lang=invalid',stored:'ru'}).game.getState().locale,'ru');
  assert.equal(mount({language:'en-US',stored:'ru'}).game.getState().locale,'ru');
});

test('manual EN/RU switch persists and does not reset the game',()=>{
  const page=mount({language:'en-US'});
  const [english,russian]=page.languageButtons;
  page.game.start();
  const before=page.game.getState();
  russian.listeners.get('click')();
  assert.equal(page.game.getState().mode,'play');
  assert.equal(page.game.getState().seconds,before.seconds);
  assert.equal(page.game.getState().locale,'ru');
  assert.equal(page.element('pause').textContent,'Ⅱ ПАУЗА');
  assert.equal(page.element('help').textContent.includes('Пробел'),true);
  assert.equal(page.saved,'ru');
  assert.match(page.lastUrl,/lang=ru/);
  assert.equal(russian.getAttribute('aria-pressed'),'true');
  assert.equal(english.getAttribute('aria-pressed'),'false');
  page.element('pause').listeners.get('click')();
  assert.equal(page.element('heading').textContent,'ПАУЗА');
  english.listeners.get('click')();
  assert.equal(page.game.getState().mode,'pause');
  assert.equal(page.element('heading').textContent,'PAUSED');
  assert.equal(page.element('pause').textContent,'▶ RESUME');
  assert.equal(page.element('start').textContent,'CONTINUE ▶');
  assert.equal(page.document.documentElement.lang,'en');
  assert.match(page.lastUrl,/lang=en/);
});

test('works when browser denies localStorage',()=>{
  const page=mount({language:'ru-RU',deniedStorage:true});
  assert.equal(page.game.getState().locale,'ru');
  page.game.setLanguage('en');
  assert.equal(page.game.getState().locale,'en');
});
