/* 館内の演出：背景の星空・流れ星・指先の星くず・展示の浮き上がり */
(function(){
const {T,TAU}=TK;const RM=TK.RM;
const cv=document.createElement('canvas');cv.id='sky-bg';cv.setAttribute('aria-hidden','true');document.body.prepend(cv);
const ctx=cv.getContext('2d');let W=0,H=0,dpr=1;
function size(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);}
size();addEventListener('resize',size);
let seed=42;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const STARS=Array.from({length:240},()=>({x:rnd(),y:rnd(),z:rnd()*0.8+0.2,r:rnd()*1.2+0.3,ph:rnd()*TAU,sp:rnd()*1.5+0.5,warm:rnd()<0.18,blue:rnd()<0.25}));
const isDark=()=>getComputedStyle(document.documentElement).colorScheme.includes('dark');
let dark=isDark();TK.onTheme.push(()=>{dark=isDark();if(RM)draw(0);});
const meteors=[],dust=[];let nextMeteor=3;
function spawnMeteor(){const sp=650+rnd()*450,a=(18+rnd()*22)*Math.PI/180;meteors.push({x:W*(0.35+rnd()*0.75),y:H*(rnd()*0.4),vx:-Math.cos(a)*sp,vy:Math.sin(a)*sp,life:0,max:0.7+rnd()*0.5});}
let t=0;
function draw(dt){
  t+=dt;ctx.clearRect(0,0,W,H);
  const sy=scrollY;
  for(const s of STARS){
    const y=((s.y*H*1.4-sy*s.z*0.18)%(H*1.4)+H*1.4)%(H*1.4)-H*0.2,x=s.x*W;
    const tw=RM?0.8:0.55+0.45*Math.sin(t*s.sp+s.ph);
    const col=s.warm?T.sun:s.blue?T.sky:T.fg;
    ctx.globalAlpha=(dark?0.75:0.28)*tw*s.z;ctx.fillStyle=dark?col:T.muted;
    ctx.beginPath();ctx.arc(x,y,s.r*(dark?1:0.9),0,TAU);ctx.fill();
    if(dark&&s.r>1.3&&tw>0.85){ctx.globalAlpha=0.25*tw;ctx.strokeStyle=col;ctx.lineWidth=0.6;ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();}
  }
  if(!RM){
    nextMeteor-=dt;if(nextMeteor<=0){spawnMeteor();nextMeteor=4+rnd()*7;}
    for(let i=meteors.length-1;i>=0;i--){const m=meteors[i];m.life+=dt;m.x+=m.vx*dt;m.y+=m.vy*dt;const k=1-m.life/m.max;if(k<=0){meteors.splice(i,1);continue;}
      const len=140,nx=m.vx/Math.hypot(m.vx,m.vy),ny=m.vy/Math.hypot(m.vx,m.vy);
      const g=ctx.createLinearGradient(m.x,m.y,m.x-nx*len,m.y-ny*len);g.addColorStop(0,dark?'rgba(255,246,220,.95)':'rgba(143,96,12,.5)');g.addColorStop(1,'rgba(255,246,220,0)');
      ctx.globalAlpha=Math.min(1,k*1.6);ctx.strokeStyle=g;ctx.lineWidth=1.6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(m.x-nx*len,m.y-ny*len);ctx.stroke();}
    for(let i=dust.length-1;i>=0;i--){const p=dust[i];p.life+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=30*dt;const k=1-p.life/p.max;if(k<=0){dust.splice(i,1);continue;}
      ctx.globalAlpha=k;ctx.fillStyle=p.c;const r=p.r*k+0.4;ctx.beginPath();for(let j=0;j<8;j++){const a=j*Math.PI/4,rr=j%2?r*0.4:r;ctx.lineTo(p.x+Math.cos(a)*rr,p.y+Math.sin(a)*rr);}ctx.closePath();ctx.fill();}
  }
  ctx.globalAlpha=1;
}
let last=performance.now(),run=true;
document.addEventListener('visibilitychange',()=>{run=!document.hidden;last=performance.now();});
function loop(n){const dt=Math.min(0.05,(n-last)/1000);last=n;if(run&&!TK.recOpen)draw(dt);requestAnimationFrame(loop);}
if(RM){draw(0);addEventListener('scroll',()=>draw(0),{passive:true});addEventListener('resize',()=>draw(0));}else requestAnimationFrame(loop);

/* 指先の星くず（ヒーローと受付） */
if(!RM&&matchMedia('(pointer:fine)').matches){
  let lastP=0;
  document.querySelectorAll('.hero,.sup').forEach(el=>el.addEventListener('pointermove',e=>{const n=performance.now();if(n-lastP<28)return;lastP=n;
    for(let i=0;i<2;i++)dust.push({x:e.clientX+(rnd()-0.5)*8,y:e.clientY+(rnd()-0.5)*8,vx:(rnd()-0.5)*40,vy:-20-rnd()*30,r:2+rnd()*2.6,life:0,max:0.7+rnd()*0.5,c:rnd()<0.5?T.sun:T.brass});
    if(dust.length>120)dust.splice(0,dust.length-120);}));
}

/* 展示の浮き上がり（表示されている状態から始まる軽い動き） */
if(!RM&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('rise');io.unobserve(e.target);}}),{threshold:0.12});
  document.querySelectorAll('.floor-head,.room-head,.panel,.card,.tr,.debate,.find,.post,.pm,.tier,.ctl li,.dir li').forEach((el,i)=>{el.style.setProperty('--d',((i%4)*70)+'ms');io.observe(el);});
}
})();
