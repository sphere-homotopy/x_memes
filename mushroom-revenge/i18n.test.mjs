import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const script = html.match(/<script>\s*('use strict';[\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'expected inline game script');

function mount({ language='en-US', query='', stored=null, deniedStorage=false, orientationSupported=true, orientationFails=false }={}){
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
    documentElement:{lang:'en'},title:'',getElementById:element,fullscreenElement:null,
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
  let saved=stored, lastUrl=null, requestedFullscreen=0, requestedOrientation=[];
  const windowListeners=new Map();
  const location={href:'https://example.org/x_memes/mushroom-revenge/'+query,search:query};
  const window={
    location, history:{replaceState(_state,_title,newUrl){lastUrl=newUrl;const url=new URL(newUrl);location.href=url.href;location.search=url.search;}},
    localStorage:{
      getItem(){if(deniedStorage)throw Error('storage disabled');return saved;},
      setItem(_key,value){if(deniedStorage)throw Error('storage disabled');saved=value;}
    },
    screen:{orientation:orientationSupported?{async lock(value){requestedOrientation.push(value);if(orientationFails)throw Error('not allowed');}}:{}},
    addEventListener(type,listener){windowListeners.set(type,listener);}
  };
  vm.runInNewContext(script,{document,window,navigator:{language,languages:[language]},
    URL,URLSearchParams,requestAnimationFrame(){},console,Math}, {timeout:1000});
  document.documentElement.requestFullscreen=async()=>{requestedFullscreen++;document.fullscreenElement=document.documentElement;};
  return {game:window.__mushroomGame,document,element,languageButtons,
    get requestedOrientation(){return requestedOrientation;},get requestedFullscreen(){return requestedFullscreen;},
    get saved(){return saved;},get lastUrl(){return lastUrl;}};
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

test('desktop game uses viewport-relative sizing, not a fixed 1040px cap',()=>{
  assert.match(html, /width:min\\(96vw,calc\\(\\(100dvh - 240px\\)\\*1\\.777778\\)\\)/);
  assert.doesNotMatch(html, /width:min\\(100%,1040px\\)/);
});

test('mobile game keeps the original landscape 16:9 world with no portrait camera',()=>{
  assert.match(html, /\\.stage\\{position:relative;aspect-ratio:16\\/9/);
  assert.match(html, /orientation-gate/);
  assert.match(html, /\\(orientation:portrait\\) and \\(pointer:coarse\\)/);
  assert.match(html, /\\.orientation-gate\\{display:flex\\}/);
  assert.doesNotMatch(html, /\\.stage\\{aspect-ratio:1\\/1\\}/);
  assert.doesNotMatch(html, /cameraX|viewWidth|syncViewport/);
  assert.match(html, /canvas id="screen" width="960" height="540"/);
});

test('orientation prompt localizes to Russian and English',()=>{
  const page=mount({language:'ru-RU'});
  assert.equal(page.element('orientation-heading').textContent,'ГОРИЗОНТАЛЬНЫЙ РЕЖИМ');
  page.game.setLanguage('en');
  assert.equal(page.element('orientation-heading').textContent,'LANDSCAPE MODE');
  assert.equal(page.element('orientation-button').textContent,'PLAY LANDSCAPE ▶');
});

test('orientation lock requests fullscreen and landscape after a tap',async()=>{
  const page=mount();
  assert.equal(page.element('orientation-button').listeners.has('click'),true);
  const ok=await page.element('orientation-button').listeners.get('click')();
  // The UI click calls the same promise-returning function exposed for tests.
  assert.equal(ok,undefined);
  assert.equal(page.requestedFullscreen,1);
  assert.deepEqual(page.requestedOrientation,['landscape']);
});

test('unsupported orientation lock gives manual rotation guidance',async()=>{
  const page=mount({language:'ru-RU',orientationSupported:false});
  assert.equal(await page.game.requestLandscape(),false);
  assert.equal(page.requestedFullscreen,0);
  assert.match(page.element('orientation-message').textContent,/вручную/);
});

test('rejected orientation lock gives a fallback instead of breaking the game',async()=>{
  const page=mount({language:'en-US',orientationFails:true});
  page.game.start();
  assert.equal(await page.game.requestLandscape(),false);
  assert.match(page.element('orientation-message').textContent,/rotate your phone/i);
  assert.equal(page.game.getState().mode,'play');
  assert.deepEqual(page.requestedOrientation,['landscape']);
});
