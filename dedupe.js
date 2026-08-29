(()=>{
  const moveInstall=()=>{
    const main=document.querySelector('main');
    if(!main)return false;
    const install=document.querySelector('[data-install-app],#install-app,.install-app,.pwa-install');
    if(!install)return false;
    let section=document.querySelector('#install-pijush');
    if(!section){
      section=document.createElement('section');
      section.id='install-pijush';
      section.className='v13-section container install-section';
      section.innerHTML='<div class="v13-head"><div><span class="section-label">16 — GET PIJUSH</span><h2>Install<br><em>PIJUSH.</em></h2></div><p>Keep PIJUSH close by installing it as a lightweight app on your device.</p></div><div class="install-card"><div><strong>PIJUSH APP</strong><span>Fast launch · Standalone · Offline-ready</span></div><div class="install-slot"></div></div>';
      main.insertBefore(section,document.querySelector('#contact')||null);
    }
    const slot=section.querySelector('.install-slot');
    if(slot&&install.parentElement!==slot){slot.appendChild(install);install.classList.add('install-in-section');install.removeAttribute('style')}
    return true;
  };
  const style=document.createElement('style');
  style.textContent=`.install-section{padding:95px 0}.install-card{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:24px;border:1px solid var(--line);border-radius:24px;background:var(--surface)}.install-card strong{display:block;font:600 22px 'Space Grotesk'}.install-card span{display:block;color:var(--muted);font-size:12px;margin-top:5px}.install-slot{display:flex;justify-content:flex-end}.install-in-section{position:static!important;inset:auto!important;z-index:auto!important;margin:0!important;display:inline-flex!important;max-width:100%!important;white-space:nowrap!important}.install-card .install-in-section{min-height:48px;padding:13px 20px;border-radius:999px}@media(max-width:560px){.install-section{padding:75px 0}.install-card{display:grid;gap:18px}.install-slot{justify-content:stretch}.install-card .install-in-section{width:100%;justify-content:center;white-space:normal!important}.install-card span{line-height:1.5}}`;
  document.head.appendChild(style);
  if(!moveInstall()){
    const observer=new MutationObserver(()=>{if(moveInstall())observer.disconnect()});
    observer.observe(document.body,{childList:true,subtree:true});
  }
})();