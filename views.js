/* 2F 視点の部屋・屋上ギャラリー・録画モード */
(function(){
const {T,P,TAU,$,fmt,dot,circle,label,line,chips,makeDemo,makeCanvas,drawGeo,stars}=TK;
const RM=TK.RM;

/* ---------- 中心を選ぶ ---------- */
const pv={center:'sun',zoom:'inner'};
const BODIES={inner:['mercury','venus','earth','mars'],outer:['mercury','venus','earth','mars','jupiter','saturn']};
const NOTES={
  sun:'太陽を中心に置いた図（地動説）。惑星はすべてきれいな円を描きます。',
  earth:'地球を中心に置いた図（天動説の見え方）。太陽は地球の周りを1年で回り、惑星はループを描きながら進みます。',
  mars:'火星を中心にすると、地球も太陽の周りを回りながらループを描いて見えます。火星から見ると、地球は「内惑星」です。',
  jupiter:'木星から見ると、地球・金星・水星はいつも太陽のそばにいる小さな内惑星。太陽はゆっくりと12年かけて空を一周します。'
};
const pos=(b,t)=>b==='sun'?[0,0]:TK.helio(P[b],t);
const pvD=makeDemo($('pvCv'),(st,d)=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);stars(ctx,w,h);
  const speed=+$('pvSpeed').value,trail=+$('pvTrail').value;
  const list=BODIES[pv.zoom].slice();if(pv.center!=='sun'&&!list.includes(pv.center))list.push(pv.center);
  const all=['sun',...list];
  const t=RM?1.3:d.t*0.25*speed;
  const o=tt=>pos(pv.center,tt);
  let span=0;all.forEach(b=>{const c=pv.center==='sun'?0:P[pv.center].a;const r=b==='sun'?c:(P[b].a+c);span=Math.max(span,r);});
  const s=Math.min(w,h)/2*0.92/span,cx=w/2,cy=h/2;
  const scr=(b,tt)=>{const q=pos(b,tt),c=o(tt);return [cx+(q[0]-c[0])*s,cy-(q[1]-c[1])*s];};
  const col=b=>b==='sun'?T.sun:T[P[b].col]||T.fg;
  if(trail>0){all.forEach(b=>{if(b===pv.center)return;const per=b==='sun'?1:P[b].T;const n=Math.min(1600,Math.ceil(trail*(b==='mercury'?400:b==='sun'||b==='venus'?220:140)));
    ctx.strokeStyle=col(b);ctx.globalAlpha=.55;ctx.lineWidth=1;ctx.beginPath();for(let i=0;i<=n;i++){const q=scr(b,t-trail+trail*i/n);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);}ctx.stroke();ctx.globalAlpha=1;});}
  all.forEach(b=>{const q=scr(b,t);const r=b==='sun'?8:b===pv.center?6:4.2;dot(ctx,q[0],q[1],r,col(b));
    label(ctx,b==='sun'?'太陽':P[b].name,q[0]+r+4,q[1]-r-2,b===pv.center?T.brass:T.muted,11,'left',b===pv.center?700:500);});
  label(ctx,`${fmt(t,1)} 年`,12,h-14,T.muted,11);
});
function pvText(){$('pvNote').textContent=NOTES[pv.center];}
chips($('pvChips'),[['sun','太陽'],['earth','地球'],['mars','火星'],['jupiter','木星']],'sun',k=>{pv.center=k;if(k==='jupiter')pv.zoom='outer';pvText();pvD.st.redraw();});
['pvSpeed','pvTrail'].forEach(id=>$(id).addEventListener('input',()=>pvD.st.redraw()));
const zc=document.createElement('div');zc.className='chips';$('pvChips').after(zc);
chips(zc,[['inner','火星まで'],['outer','土星まで']],'inner',k=>{pv.zoom=k;pvD.st.redraw();});
pvText();

/* ---------- その星から見た太陽 ---------- */
const SUN_LIST=['mercury','venus','earth','mars','jupiter','saturn'];
makeCanvas($('sunCv'),st=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);
  const n=SUN_LIST.length,cw=w/n,rMax=Math.min(cw*0.3,h*0.24);
  SUN_LIST.forEach((k,i)=>{const p=P[k],x=cw*(i+0.5),y=h*0.42,r=rMax*(P.mercury.a/p.a);
    ctx.fillStyle=T.sun;ctx.globalAlpha=.18;ctx.beginPath();ctx.arc(x,y,r*1.6,0,TAU);ctx.fill();ctx.globalAlpha=1;dot(ctx,x,y,Math.max(r,1.5),T.sun);
    label(ctx,p.name,x,h*0.78,k==='earth'?T.brass:T.fg,12,'center',700);label(ctx,fmt(0.533/p.a,2)+'°',x,h*0.9,T.muted,11,'center');});
});
/* ---------- その星での年齢 ---------- */
const ageIn=$('ageIn');
function ageCalc(){const raw=ageIn.value.trim();const a=raw===''?NaN:+ageIn.value;$('ageBody').innerHTML=SUN_LIST.map(k=>{const p=P[k];const yr=p.T<1?Math.round(p.T*365.256)+' 日':fmt(p.T,2)+' 年';const age=a>=0?(a/p.T):NaN;return `<tr><td>${p.name}</td><td class="d">${yr}</td><td>${p.sday}</td><td class="d hi">${isFinite(age)?(age>=100?Math.round(age):fmt(age,1))+' 歳':'—'}</td></tr>`;}).join('');}
ageIn.addEventListener('input',ageCalc);ageCalc();

/* ---------- ギャラリー ---------- */
const ga={planet:'venus',years:8};const gaY=$('gaY');
const GNOTE={mercury:'水星は約116日ごとに地球に追い抜かれ、1年に3回ほど小さなループを描きます。',venus:'金星は8年でほぼ5回の会合を繰り返し、5枚の花びらのような模様に戻ってきます。',mars:'火星は約2.1年ごとに逆行し、15年ほどでおおよそ同じ配置に戻ります。',jupiter:'木星は1年ごとに小さなループを描きながら、約12年で一周します。',saturn:'土星は毎年ほぼ同じ大きさのループを、約29.5年かけて並べていきます。'};
const gaSt=makeCanvas($('gaCv'),st=>{const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);const p=P[ga.planet];drawGeo(ctx,w/2,h/2,Math.min(w,h)/2*0.94,p,ga.years,{lw:0.9,alpha:0.85});dot(ctx,w/2,h/2,3.5,T.sky);});
function gaUpd(){const p=P[ga.planet],S=TK.synYears(p);$('gaYv').textContent=fmt(ga.years,1)+' 年';$('gaS').textContent=fmt(S,3)+' 年';$('gaN').textContent=fmt(ga.years/S,1)+' 回';$('gaNote').textContent=GNOTE[ga.planet];gaSt.redraw();}
gaY.addEventListener('input',()=>{ga.years=+gaY.value;gaUpd();});
chips($('gaChips'),TK.PLANETS.map(k=>[k,P[k].name]),'venus',k=>{ga.planet=k;ga.years=TK.CYCLE[k];gaY.value=ga.years;gaUpd();});
gaUpd();

/* ---------- 録画モード ---------- */
const rec={el:$('rec'),cv:$('recCv'),planet:'venus',aspect:[9,16],cap:true,t:0,w:0,h:0};
const rctx=rec.cv.getContext('2d');const recPlanet=$('recPlanet');
recPlanet.innerHTML=TK.PLANETS.map(k=>`<option value="${k}">${P[k].name}</option>`).join('');
function layout(){const vw=innerWidth,vh=innerHeight;const [aw,ah]=rec.aspect;const sc=Math.min(vw/aw,vh/ah);rec.w=Math.floor(aw*sc);rec.h=Math.floor(ah*sc);const dpr=Math.min(devicePixelRatio||1,2);rec.cv.style.width=rec.w+'px';rec.cv.style.height=rec.h+'px';rec.cv.width=Math.round(rec.w*dpr);rec.cv.height=Math.round(rec.h*dpr);rctx.setTransform(dpr,0,0,dpr,0,0);draw();}
function draw(){const ctx=rctx,w=rec.w,h=rec.h;if(!w)return;ctx.fillStyle=T.bg;ctx.fillRect(0,0,w,h);stars(ctx,w,h);
  const p=P[rec.planet],cyc=rec.years||TK.CYCLE[rec.planet],dur=18;let yrs=RM?cyc:Math.min(rec.t/dur,1)*cyc;if(!RM&&rec.t>dur+4){rec.t=0;yrs=0;}yrs=Math.max(yrs,0.002);
  const tall=h>w*1.2,u=Math.min(w,h);const R=u/2*(tall?0.9:0.82),cy=tall?h*0.47:h/2;
  drawGeo(ctx,w/2,cy,R,p,yrs,{bodies:true,lw:Math.max(1.2,u/600),br:Math.max(4,u/130)});
  if(rec.cap){const fs=Math.max(14,u/26);ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.fillStyle=T.brass;ctx.font=`500 ${fs*0.55}px "Cinzel",serif`;ctx.fillText('OBSERVATORIUM · 天文研究所',w/2,h*0.07+fs*0.5);
    const by=tall?h*0.86:h*0.9;ctx.fillStyle=T.fg;ctx.font=`700 ${fs*1.5}px "Shippori Mincho B1",serif`;ctx.fillText(`地球から見た${p.name}`,w/2,by);
    ctx.fillStyle=T.muted;ctx.font=`500 ${fs*0.75}px "IBM Plex Mono",monospace`;ctx.fillText(`${fmt(yrs,1)} / ${cyc} 年`,w/2,by+fs*1.25);}
}
TK.recTick=dt=>{rec.t+=dt;draw();};
let idle;function wake(){rec.el.classList.remove('idle');clearTimeout(idle);idle=setTimeout(()=>rec.el.classList.add('idle'),2600);}
function open(pl,yrs){rec.years=yrs||null;if(pl)rec.planet=pl;recPlanet.value=rec.planet;rec.t=0;TK.recOpen=true;rec.el.hidden=false;layout();wake();rec.opener=document.activeElement;$('recClose').focus();}
function close(){TK.recOpen=false;rec.el.hidden=true;if(rec.opener&&rec.opener.focus)rec.opener.focus();if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});}
$('recOpenTop').onclick=()=>open(TK.hero.planet);$('recOpenHero').onclick=()=>open(TK.hero.planet);$('gaRec').onclick=()=>open(ga.planet,ga.years);
$('recClose').onclick=close;$('recRestart').onclick=()=>{rec.t=0;draw();};
$('recFull').onclick=()=>{if(rec.el.requestFullscreen)rec.el.requestFullscreen().catch(()=>{});};
$('recAspect').onchange=e=>{rec.aspect=e.target.value.split(':').map(Number);layout();};
recPlanet.onchange=e=>{rec.years=null;rec.planet=e.target.value;rec.t=0;draw();};
$('recCap').onchange=e=>{rec.cap=e.target.checked;draw();};
rec.el.addEventListener('pointermove',wake);rec.el.addEventListener('pointerdown',wake);
addEventListener('keydown',e=>{if(TK.recOpen&&e.key==='Escape')close();});
addEventListener('resize',()=>{if(TK.recOpen)layout();});
TK.onTheme.push(()=>{if(TK.recOpen)draw();});
})();
