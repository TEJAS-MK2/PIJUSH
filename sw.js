const CACHE='pijush-v2.1.0';
const CORE=['./','./index.html','./404.html','./case-study.html','./style.css','./mobile.css','./mobile-v2.css','./features.css','./v11.css','./enhancements.css','./contact-instagram.css','./pwa-install.css','./install-section.css','./github-projects.js','./script.js','./v11.js','./enhancements.js','./dedupe.js','./case-study-v11.js','./favicon.svg','./manifest.json','./robots.txt','./sitemap.xml'];
const put=(cache,request,response)=>{if(response&&response.ok)cache.put(request,response.clone());return response};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const request=event.request;if(request.method!=='GET')return;
  const url=new URL(request.url);if(url.origin!==self.location.origin)return;
  event.respondWith(fetch(request).then(response=>caches.open(CACHE).then(cache=>put(cache,request,response))).catch(()=>caches.match(request).then(cached=>cached|| (request.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});