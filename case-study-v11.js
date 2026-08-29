(()=>{
  const repo=new URLSearchParams(location.search).get('repo')||'PIJUSH';
  const $=id=>document.getElementById(id);
  const set=(id,value,html=false)=>{const el=$(id);if(el)html?el.innerHTML=value:el.textContent=value;};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const date=x=>x?new Date(x).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'—';
  const showUnavailable=()=>{
    set('title',repo);set('lead','Project details are temporarily unavailable.');set('language','Unavailable');set('stars','—');set('updated','—');
    set('technologies','<span class="case-tag">GitHub unavailable</span>',true);
    set('readme','GitHub data could not be loaded right now. Open the repository to explore the latest source.');
    set('features','<li>Repository data is temporarily unavailable.</li>',true);
    set('challenge','The project details could not be fetched. Please use the GitHub source link below.');
    set('learned','The live case study will populate automatically when GitHub is reachable again.');
    set('case-events','<div class="case-event"><time>OFFLINE</time><span>Commit history unavailable.</span></div>',true);
    const link=$('github');if(link)link.href=`https://github.com/TEJAS-MK2/${encodeURIComponent(repo)}`;
    document.title=`${repo} — Pijush`;
  };
  async function get(url){const r=await fetch(url,{headers:{Accept:'application/vnd.github+json'}});if(!r.ok)throw Error(`GitHub ${r.status}`);return r.json()}
  async function load(){
    try{
      const base=`https://api.github.com/repos/TEJAS-MK2/${encodeURIComponent(repo)}`;
      const [d,langs,commits]=await Promise.all([get(base),get(base+'/languages'),get(base+'/commits?per_page=8')]);
      let readme='';
      try{const raw=await fetch(`https://raw.githubusercontent.com/TEJAS-MK2/${encodeURIComponent(repo)}/HEAD/README.md`);if(raw.ok)readme=await raw.text()}catch{}
      set('title',d.name||repo);set('lead',d.description||'A project by Pijush.');set('language',d.language||'Code');set('stars',d.stargazers_count||0);set('updated',date(d.pushed_at));
      const link=$('github');if(link)link.href=d.html_url||`https://github.com/TEJAS-MK2/${encodeURIComponent(repo)}`;
      document.title=`${d.name||repo} — Pijush`;
      const tags=Object.keys(langs||{});
      set('technologies',tags.length?tags.map(x=>`<span class="case-tag">${esc(x)}</span>`).join(''):'<span class="case-tag">Code</span>',true);
      set('readme',readme||'No README is available yet. The repository itself contains the latest implementation.');
      set('features',[d.description||'Public project with a focused implementation.','Version-controlled development and iterative updates.','Repository-backed documentation and source code.'].map(x=>`<li>${esc(x)}</li>`).join(''),true);
      set('challenge','The project is presented as a work-in-progress snapshot. The implementation and commit history show the problems being explored and the decisions made along the way.');
      set('learned','The clearest learning signal comes from shipping: each update, refactor, and experiment becomes part of a visible build history. This section intentionally stays grounded in the repository rather than inventing a résumé-style claim.');
      set('case-events',commits.length?commits.map(c=>`<div class="case-event"><time>${esc(date(c.commit?.author?.date))}</time><a href="${esc(c.html_url)}" target="_blank" rel="noreferrer">${esc((c.commit?.message||'Update').split('\n')[0])}</a></div>`).join(''):'<div class="case-event"><time>NOW</time><span>No commits available.</span></div>',true);
    }catch{showUnavailable()}
  }
  setTimeout(()=>{if(($('title')?.textContent||'').trim()==='Loading.')showUnavailable()},4000);
  load();
})();