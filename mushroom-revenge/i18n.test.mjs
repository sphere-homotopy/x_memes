import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const script = html.match(/<script>\s*('use strict';[\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'expected inline game script');

function mount({ language='en-US', query='', stored=null, deniedStorage=false, mobilePortrait=false }={}){
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
  let saved=stored, lastUrl=null, portrait=mobilePortrait;
  const windowListeners=new Map();
  const location={href:'https://example.org/x_memes/mushroom-revenge/'+query,search:query};
  const window={
    location, history:{replaceState(_state,_title,newUrl){lastUrl=newUrl;const url=new URL(newUrl);location.href=url.href;location.search=url.search;}},
    localStorage:{
      getItem(){if(deniedStorage)throw Error('storage disabled');return saved;},
      setItem(_key,value){if(deniedStorage)throw Error('storage disabled');saved=value;}
    },
    matchMedia(query){return {matches:portrait&&query==='(max-width: 700px) and (orientation: portrait)'};},
    addEventListener(type,listener){windowListeners.set(type,listener);}
  };
  vm.runInNewContext(script,{document,window,navigator:{language,languages:[language]},
    URL,URLSearchParams,requestAnimationFrame(){},console,Math}, {timeout:1000});
  return {game:window.__mushroomGame,document,element,languageButtons,
    resize(isPortrait){portrait=isPortrait;windowListeners.get('resize')?.();},
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
  assert.match(html, /width:min\(96vw,calc\(\(100dvh - 240px\)\*1\.777778\)\)/);
  assert.doesNotMatch(html, /width:min\(100%,1040px\)/);
});

test('portrait mobile renders a square camera view and switches on resize',()=>{
  assert.match(html, /@media\(max-width:700px\) and \(orientation:portrait\)/);
  assert.match(html, /\.stage\{aspect-ratio:1\/1\}/);
  assert.match(html, /\.key\{width:clamp\(56px,17vw,75px\)/);
  const page=mount({mobilePortrait:true});
  assert.equal(page.game.getState().viewWidth,540);
  assert.equal(page.element('screen').width,540);
  assert.equal(page.element('screen').height,540);
  page.game.start();
  const before=page.game.getState();
  page.resize(false);
  assert.equal(page.game.getState().viewWidth,960);
  assert.equal(page.element('screen').width,960);
  assert.equal(page.game.getState().mode,'play');
  assert.equal(page.game.getState().seconds,before.seconds);
  page.resize(true);
  assert.equal(page.game.getState().viewWidth,540);
});

test('mobile camera follows the player without changing physics world size',()=>{
  assert.match(html, /const W=960,H=540,FLOOR=462/);
  assert.match(html, /Math\.max\(0,Math\.min\(W-viewWidth,player\.x\+player\.w\/2-viewWidth\*\.44\)\)/);
  assert.match(html, /ctx\.translate\(-Math\.round\(cameraX\),0\)/);
  const page=mount({mobilePortrait:true,language:'en-US'});
  page.game.start();
  assert.equal(page.game.getState().player.x,80);
  assert.equal(page.game.getState().viewWidth,540);
});
