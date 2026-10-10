/* 共通の土台：色トークン、惑星データ、キャンバス管理、描画ヘルパー */
(function(){
const TK = window.TK = {};
TK.RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
TK.TAU = Math.PI*2;
TK.R = Math.PI/180;
const T = TK.T = {};
TK.readTokens = ()=>{const cs=getComputedStyle(document.documentElement);['bg','bg2','panel','rule','fg','muted','brass','sky','sun','planet','verd','grid'].forEach(k=>T[k]=cs.getPropertyValue('--'+k).trim());};
TK.readTokens();

/* 現代の値：NASA Planetary Fact Sheet（軌道は円で近似） */
TK.P = {
  mercury:{name:'水星',a:0.3871,T:0.2408,e:0.2056,syn:115.88,ph:0.6,inner:true,rot:'58.6日',sday:'176日',col:'muted'},
  venus:{name:'金星',a:0.7233,T:0.6152,e:0.0068,syn:583.92,ph:1.3,inner:true,rot:'243日（逆回り）',sday:'117日',col:'fg'},
  earth:{name:'地球',a:1,T:1,e:0.0167,ph:0,rot:'23時間56分',sday:'24時間',col:'sky'},
  mars:{name:'火星',a:1.5237,T:1.8809,e:0.0934,syn:779.94,ph:2.1,rot:'24時間37分',sday:'24時間40分',col:'planet'},
  jupiter:{name:'木星',a:5.2034,T:11.862,e:0.0484,syn:398.88,ph:3.7,rot:'9時間56分',sday:'9時間56分',col:'brass'},
  saturn:{name:'土星',a:9.5371,T:29.457,e:0.0539,syn:378.09,ph:4.5,rot:'10時間33分',sday:'10時間34分',col:'sun'}
};
TK.PLANETS=['mercury','venus','mars','jupiter','saturn'];
const P=TK.P,TAU=TK.TAU;
TK.helio=(p,t)=>{const th=TAU*t/p.T+p.ph;return [p.a*Math.cos(th),p.a*Math.sin(th)];};
TK.geo=(p,t)=>{const a=TK.helio(p,t),e=TK.helio(P.earth,t);return [a[0]-e[0],a[1]-e[1]];};
TK.synYears=p=>1/Math.abs(1/p.T-1);
TK.CYCLE={mercury:1,venus:8,mars:15,jupiter:12,saturn:29.5};
TK.RATE={mercury:0.3,venus:0.8,mars:0.9,jupiter:1.4,saturn:2.8};
TK.SPY=p=>p===P.mercury?900:p===P.venus?500:260;
TK.fmt=(v,d=3)=>Number(v).toFixed(d);
TK.fmtJ=(v,d=0)=>Number(v).toLocaleString('ja-JP',{maximumFractionDigits:d,minimumFractionDigits:d});
TK.$=id=>document.getElementById(id);

/* キャンバス管理：画面に見えている図だけを動かす */
const registry=TK.registry=[],demos=TK.demos=[];
const io=new IntersectionObserver(es=>es.forEach(e=>{const d=e.target._demo;if(d)d.visible=e.isIntersecting;}),{rootMargin:'120px'});
TK.makeCanvas=(cv,draw)=>{
  const ctx=cv.getContext('2d');const st={cv,ctx,w:0,h:0};
  st.size=()=>{const r=cv.getBoundingClientRect();if(!r.width||!r.height)return;const dpr=Math.min(devicePixelRatio||1,2);cv.width=Math.round(r.width*dpr);cv.height=Math.round(r.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);st.w=r.width;st.h=r.height;draw(st);};
  st.redraw=()=>{if(st.w)draw(st);};
  new ResizeObserver(st.size).observe(cv);registry.push(st);return st;
};
TK.makeDemo=(cv,draw)=>{const d={t:0,visible:false};d.st=TK.makeCanvas(cv,st=>draw(st,d));cv._demo=d;io.observe(cv);demos.push(d);return d;};
TK.dot=(ctx,x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();};
TK.circle=(ctx,x,y,r,c,lw=1,dash)=>{ctx.strokeStyle=c;ctx.lineWidth=lw;ctx.setLineDash(dash||[]);ctx.beginPath();ctx.arc(x,y,Math.max(r,0),0,TAU);ctx.stroke();ctx.setLineDash([]);};
TK.label=(ctx,txt,x,y,c,size=12,align='left',weight=500)=>{ctx.fillStyle=c;ctx.font=`${weight} ${size}px "Zen Kaku Gothic New",system-ui,sans-serif`;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillText(txt,x,y);};
TK.line=(ctx,x1,y1,x2,y2,c,lw=1,dash)=>{ctx.strokeStyle=c;ctx.lineWidth=lw;ctx.setLineDash(dash||[]);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([]);};

let seed=7;const rnd=TK.rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const STARS=Array.from({length:160},()=>[rnd(),rnd(),rnd()*1.1+0.3,rnd()*0.5+0.15]);
TK.stars=(ctx,w,h)=>{ctx.fillStyle=T.muted;for(const s of STARS){ctx.globalAlpha=s[3];ctx.beginPath();ctx.arc(s[0]*w,s[1]*h,s[2],0,TAU);ctx.fill();}ctx.globalAlpha=1;};

/* 地球から見た惑星の軌跡 */
TK.drawGeo=(ctx,cx,cy,R,p,tEnd,o={})=>{
  const s=R/(p.a+1);const n=Math.max(2,Math.ceil(tEnd*TK.SPY(p)));
  ctx.lineWidth=o.lw||1.2;ctx.strokeStyle=o.color||T.brass;ctx.globalAlpha=o.alpha??0.9;ctx.lineJoin='round';
  ctx.beginPath();
  for(let i=0;i<=n;i++){const t=tEnd*i/n;const g=TK.geo(p,t);const x=cx+g[0]*s,y=cy-g[1]*s;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}
  ctx.stroke();ctx.globalAlpha=1;
  if(o.bodies){const g=TK.geo(p,tEnd),e=TK.helio(P.earth,tEnd);
    ctx.strokeStyle=T.sun;ctx.globalAlpha=.35;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx-e[0]*s,cy+e[1]*s);ctx.stroke();ctx.globalAlpha=1;
    TK.dot(ctx,cx-e[0]*s,cy+e[1]*s,o.br?o.br*1.4:6,T.sun);TK.dot(ctx,cx+g[0]*s,cy-g[1]*s,o.br||4.5,T.planet);TK.dot(ctx,cx,cy,o.br||5,T.sky);}
};
TK.chips=(el,items,cur,on)=>{
  el.innerHTML='';items.forEach(([k,txt])=>{const b=document.createElement('button');b.type='button';b.className='chip';b.textContent=txt;b.setAttribute('aria-pressed',String(String(k)===String(cur)));b.onclick=()=>{[...el.children].forEach(c=>c.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');on(k);};el.appendChild(b);});
};
/* 月の形（位相角 0=新月, 0.5=満月） */
TK.moonIcon=(ctx,x,y,r,age)=>{
  const f=((age/29.530588)%1+1)%1;
  ctx.save();ctx.fillStyle=T.grid;ctx.strokeStyle=T.rule;ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();ctx.stroke();
  const k=Math.cos(f*TAU); // 明暗境界の横幅比
  ctx.fillStyle=T.sun;ctx.beginPath();
  if(f<0.5){ctx.arc(x,y,r,-Math.PI/2,Math.PI/2,false);ctx.ellipse(x,y,r*Math.abs(k),r,0,Math.PI/2,-Math.PI/2,k>0);}
  else{ctx.arc(x,y,r,Math.PI/2,-Math.PI/2,false);ctx.ellipse(x,y,r*Math.abs(k),r,0,-Math.PI/2,Math.PI/2,k>0);}
  ctx.fill();ctx.restore();
};

/* ループ */
TK.tickers=[];
let last=performance.now();
function loop(now){const dt=Math.min(0.05,(now-last)/1000);last=now;
  if(!TK.RM){
    if(TK.recOpen){TK.recTick&&TK.recTick(dt);}
    else{for(const d of demos){if(d.visible){d.t+=dt;d.st.redraw();}}TK.tickers.forEach(f=>f(dt));}
  }
  requestAnimationFrame(loop);}
requestAnimationFrame(loop);
function retheme(){TK.readTokens();registry.forEach(s=>s.redraw());TK.onTheme&&TK.onTheme.forEach(f=>f());}
TK.onTheme=[];
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',retheme);
new MutationObserver(retheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>registry.forEach(s=>s.redraw()));
})();
