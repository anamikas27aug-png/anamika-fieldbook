/* One page-local score. The shared ScrollCraft engine remains unchanged. */
(() => {
  'use strict';
  const release = document.documentElement.dataset.release;
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const phone = () => innerWidth <= 760;
  const clamp = n => Math.max(0, Math.min(1, n));
  const ease = n => { const p = clamp(n); return p * p * (3 - 2 * p); };
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const money = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
  const data = [
    {name:'Groceries',amount:3200,category:'Essentials'}, {name:'Rent',amount:4000,category:'Essentials'},
    {name:'Dining',amount:1800,category:'Lifestyle'}, {name:'Shopping',amount:1200,category:'Lifestyle'},
    {name:'Music plan',amount:600,category:'Subscriptions'}, {name:'Learning plan',amount:1200,category:'Subscriptions'}
  ];
  const projects = {
    'rupeeradar':{name:'RupeeRadar',description:'Turning bank statements into categorized spending insights, recurring patterns, and better questions.'},
    'job-agent':{name:'AI Job Agent',description:'Bringing scattered opportunities together through natural-language search, validation, and deduplication.'},
    'chief-of-staff':{name:'AI Chief of Staff',description:'An AI assistant for email and scheduling, with a review step before a draft becomes an action.'}
  };
  const categories = ['Essentials','Lifestyle','Subscriptions'];
  const questions = {Essentials:'Which costs are fixed, and which can vary?',Lifestyle:'Does this spending reflect what matters to you?',Subscriptions:'Are both plans still useful? A recurring cost is a prompt for a question.'};
  const sums = Object.fromEntries(categories.map(c => [c,data.filter(t => t.category === c).reduce((n,t) => n + t.amount,0)]));
  const total = data.reduce((n,t) => n+t.amount,0);
  const storage = {read(key){try{return localStorage.getItem(key);}catch{return null;}},write(key,val){try{localStorage.setItem(key,val);}catch{}}};
  let saved;
  try { saved=JSON.parse(storage.read('anamika-fieldnotes')||'{}'); } catch {saved={};}
  if (!saved || typeof saved !== 'object') saved={};
  let selected = categories.includes(saved.category) ? saved.category : 'Subscriptions';
  let selection = Array.isArray(saved.projects) ? [...new Set(saved.projects.filter(id => Object.hasOwn(projects,id)))] : [];
  let userOff = storage.read('anamika-motion') === 'off';
  let disabled = userOff || reduced.matches;
  let stableHeight = innerHeight, stableWidth = innerWidth;
  let short = stableHeight < 520;
  let frame = 0, frames = 0;
  let instance, manual = null, paintedLab = 0;
  let railTravel = 0, lastStage = -1;
  const cover=$('.cover'), question=$('.question-page'), lab=$('.notebook-act'), canvas=$('#lab-canvas');
  const track=$('.project-track'), projectAct=$('.project-act'), specimens=$$('.specimen');
  const notes=$$('.txn-note'), result=$('.lab-result'), ledger=$('.career-ledger');
  const learning=$('.toolkit-spread'), closing=$('.conversation-page');
  const caseBeats=$$('[data-case-beat]');
  const stageButtons=$$('[data-lab-step]');
  const nav=$('.bookmarks'), menu=$('.chapter-toggle'), motionButton=$('.motion-toggle');
  function persist(){storage.write('anamika-fieldnotes',JSON.stringify({category:selected,projects:selection}));}
  function exportText(name,text){
    const blob=new Blob([text],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob);
    const link=document.createElement('a');link.href=url;link.download=name;document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
  }
  function insight(){return `${selected}: ${money(sums[selected])} of ${money(total)} (${Math.round(sums[selected]/total*100)}%).`;}
  function updateSelection(){
    $$('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===selected)));
    $$('.chosen-insight strong,.saved-insight strong').forEach(e=>e.textContent=insight());
    $$('.chosen-insight p,.saved-insight p').forEach(e=>e.textContent=questions[selected]);
    $$('[data-save-project]').forEach(b=>{
      const on=selection.includes(b.dataset.saveProject);b.setAttribute('aria-pressed',String(on));
      b.textContent=on?'Saved to my fieldnotes ✓':'Save to my fieldnotes +';
    });
    const list=$('.saved-projects');
    if(list){
      list.replaceChildren();
      selection.forEach(id=>{
        const item=document.createElement('div');item.className='saved-project';
        const title=document.createElement('strong');title.textContent=projects[id].name;
        const desc=document.createElement('p');desc.textContent=projects[id].description;
        const button=document.createElement('button');button.type='button';button.textContent='Remove';button.setAttribute('aria-label',`Remove ${projects[id].name} from fieldnotes`);
        button.addEventListener('click',()=>{selection=selection.filter(p=>p!==id);persist();updateSelection();schedule();});
        item.append(title,desc,button);list.append(item);
      });
      $('.card-instruction').textContent=selection.length?'Projects that caught your curiosity, plus the insight you explored.':'Save a project that interests you. Your notebook insight is already here.';
    }
    schedule();
  }
  $$('[data-save-project]').forEach(button=>button.addEventListener('click',()=>{
    const id=button.dataset.saveProject;
    selection=selection.includes(id)?selection.filter(p=>p!==id):[...selection,id];
    persist();updateSelection();
  }));
  $$('[data-category]').forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.category;manual=1;persist();updateSelection();schedule();}));
  $('.download-note')?.addEventListener('click',()=>exportText('anamika-clarity-note.txt',[
    'THE CLARITY NOTEBOOK','Six synthetic transactions. An explanatory demo inspired by RupeeRadar.','',
    ...data.map(t=>`${t.name}: ${money(t.amount)} (${t.category})`),'',`Total: ${money(total)}`,
    ...categories.map(c=>`${c}: ${money(sums[c])} (${Math.round(sums[c]/total*100)}%)`),'',insight(),questions[selected],'No personal financial data was used.'
  ].join('\n')));
  $('.download-conversation')?.addEventListener('click',()=>exportText('anamika-conversation-starter.txt',[
    'A CONVERSATION STARTER WITH ANAMIKA SINGH','Business analysis · AI & automation','',
    'Projects I would like to discuss:',...(selection.length?selection.flatMap(id=>[projects[id].name,projects[id].description,'']):['No projects selected yet.','']),
    'My sample notebook insight:',insight(),questions[selected],'','The notebook uses synthetic sample data. Projects are personal learning projects.',
    'Connect: https://www.linkedin.com/in/anamika-singh082793/'
  ].join('\n')));
  $('.print-conversation')?.addEventListener('click',()=>window.print());
  function closeMenu(){nav?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');}
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu?.focus();}});
  function preference(){
    disabled=userOff||reduced.matches;
    root.classList.toggle('motion-off',disabled);
    if(motionButton){motionButton.textContent=disabled?'Motion off':'Motion on';motionButton.setAttribute('aria-pressed',String(disabled));motionButton.disabled=reduced.matches;}
    const reason=$('.motion-reason');
    if(reason){reason.hidden=!disabled;reason.textContent=reduced.matches?'Motion follows your device’s reduced-motion setting.': 'Reading mode is on. Tap Motion off to bring the fieldbook to life.';}
  }
  motionButton?.addEventListener('click',()=>{
    const anchor=$$('[data-sc-act]').find(el=>{const r=el.getBoundingClientRect();return r.top<=stableHeight*.35&&r.bottom>stableHeight*.35;});
    const visual=anchor?.querySelector('[data-sc-stage]')||anchor;
    const before=visual?.getBoundingClientRect().top;
    userOff=!userOff;storage.write('anamika-motion',userOff?'off':'on');manual=null;
    preference();layout();
    if(visual&&before!==undefined)scrollBy({top:visual.getBoundingClientRect().top-before,behavior:'instant'});
    schedule();
  });
  reduced.addEventListener('change',()=>{preference();layout();schedule();});
  function layout(){
    short=stableHeight<520;root.classList.toggle('short-window',short);
    root.style.setProperty('--book-vh',stableHeight+'px');
    if(lab){lab.dataset.scAct=disabled||short?'flow':'pin';lab.dataset.scSpan=phone()?'4.6':'4.4';lab.style.setProperty('--scene-span',lab.dataset.scSpan);}
    if(projectAct){projectAct.dataset.scAct=disabled||short?'flow':'pan';projectAct.dataset.scSpan=phone()?'3.2':'3.4';projectAct.style.setProperty('--scene-span',projectAct.dataset.scSpan);}
    if(instance){instance.acts.forEach(act=>{act.device=act.el.dataset.scAct||'flow';act.pinned=['pin','pan','scrub'].includes(act.device);act.span=Number(act.el.dataset.scSpan)||1;});instance.layout();}
    if(track)railTravel=Math.max(0,track.scrollWidth-innerWidth);
    schedule();
  }
  function flow(el,start=.94,end=.3){if(!el||disabled)return 1;return ease((stableHeight*start-el.getBoundingClientRect().top)/(stableHeight*(start-end)));}
  function progress(el){
    if(!el)return 0;
    const r=el.getBoundingClientRect();
    if(short)return clamp((stableHeight*.83-r.top)/(Math.max(r.height,stableHeight)*.8));
    return clamp(-r.top/Math.max(el.offsetHeight-stableHeight,1));
  }
  function paint(el,key,value){if(el)el.style.setProperty(key,value.toFixed(4));}
  function report(el,values,hold=false){
    if(!el)return;
    el.dataset.scVerifyState=Object.entries(values).map(([k,v])=>`${k}:${Number(v).toFixed(2)}`).join(';');
    if(hold)el.dataset.scVerifyHold='true';else delete el.dataset.scVerifyHold;
  }
  function drawNotebook(p){
    const grouping=ease((p-.08)/.34),line=ease((p-.23)/.27),strips=ease((p-.53)/.19),resolving=ease((p-.63)/.18),grow=ease((p-.77)/.18);
    paint(canvas,'--group',grouping);paint(canvas,'--line-draw',line);paint(canvas,'--strip',strips);paint(canvas,'--strip-opacity',Math.min(1,strips*3)*(1-resolving));paint(canvas,'--resolve',resolving);paint(canvas,'--chart-grow',grow);
    const scatter=[[22,23,-9],[75,30,8],[28,49,5],[77,59,-7],[21,79,-5],[69,82,9]],group=[[20,34],[20,70],[50,34],[50,70],[80,34],[80,70]];
    const box=canvas.getBoundingClientRect();
    notes.forEach((note,i)=>{
      const [x,y,r]=scatter[i],g=group[i];
      note.style.left=x+'%';note.style.top=y+'%';
      const dx=(g[0]-x)/100*box.width*grouping,dy=(g[1]-y)/100*box.height*grouping;
      note.style.transform=`translate(-50%,-50%) translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) rotate(${(r*(1-grouping)).toFixed(2)}deg) scale(${(1-grouping*.15).toFixed(3)})`;
      note.style.opacity=(1-resolving).toFixed(3);
      note.setAttribute('aria-hidden',String(resolving>.95&&!disabled));
    });
    const final=resolving>.99||disabled;
    result.classList.toggle('is-interactive',final);result.inert=!final;result.setAttribute('aria-hidden',String(!final));
    const stage=p<.27?0:p<.73?1:2;
    if(stage!==lastStage){lastStage=stage;stageButtons.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.labStep)===stage)));$('#lab-status').textContent=['Gather the details','Find the connections','Ask a better question'][stage];}
    const resume=$('.resume-scroll');if(resume)resume.hidden=manual===null||disabled;
    report(canvas,{group:grouping,links:line,strips:Math.min(1,strips*3)*(1-resolving),chart:resolving,bars:grow},p>=.96||disabled);
  }
  stageButtons.forEach(button=>button.addEventListener('click',()=>{manual=[0,.48,1][Number(button.dataset.labStep)];schedule();}));
  $('.resume-scroll')?.addEventListener('click',()=>{manual=null;schedule();});
  $$('[data-project-jump]').forEach(button=>button.addEventListener('click',()=>jumpProject(Number(button.dataset.projectJump),true)));
  function jumpProject(index,smooth=false){
    if(!projectAct)return;
    if(disabled||short){specimens[index]?.scrollIntoView({block:'center',behavior:'instant'});return;}
    const wanted=Math.max(0,(specimens[index]?.offsetLeft||0)-parseFloat(getComputedStyle(track).paddingLeft));
    const p=clamp(wanted/Math.max(railTravel,1));
    scrollTo({top:scrollY+projectAct.getBoundingClientRect().top+(projectAct.offsetHeight-stableHeight)*p,behavior:smooth?'smooth':'instant'});
  }
  track?.addEventListener('focusin',event=>{
    const item=event.target.closest('.specimen');
    if(!item||disabled||short)return;
    const box=item.getBoundingClientRect();
    if(box.left<0||box.right>innerWidth)jumpProject(specimens.indexOf(item));
  });
  if(ledger){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('career-path');svg.setAttribute('viewBox','0 0 4 100');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d','M2 0 L2 100');path.setAttribute('pathLength','1');svg.append(path);ledger.prepend(svg);}
  function near(el){if(!el)return false;const r=el.getBoundingClientRect();return disabled||r.bottom>-stableHeight*.5&&r.top<stableHeight*1.5;}
  function update(){
    frame=0;frames++;
    if(document.hidden)return;
    if(near(cover)){const p=disabled?0:clamp(-cover.getBoundingClientRect().top/(cover.offsetHeight*.82));paint(cover,'--cover-p',p);report(cover,{far:p*-65,portrait:p*(phone()?-100:-130),near:p*(phone()?-145:-200),edge:(1-p)*115});}
    if(near(question)){const p=flow(question,.95,.12);paint(question,'--question-entry',ease(p/.68));paint(question,'--question-second',ease((p-.12)/.75));report(question,{first:ease(p/.68),second:ease((p-.12)/.75)});}
    if(near(lab)){const target=disabled?1:manual===null?progress(lab):manual;paintedLab=manual!==null&&!disabled?paintedLab+(target-paintedLab)*.17:target;if(Math.abs(paintedLab-target)<.002)paintedLab=target;drawNotebook(paintedLab);if(paintedLab!==target)schedule();}
    if(near(projectAct)){const p=disabled?1:progress(projectAct),x=disabled||short?0:-railTravel*p;track.style.setProperty('--rail-x',x.toFixed(2)+'px');
      specimens.forEach((item,i)=>{const r=item.getBoundingClientRect();const settle=disabled?1:short?flow(item):ease((innerWidth-r.left)/(innerWidth*.95));paint(item,'--settle',i===0?1:settle);paint(item,'--diagram-p',ease(settle));});
      const active=clamp(p)*(specimens.length-1);$$('[data-project-jump]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===Math.round(active))));report(projectAct,{rail:x,diagram:specimens[1]?.style.getPropertyValue('--diagram-p')||1},disabled);}
    const career=$('.career-page');if(near(career)){paint(career,'--career-open',flow($('.career-title')));if(ledger){const r=ledger.getBoundingClientRect(),draw=disabled?1:clamp((stableHeight*.78-r.top)/Math.max(r.height,1));paint(ledger,'--career-draw',draw);report(ledger,{line:draw});ledger.querySelectorAll('article').forEach(a=>paint(a,'--entry-p',flow(a,.96,.27)));}}
    if(near(learning)){const p=flow(learning,.96,.19);paint(learning,'--learning-p',p);learning.querySelectorAll('.toolkit-words span').forEach((s,i)=>paint(s,'--skill-p',disabled?1:ease((p-i*.055)/.6)));report(learning,{heading:p,skills:ease((p-.275)/.6)});}
    if(near(closing)){const p=flow(closing,.98,.15);paint(closing,'--close-p',p);report(closing,{cardX:(1-p)*85,cardY:(1-p)*90,notesY:(1-p)*48},p===1);}
    const hero=$('.case-hero');if(near(hero)){const p=disabled?0:clamp(-hero.getBoundingClientRect().top/Math.max(hero.offsetHeight,1));paint(hero,'--case-p',p);report(hero,{x:p*-70,y:p*-35});}
    caseBeats.forEach(beat=>{if(!near(beat))return;const p=flow(beat,.96,.23);paint(beat,'--beat-p',p);paint(beat,'--diagram-p',p);beat.querySelectorAll('.case-flow>div').forEach((card,i)=>paint(card,'--process-p',disabled?1:ease((p-i*.12)/.7)));report(beat,{underline:p,process:ease((p-.24)/.7)});});
    const sections=$$('main>[id],main>section');let active=sections[0];sections.forEach(s=>{if(s.getBoundingClientRect().top<stableHeight*.4)active=s;});
    nav?.querySelectorAll('a').forEach(a=>{const matches=a.getAttribute('href')==='#'+(active?.id||'main');if(matches)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    root.dataset.fieldbookFrames=String(frames);root.dataset.fieldbookScroll=String(Math.round(scrollY));root.dataset.fieldbookReady='true';
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(update);}
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',()=>{
    // URL-bar-only phone changes must not reflow a pinned scene under the thumb.
    const widthChanged=Math.abs(innerWidth-stableWidth)>2;
    const meaningfulHeight=Math.abs(innerHeight-stableHeight)>100;
    if(widthChanged||meaningfulHeight){stableWidth=innerWidth;stableHeight=innerHeight;closeMenu();layout();}else schedule();
  },{passive:true});
  addEventListener('orientationchange',()=>requestAnimationFrame(()=>{stableWidth=innerWidth;stableHeight=innerHeight;closeMenu();layout();}),{passive:true});
  addEventListener('pageshow',()=>{layout();schedule();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});
  $$('img').forEach(image=>{if(!image.complete)image.addEventListener('load',()=>{layout();schedule();},{once:true});});
  document.body.classList.add('enhanced');preference();layout();
  if(window.ScrollCraft)instance=window.ScrollCraft.mount(document);
  layout();updateSelection();
  document.fonts?.ready.then(()=>{layout();schedule();});
  // Public diagnostic reads DOM only, never private browser or account data.
  root.dataset.fieldbookRelease=release;
  schedule();
})();
