const C=(n,c)=>({s:`certs/${n}.jpg`,c}),M=(n,c)=>({s:`media/${n}.jpg`,c});
const HONORS=[
{t:"Dean's Honor Award",o:"University of Asia Pacific",d:"Fall-24, Spring-25",m:[M('deans-fall24','Fall-24 ceremony'),{v:'media/deans-fall24.mp4',s:'media/deans-fall24-vid.jpg',c:'Receiving the award, Fall-24'},M('deans-spring25','Spring-25 ceremony'),{v:'media/deans-spring25.mp4',s:'media/deans-spring25-vid.jpg',c:'Receiving the award, Spring-25'}]},
{t:"4th Place, Math Olympiad",o:"Intra-University Math Olympiad 3.0 · Math Club, CSE, UAP",d:"Oct 2024",m:[C('math-fest-4th','Certificate of achievement'),M('pic-with-medal','With the medal'),M('medal','The medal'),M('math-olympiad-receiving','Receiving the medal on stage'),{v:'media/math-olympiad-medal.mp4',s:'media/math-olympiad-medal.jpg',c:'Receiving the medal'}]},
{t:"World Cup Tournament Champion",o:"Fighting-XI",d:"8 Nov 2022",m:[C('pes-world-cup','Certificate of excellence'),M('world-cup-winner','Winner announcement')]},
{t:"Intra-Department PES Champion",o:"Sports Club, CSE, UAP",d:"Mar 2022",m:[M('pes-champion','Final result'),M('pes-finalists','Finalists')]}];
const PARTS=[
{t:"Digital Drawing with Photoshop",o:"Grameenphone Academy",d:"21 Sep 2026",c:"cert",m:[C('photoshop')]},
{t:"Generative AI Mastermind",o:"Outskill",d:"2026",c:"cert",m:[C('genai')]},
{t:"Excel Essentials for Workplace Productivity",o:"UNICEF × Passport to Earning",d:"2 Feb 2026",c:"cert",m:[C('excel')]},
{t:"Inter Department Math Olympiad",o:"EEE Math Club, UAP",d:"8 Apr 2026",c:"part",m:[C('eee-math')]},
{t:"Webinar on AI & Machine Learning",o:"BFEW × Aptech",d:"21 Aug 2025",c:"cert",m:[C('ai-webinar')]},
{t:"Hands-On Overleaf and LaTeX",o:"Research & Publication Unit, CSE, UAP",d:"2025",c:"cert",m:[C('latex')]},
{t:"Basics of HTML/CSS for Beginners",o:"OpenWeaver",d:"22 Mar 2023",c:"cert",m:[C('html-css')]},
{t:"Digital Security Essentials",o:"Aspire to Innovate (a2i)",d:"8 Jul 2020",c:"cert",m:[C('digital-security')]},
{t:"Coronavirus Disease (COVID-19)",o:"DGHS × MuktoPaath",d:"2020",c:"cert",m:[C('covid19')]},
{t:"COVID-19 Awareness and Prevention",o:"BRAC × MuktoPaath",d:"2020",c:"cert",m:[C('covid-brac')]},
{t:"Life Hacks",o:"Robi 10 Minute School × MuktoPaath",d:"2020",c:"cert",m:[C('life-hacks')]},
{t:"BASF Kids' Lab",o:"BASF Bangladesh",d:"2014",c:"part",m:[C('basf')]}];
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'),dlg=document.querySelector('#achLightbox');

/* Achievements: thesis-style cards (gold). One card per entry in HONORS; each card is an auto-sliding gallery + text. */
function mountHonors(root,data){
root.classList.add('thesis-grid','exp-grid','hon-grid');
root.innerHTML=data.map(a=>{
const hasV=a.m.some(x=>x.v),alt=esc(a.t+', '+a.o);
const slides=a.m.map((x,j)=>{const cap=esc(x.c||a.t),ld=j?' loading="lazy"':'',on=j?'':' thesis-gallery-active';
return x.v?`<video class="thesis-gallery-img${on}" controls preload="metadata" playsinline poster="${x.s}" src="${x.v}" aria-label="${alt}: ${cap}" data-cap="${cap}"></video>`
:`<img src="${x.s}" alt="${alt}, ${cap}" data-doc="${x.s}" data-alt="${alt}, ${cap}" data-cap="${cap}" class="thesis-gallery-img${on}"${ld}>`}).join('');
const dots=a.m.length>1?'<div class="thesis-gallery-dots">'+a.m.map((x,j)=>`<span class="thesis-gallery-dot${j?'':' thesis-dot-active'}" role="button" aria-label="Item ${j+1}"></span>`).join('')+'</div>':'';
return `<div class="thesis-item"><div class="thesis-images-gallery gallery-contain exp-gallery${hasV?' has-video':''}" data-gallery="5000">${slides}<div class="thesis-gallery-cap" aria-live="polite"></div>${dots}</div><div class="thesis-content"><div class="thesis-period">${esc(a.d)}</div><div class="thesis-title">${esc(a.t)}</div><div class="thesis-subtitle">${esc(a.o)}</div></div></div>`}).join('')}
function mount(root,data,tabs){let cur='all',sel=0,mi=0,shown=data;
root.innerHTML=(tabs?'<div class="ach-tabs" role="tablist"></div>':'')+'<div class="ach-golden"><figure class="ach-feature" aria-live="polite"></figure><ul class="ach-list"></ul></div>';
const fig=root.querySelector('figure'),list=root.querySelector('ul');
function feature(i,k=0){sel=i;mi=k;clearInterval(feature.t);const a=shown[i],n=a.m.length;
const slide=(x,j)=>x.v?`<div class="ach-slide" aria-hidden="${j!==k}"><div class="ach-frame ach-vid"><video controls preload="metadata" playsinline poster="${x.s}" src="${x.v}"></video></div></div>`
:`<div class="ach-slide" aria-hidden="${j!==k}"><button class="ach-frame" data-lb="${j}" aria-label="Enlarge: ${esc(a.t)}"><img src="${x.s}" alt="${esc(a.t)}, ${esc(a.o)}"${j?' loading="lazy"':''}></button></div>`;
let h=`<div class="ach-slider"><div class="ach-track">${a.m.map(slide).join('')}</div>`;
if(n>1)h+='<button class="ach-nav ach-prev" aria-label="Previous">‹</button><button class="ach-nav ach-next" aria-label="Next">›</button><span class="ach-count"></span>';
h+='</div>';
if(n>1)h+='<div class="ach-dots">'+a.m.map((y,j)=>`<button data-j="${j}" aria-label="${esc(y.c||'Item '+(j+1))}"></button>`).join('')+'</div>';
h+=`<figcaption><strong>${esc(a.t)}</strong><span class="ach-sub">${esc(a.o)} · ${esc(a.d)}</span><span class="ach-cap"></span></figcaption>`;
fig.innerHTML=h;
const track=fig.querySelector('.ach-track'),slides=[...fig.querySelectorAll('.ach-slide')],dots=[...fig.querySelectorAll('.ach-dots button')],cnt=fig.querySelector('.ach-count'),capEl=fig.querySelector('.ach-cap');
function go(j){j=(j+n)%n;mi=j;track.style.transform=`translateX(${-100*j}%)`;
slides.forEach((s,m)=>{s.setAttribute('aria-hidden',m!==j);const v=s.querySelector('video');if(v&&m!==j)v.pause()});
dots.forEach((d,m)=>d.setAttribute('aria-current',m===j));if(cnt)cnt.textContent=(j+1)+' / '+n;capEl.textContent=a.m[j].c||'';
if(n>1&&!matchMedia('(prefers-reduced-motion: reduce)').matches){clearInterval(feature.t);feature.t=setInterval(()=>{const v=slides[mi].querySelector('video');if(v&&!v.paused&&!v.ended)return;if(fig.matches(':hover,:focus-within'))return;go(mi+1)},5500)}}
fig.querySelectorAll('.ach-frame[data-lb]').forEach(b=>b.onclick=()=>{const x=a.m[+b.dataset.lb],im=document.querySelector('#achLbImg');im.src=x.s;im.alt=a.t;dlg.showModal()});
dots.forEach(d=>d.onclick=()=>go(+d.dataset.j));
const p=fig.querySelector('.ach-prev'),q=fig.querySelector('.ach-next');if(p){p.onclick=()=>go(mi-1);q.onclick=()=>go(mi+1)}
fig.querySelectorAll('video').forEach(v=>v.addEventListener('ended',()=>n>1&&go(mi+1)));
let x0=null;track.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});track.addEventListener('touchend',e=>{if(x0==null)return;const d=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(d)>40)go(mi+(d<0?1:-1))});
fig.tabIndex=0;fig.onkeydown=e=>{if(e.target.tagName==='VIDEO')return;if(e.key==='ArrowRight')go(mi+1);if(e.key==='ArrowLeft')go(mi-1)};
go(k);
list.querySelectorAll('.ach-item').forEach((el,m)=>el.setAttribute('aria-current',m===i))}
function render(){shown=data.filter(a=>cur==='all'||a.c===cur);
list.innerHTML=shown.map((a,i)=>`<li><button class="ach-item" data-i="${i}"><span class="ach-thumb"><img src="${a.m[0].s}" alt="" loading="lazy"></span><span class="ach-txt"><strong>${esc(a.t)}</strong><small>${esc(a.o)} · ${esc(a.d)}</small></span></button></li>`).join('');
list.querySelectorAll('.ach-item').forEach(b=>b.onclick=()=>feature(+b.dataset.i));feature(0)}
if(tabs){const t=root.querySelector('.ach-tabs');t.innerHTML=Object.entries(tabs).map(([k,v])=>`<button role="tab" data-k="${k}" aria-selected="${k===cur}">${v}</button>`).join('');
t.querySelectorAll('button').forEach(b=>b.onclick=()=>{cur=b.dataset.k;t.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b));render()})}
render()}
mountHonors(document.querySelector('#honorsMount'),HONORS);
mount(document.querySelector('#partMount'),PARTS,{all:'All',cert:'Certificates',part:'Participation'});
document.querySelector('#honorCount').textContent=HONORS.length;document.querySelector('#partCount').textContent=PARTS.length;
dlg.addEventListener('click',e=>{if(e.target===dlg||e.target.closest('.ach-close'))dlg.close()});

document.querySelectorAll('[data-doc]').forEach(b=>b.addEventListener('click',()=>{const im=document.querySelector('#achLbImg');im.src=b.dataset.doc;im.alt=b.dataset.alt||'Document';dlg.showModal()}));
