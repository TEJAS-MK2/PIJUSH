const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=window.matchMedia('(pointer:fine)').matches;
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'})}}));

const orbit=document.querySelector('.hero-orbit');
if(orbit&&finePointer&&!reduceMotion){orbit.addEventListener('pointermove',event=>{const r=orbit.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;orbit.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${y*-7}deg)`});orbit.addEventListener('pointerleave',()=>orbit.style.transform='')}

const glow=document.querySelector('.cursor-glow');
if(glow&&finePointer&&!reduceMotion){let tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});const loop=()=>{x+=(tx-x)*.09;y+=(ty-y)*.09;glow.style.left=`${x}px`;glow.style.top=`${y}px`;requestAnimationFrame(loop)};loop()}

document.querySelectorAll('.project').forEach(card=>{card.addEventListener('pointermove',e=>{if(!finePointer)return;const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${((e.clientX-r.left)/r.width)*100}%`);card.style.setProperty('--my',`${((e.clientY-r.top)/r.height)*100}%`)})});

const overlay=document.querySelector('.command-overlay'),openBtn=document.querySelector('.command-btn'),closeBtn=document.querySelector('.command-close');
const toggle=()=>{if(!overlay)return;const open=overlay.classList.toggle('open');overlay.setAttribute('aria-hidden',String(!open));document.body.style.overflow=open?'hidden':''};
openBtn?.addEventListener('click',toggle);closeBtn?.addEventListener('click',toggle);overlay?.addEventListener('click',e=>{if(e.target===overlay)toggle()});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();toggle()}if(e.key==='Escape'&&overlay?.classList.contains('open'))toggle()});
document.querySelectorAll('.command-menu a').forEach(a=>a.addEventListener('click',()=>{overlay?.classList.remove('open');overlay?.setAttribute('aria-hidden','true');document.body.style.overflow=''}));
