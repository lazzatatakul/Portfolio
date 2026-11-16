// Menu
const links=document.getElementById('links');
document.getElementById('menu').onclick=()=>links.classList.toggle('open');
links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'));

// Theme (light / dark)
document.getElementById('theme').onclick=()=>{
  const r=document.documentElement;
  const dark=getComputedStyle(r).getPropertyValue('--bg').trim()==='#17121d';
  r.dataset.theme=dark?'light':'dark';
};

// About tabs
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('.tab,.panel').forEach(e=>e.classList.remove('on'));
  t.classList.add('on');
  document.getElementById(t.dataset.p).classList.add('on');
});

// Works filter
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.filter').forEach(x=>x.classList.remove('on'));
  b.classList.add('on');
  document.querySelectorAll('.card').forEach(c=>{
    c.classList.toggle('hide',b.dataset.f!=='all'&&!c.dataset.c.split(' ').includes(b.dataset.f));
  });
});

// Scroll animation
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Active nav link
const secs=[...document.querySelectorAll('section')];
addEventListener('scroll',()=>{
  const y=scrollY+140;
  let cur=secs[0].id;
  secs.forEach(s=>{if(s.offsetTop<=y)cur=s.id});
  document.querySelectorAll('.links a:not(.btn)').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

// Form (demo)
document.getElementById('form').onsubmit=e=>{
  e.preventDefault();
  e.target.querySelector('button').textContent='Thank you! ✓';
  e.target.reset();
};

// Image lightbox (certificates and works)
const lb=document.getElementById('lb'),lbImg=lb.querySelector('img'),lbCap=lb.querySelector('.cap');
let list=[],ci=0;
function show(l,i){list=l;ci=(i+l.length)%l.length;const c=l[ci],t=c.dataset.title||c.querySelector('b').textContent;
  lbImg.src=c.querySelector('img').src;lbImg.alt=t;lbCap.textContent=t;
  lb.classList.add('open');document.body.style.overflow='hidden'}
function hide(){lb.classList.remove('open');document.body.style.overflow=''}
['.cert','.zoom'].forEach(sel=>{
  const all=[...document.querySelectorAll(sel)];
  all.forEach(c=>c.onclick=()=>{const vis=all.filter(x=>!x.closest('.hide'));show(vis,vis.indexOf(c))});
});
lb.querySelector('.x').onclick=hide;
lb.querySelector('.prev').onclick=e=>{e.stopPropagation();show(list,ci-1)};
lb.querySelector('.next').onclick=e=>{e.stopPropagation();show(list,ci+1)};
lb.onclick=e=>{if(e.target===lb)hide()};
addEventListener('keydown',e=>{
  if(!lb.classList.contains('open'))return;
  if(e.key==='Escape')hide();
  if(e.key==='ArrowLeft')show(list,ci-1);
  if(e.key==='ArrowRight')show(list,ci+1);
});
