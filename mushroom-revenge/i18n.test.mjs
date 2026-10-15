import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const script = html.match(/<script>\s*('use strict';[\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'expected inline game script');

function mount({ language='en-US', query='', stored=null, deniedStorage=false, coarsePortrait=false, orientationSupported=true, orientationFails=false }={}){
  const ids=new Map();
  function element(id){
    if(!ids.has(id)){
      const listeners=new Map(),attributes=new Map(),styles=new Map(),captured=[];
      ids.set(id,{
        textContent:'',innerHTML:'',dataset:{},listeners,attributes,styles,captured,
        style:{setProperty(key,value){styles.set(key,value);}},
        getBoundingClientRect(){return {left:0,width:148,top:0,height:76};},
        setPointerCapture(id){captured.push(id);},
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
    matchMedia(query){return {matches:coarsePortrait&&query==='(orientation: portrait) and (pointer: coarse)'};},
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
  assert.ok(html.includes('width:min(96vw,calc((100dvh - 240px)*1.777778))'));
  assert.ok(!html.includes('width:min(100%,1040px)'));
});

test('touch UI provides joystick instead of separate direction buttons',()=>{
  assert.ok(html.includes('class="thumbstick" id="thumbstick"'));
  assert.ok(html.includes('.dpad-buttons{display:none}'));
  assert.ok(html.includes('@media(pointer:coarse)'));
  assert.ok(html.includes('.stage{position:relative;aspect-ratio:16/9'));
  assert.ok(!html.includes('orientation-gate'));
  assert.ok(!html.includes('cameraX'));
  assert.ok(!html.includes('viewWidth'));
  assert.ok(html.includes('canvas id="screen" width="960" height="540"'));
});

function pointer(id,x){
  return {pointerId:id,clientX:x,preventDefault(){}};
}

test('dragging joystick steers left/right proportionally and recenters on release',()=>{
  const page=mount();
  const stick=page.element('thumbstick');
  page.game.start();
  stick.listeners.get('pointerdown')(pointer(1,74));
  assert.equal(page.game.getState().stickValue,0);
  assert.deepEqual(stick.captured,[1]);
  stick.listeners.get('pointermove')(pointer(1,100));
  assert.ok(page.game.getState().input>.5&&page.game.getState().input<.8);
  assert.ok(parseInt(stick.styles.get('--stick-x'),10)>0);
  stick.listeners.get('pointermove')(pointer(1,300));
  assert.equal(page.game.getState().input,1);
  stick.listeners.get('pointermove')(pointer(1,-200));
  assert.equal(page.game.getState().input,-1);
  stick.listeners.get('pointermove')(pointer(99,300));
  assert.equal(page.game.getState().input,-1);
  stick.listeners.get('pointerup')(pointer(1,-200));
  assert.equal(page.game.getState().input,0);
  assert.equal(stick.getAttribute('aria-valuenow'),'0');
  assert.equal(stick.styles.get('--stick-x'),'0px');
});

test('joystick dead zone, canceled touch, pause and restart clear input',()=>{
  const page=mount();
  const stick=page.element('thumbstick');
  page.game.start();
  stick.listeners.get('pointerdown')(pointer(5,76));
  assert.equal(page.game.getState().input,0);
  stick.listeners.get('pointermove')(pointer(5,108));
  assert.ok(page.game.getState().input>.7);
  stick.listeners.get('pointercancel')(pointer(5,108));
  assert.equal(page.game.getState().input,0);
  stick.listeners.get('pointerdown')(pointer(7,118));
  page.element('pause').listeners.get('click')();
  assert.equal(page.game.getState().mode,'pause');
  assert.equal(page.game.getState().input,0);
  page.game.start();
  assert.equal(page.game.getState().input,0);
});

test('left thumb joystick and right jump button work independently',()=>{
  const page=mount();
  const stick=page.element('thumbstick');
  page.game.start();
  stick.listeners.get('pointerdown')(pointer(11,130));
  assert.equal(page.game.getState().input,1);
  page.element('jump').listeners.get('pointerdown')(pointer(12,0));
  assert.ok(page.game.getState().player.vy<0);
  assert.equal(page.game.getState().input,1);
  stick.listeners.get('pointerup')(pointer(11,130));
  assert.equal(page.game.getState().input,0);
});

test('portrait phone is never blocked by a landscape warning screen',async()=>{
  const page=mount({coarsePortrait:true,orientationSupported:false});
  page.element('start').listeners.get('click')();
  assert.equal(page.game.getState().mode,'play');
  assert.equal(await page.game.tryAutoLandscape(),false);
  assert.equal(page.requestedFullscreen,0);
});

test('Start tap opportunistically requests fullscreen landscape on supported browsers',async()=>{
  const page=mount({coarsePortrait:true});
  page.element('start').listeners.get('click')();
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(page.game.getState().mode,'play');
  assert.equal(page.requestedFullscreen,1);
  assert.deepEqual(page.requestedOrientation,['landscape']);
});

test('rotation failures do not interrupt the game',async()=>{
  const page=mount({coarsePortrait:true,orientationFails:true});
  page.game.start();
  assert.equal(await page.game.tryAutoLandscape(),false);
  assert.equal(page.game.getState().mode,'play');
});

test('keyboard controls remain present for desktop users',()=>{
  assert.ok(html.includes("if(k==='arrowleft'||k==='a')pressed.left=true"));
  assert.ok(html.includes("if(k==='arrowright'||k==='d')pressed.right=true"));
  const page=mount();
  const stick=page.element('thumbstick');
  stick.listeners.get('keydown')({key:'ArrowLeft',preventDefault(){}});
  assert.equal(page.game.getState().input,-1);
  stick.listeners.get('keyup')({key:'ArrowLeft'});
  assert.equal(page.game.getState().input,0);
});
