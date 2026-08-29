(()=>{
  const repo=new URLSearchParams(location.search).get('repo')||'PIJUSH';
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const date=x=>x?new Date(x).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'—';
  async function get(url){const r=await fetch(url,{headers:{Accept:'application/vnd.github+json'}});if(!r.ok)throw Error(`GitHub ${r.status}`);return r.json()}
  async function load(){
    try{
      const base=`https://api.github.com/repos/TEJAS-MK2/${encodeURIComponent(repo)}`;
      const [d,langs,commits]=await Promise.all([get(base),get(base+'/languages'),get(base+'/commits?per_page=8')]);
      let readme='';
      try{const raw=await fetch(`https://raw.githubusercontent.com/TEJAS-MK2/${encodeURIComponent(repo)}/HEAD/README.md`);if(raw.ok)readme=await raw.text()}catch{}
      $('title').textContent=d.name||repo;
      $('lead').textContent=d.description||'A project by Pijush.';
      $('language').textContent=d.language||'Code';
      $('stars').textContent=d.stargazers_count||0;
      $('updated').textContent=date(d.pushed_at);
      $('github').href=d.html_url||`https://github.com/TEJAS-MK2/${encodeURIComponent(repo)}`;
      document.title=(d.name||repo)+' — Pijush';
      const tags=Object.keys(langs||{});
      $('technologies').innerHTML=tags.length?tags.map(x=>`<span class="case-tag">${esc(x)}</span>`).join(''):'<span class="case-tag">Code</span>';
      $('readme').textContent=readme||'No README is available yet. The repository itself contains the latest implementation.';
      $('features').innerHTML=[d.description||'Public project with a focused implementation.','Version-controlled development and iterative updates.','Repository-backed documentation and source code.'].map(x=>`<li>${esc(x)}</li>`).join('');
      $('challenge').textContent='The project is presented as a work-in-progress snapshot. The implementation and commit history show the problems being explored and the decisions made along the way.';
      $('learned').textContent='The clearest learning signal comes from shipping: each update, refactor, and experiment becomes part of a visible build history. This section intentionally stays grounded in the repository rather than inventing a résumé-style claim.';
      $('case-events').innerHTML=commits.length?commits.map(c=>`<div class="case-event"><time>${esc(date(c.commit?.author?.date))}</time><a href="${esc(c.html_url)}" target="_blank" rel="noreferrer">${esc((c.commit?.message||'Update').split('\n')[0])}</a></div>`).join(''):'<div class="case-event"><time>NOW</time><span>No commits available.</span></div>';
    }catch{
      $('title').textContent=repo;
      $('lead').textContent='Project details are temporarily unavailable.';
      $('language').textContent='Unavailable';
      $('stars').textContent='—';
      $('updated').textContent='—';
      $('technologies').innerHTML='<span class="case-tag">GitHub unavailable</span>';
      $('readme').textContent='GitHub data could not be loaded right now. Open the repository to explore the latest source.';
      $('features').innerHTML='<li>Repository data is temporarily unavailable.</li>';
      $('challenge').textContent='The project details could not be fetched. Please use the GitHub source link below.';
      $('learned').textContent='The live case study will populate automatically when GitHub is reachable again.';
      $('case-events').innerHTML='<div class="case-event"><time>OFFLINE</time><span>Commit history unavailable.</span></div>';
      $('github').href=`https://github.com/TEJAS-MK2/${encodeURIComponent(repo)}`;
    }
  }
  load();
})();