/* 1F 歴史館・ヒーロー・器具のイラスト・研究員 */
(function(){
const {T,P,TAU,$,fmt,dot,circle,label,line,chips,makeDemo,makeCanvas,drawGeo,stars}=TK;
const RM=TK.RM;

/* ---------- 研究員（オリジナルキャラクター） ---------- */
TK.MASCOT=`<svg viewBox="0 0 200 230" role="img" aria-label="天文研究所の研究員">
<g class="m-star"><path d="M160 54 L162.9 62 L171.4 62.3 L164.8 67.5 L167.1 75.7 L160 71 L152.9 75.7 L155.2 67.5 L148.6 62.3 L157.1 62 Z" fill="#f3c55e" stroke="#2a2f45" stroke-width="1.6" stroke-linejoin="round"/><path d="M178 48v8M174 52h8M142 46v6M139 49h6" stroke="#f3c55e" stroke-width="1.6" stroke-linecap="round"/></g>
<path d="M50 230 C52 175 70 150 100 148 C130 150 148 175 150 230 Z" fill="#f4f5f9" stroke="#2a2f45" stroke-width="2.5"/>
<path d="M86 152 L100 180 L114 152" fill="#3b4466" stroke="#2a2f45" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M86 152 L92 205 M114 152 L108 205" stroke="#2a2f45" stroke-width="2" fill="none"/>
<path d="M116 198 h20 v15 h-20z" fill="none" stroke="#2a2f45" stroke-width="2"/>
<path d="M123 198 v-11" stroke="#88b6e4" stroke-width="3.2" stroke-linecap="round"/>
<circle cx="72" cy="190" r="6" fill="#d7aa55" stroke="#2a2f45" stroke-width="1.6"/>
<path d="M134 162 C146 142 150 120 151 102 L166 104 C166 126 158 152 147 174 Z" fill="#f4f5f9" stroke="#2a2f45" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="159" cy="95" r="9" fill="#f6dcc8" stroke="#2a2f45" stroke-width="2.5"/>
<rect x="91" y="126" width="18" height="24" rx="6" fill="#f6dcc8" stroke="#2a2f45" stroke-width="2.5"/>
<path d="M52 96 C48 50 80 34 100 34 C120 34 152 50 148 96 C150 120 142 136 134 140 L66 140 C58 136 50 120 52 96Z" fill="#3b4466" stroke="#2a2f45" stroke-width="2.5"/>
<ellipse cx="100" cy="96" rx="40" ry="38" fill="#f6dcc8" stroke="#2a2f45" stroke-width="2.5"/>
<path d="M58 92 C58 58 80 46 100 46 C122 46 142 58 142 92 C134 76 124 70 116 68 C112 76 104 80 96 78 C92 72 86 70 80 72 C72 76 64 82 58 92Z" fill="#3b4466" stroke="#2a2f45" stroke-width="2.5" stroke-linejoin="round"/>
<path class="m-hair" d="M100 47 C97 32 108 25 115 30 C108 32 104 38 104 47" fill="#3b4466" stroke="#2a2f45" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="74" cy="114" rx="7" ry="4" fill="#f2a3a3" opacity=".75"/><ellipse cx="126" cy="114" rx="7" ry="4" fill="#f2a3a3" opacity=".75"/>
<path d="M77 102 q6 -5 12 0 M111 102 q6 -5 12 0" fill="none" stroke="#2a2f45" stroke-width="2.6" stroke-linecap="round"/>
<circle cx="83" cy="100" r="12.5" fill="#ffffff" fill-opacity=".22" stroke="#2a2f45" stroke-width="2"/><circle cx="117" cy="100" r="12.5" fill="#ffffff" fill-opacity=".22" stroke="#2a2f45" stroke-width="2"/>
<path d="M95.5 100 h9" stroke="#2a2f45" stroke-width="2"/>
<path d="M93 118 q3.5 4 7 0 q3.5 4 7 0" fill="none" stroke="#2a2f45" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;

/* ---------- 器具の銘板イラスト ---------- */
function cubeSvg(){
  const a=40/Math.sqrt(3),ry=35*Math.PI/180,rx=22*Math.PI/180,V=[];
  for(const x of[-a,a])for(const y of[-a,a])for(const z of[-a,a]){let X=x*Math.cos(ry)+z*Math.sin(ry),Z=-x*Math.sin(ry)+z*Math.cos(ry);let Y=y*Math.cos(rx)-Z*Math.sin(rx);V.push([50+X,50+Y]);}
  const E=[[0,1],[0,2],[0,4],[1,3],[1,5],[2,3],[2,6],[3,7],[4,5],[4,6],[5,7],[6,7]];
  return E.map(([i,j])=>`<line x1="${V[i][0].toFixed(1)}" y1="${V[i][1].toFixed(1)}" x2="${V[j][0].toFixed(1)}" y2="${V[j][1].toFixed(1)}"/>`).join('');
}
const ENGR={
  armillary:`<circle cx="50" cy="46" r="38"/><ellipse cx="50" cy="46" rx="38" ry="11"/><ellipse cx="50" cy="46" rx="38" ry="13" transform="rotate(-23.4 50 46)" stroke-dasharray="2 2"/><ellipse cx="50" cy="46" rx="11" ry="38"/><circle cx="50" cy="46" r="5" fill="currentColor"/><line x1="50" y1="84" x2="50" y2="94"/><line x1="36" y1="95" x2="64" y2="95"/><line x1="50" y1="4" x2="50" y2="8"/>`,
  helio:`${[9,16,23,30,37,44].map((r,i)=>`<circle cx="50" cy="50" r="${r}"/><circle cx="${(50+r*Math.cos(i*1.9)).toFixed(1)}" cy="${(50-r*Math.sin(i*1.9)).toFixed(1)}" r="1.8" fill="currentColor"/>`).join('')}<circle cx="50" cy="50" r="4.5" fill="currentColor"/>${Array.from({length:36},(_,i)=>{const t=i*10*Math.PI/180;return `<line x1="${(50+46*Math.cos(t)).toFixed(1)}" y1="${(50+46*Math.sin(t)).toFixed(1)}" x2="${(50+49*Math.cos(t)).toFixed(1)}" y2="${(50+49*Math.sin(t)).toFixed(1)}"/>`;}).join('')}`,
  quadrant:`<path d="M14 88 L86 88 A72 72 0 0 0 14 16 Z"/>${Array.from({length:19},(_,i)=>{const t=i*5*Math.PI/180,r1=i%2?66:62;return `<line x1="${(14+r1*Math.cos(t)).toFixed(1)}" y1="${(88-r1*Math.sin(t)).toFixed(1)}" x2="${(14+70*Math.cos(t)).toFixed(1)}" y2="${(88-70*Math.sin(t)).toFixed(1)}"/>`;}).join('')}<line x1="14" y1="88" x2="${(14+70*Math.cos(0.6)).toFixed(1)}" y2="${(88-70*Math.sin(0.6)).toFixed(1)}" stroke-width="1.6"/><circle cx="14" cy="88" r="2.4" fill="currentColor"/><path d="M58 30 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1z" fill="currentColor" stroke="none"/>`,
  kepler:`<circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="23.1" stroke-dasharray="2 2"/>${cubeSvg()}<circle cx="50" cy="50" r="2.5" fill="currentColor"/>`,
  telescope:`<g transform="rotate(-32 40 60)"><rect x="12" y="52" width="58" height="9" rx="2"/><rect x="70" y="50" width="8" height="13" rx="1"/><rect x="6" y="54" width="7" height="5"/></g><line x1="40" y1="60" x2="26" y2="96"/><line x1="40" y1="60" x2="54" y2="96"/><line x1="40" y1="60" x2="40" y2="96"/><circle cx="74" cy="20" r="7" fill="currentColor"/><circle cx="56" cy="20" r="1.6" fill="currentColor"/><circle cx="62" cy="20" r="1.6" fill="currentColor"/><circle cx="86" cy="20" r="1.6" fill="currentColor"/><circle cx="94" cy="20" r="1.6" fill="currentColor"/>`,
  cannon:`<path d="M2 96 A90 90 0 0 1 98 96"/><path d="M44 30 L50 18 L56 30" fill="currentColor"/><path d="M52 18 q16 4 22 30" stroke-dasharray="2 2"/><path d="M52 18 q30 2 40 46" stroke-dasharray="2 2"/><ellipse cx="50" cy="64" rx="47" ry="46" stroke-dasharray="1 3"/>`
};
document.querySelectorAll('[data-engr]').forEach(f=>{f.insertAdjacentHTML('afterbegin',`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" aria-hidden="true">${ENGR[f.dataset.engr]||''}</svg>`);});

/* ---------- ヒーロー ---------- */
const hero={planet:'mars'};
const heroYears=$('heroYears'),heroCap=$('heroCap');
function heroCaption(){const p=P[hero.planet];heroCap.textContent=`地球を中心に置き、${p.name}の位置を${TK.CYCLE[hero.planet]}年分つないでいます。輪のように折り返す所が逆行です。`;}
TK.hero=hero;
const heroD=makeDemo($('heroCv'),(st,d)=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);stars(ctx,w,h);
  const p=P[hero.planet],cyc=TK.CYCLE[hero.planet],rate=TK.RATE[hero.planet];
  let yrs=RM?cyc:d.t*rate;if(!RM&&yrs>cyc+2.5*rate){d.t=0;yrs=0;}
  yrs=Math.min(Math.max(yrs,0.002),cyc);
  const R=Math.min(w,h)/2*0.9;circle(ctx,w/2,h/2,R,T.grid,1);
  for(let i=0;i<72;i++){const a=i*5*TK.R,r1=i%6?R:R-6;line(ctx,w/2+r1*Math.cos(a),h/2+r1*Math.sin(a),w/2+(R+4)*Math.cos(a),h/2+(R+4)*Math.sin(a),T.grid,1);}
  drawGeo(ctx,w/2,h/2,R,p,yrs,{bodies:true,lw:1.3});
  heroYears.textContent=fmt(yrs,1)+' 年';
});
/* 今この瞬間の惑星（J2000の平均黄経から円軌道で近似） */
const L0={mercury:252.251,venus:181.980,earth:100.464,mars:355.433,jupiter:34.351,saturn:50.077};
const EN={mercury:'MERCURY',venus:'VENUS',mars:'MARS',jupiter:'JUPITER',saturn:'SATURN'};
const ppos=(k,d)=>{const q=P[k],l=(L0[k]+360/(q.T*365.25)*d)*TK.R;return [q.a*Math.cos(l),q.a*Math.sin(l)];};
const pgeo=(k,d)=>{const a=ppos(k,d),e=ppos('earth',d),x=a[0]-e[0],y=a[1]-e[1];return {lam:Math.atan2(y,x),dist:Math.hypot(x,y)};};
const prate=(k,d)=>{let v=pgeo(k,d+.5).lam-pgeo(k,d-.5).lam;while(v>Math.PI)v-=TAU;while(v<-Math.PI)v+=TAU;return v;};
function readout(){const k=hero.planet,d=(Date.now()-Date.UTC(2000,0,1,12))/864e5,g=pgeo(k,d),retro=prate(k,d)<0;
  let n=null;for(let i=1;i<900;i++){if((prate(k,d+i)<0)!==retro){n=i;break;}}
  const lm=g.dist*149597870.7/299792.458/60;
  $('roName').innerHTML=`<b>${EN[k]}</b>　${P[k].name}`;
  $('roDist').innerHTML=`<b>${fmt(g.dist,2)}</b> AU　<small>光で ${lm<60?fmt(lm,1)+' 分':fmt(lm/60,1)+' 時間'}</small>`;
  $('roMotion').innerHTML=retro?`<b class="rv">◀ 逆行中</b>　<small>順行に戻るまで 約${n}日</small>`:`<b>順行 ▶</b>　<small>次の逆行まで 約${n}日</small>`;}
chips($('heroChips'),TK.PLANETS.map(k=>[k,P[k].name]),hero.planet,k=>{hero.planet=k;heroD.t=0;heroCaption();readout();heroD.st.redraw();});
readout();
heroCaption();

/* ---------- プトレマイオス ---------- */
const pto={planet:'mars',ratio:0.6583};
const ALM={mars:39.5/60,jupiter:11.5/60,saturn:6.5/60};
const ptoRatio=$('ptoRatio'),ptoState=$('ptoState');
function ptoPos(p,t,ratio,R,cx,cy){const thd=TAU*t/p.T+p.ph,phi=TAU*t+P.earth.ph+Math.PI;const C=[cx+R*Math.cos(thd),cy-R*Math.sin(thd)];return {C,X:[C[0]+ratio*R*Math.cos(phi),C[1]-ratio*R*Math.sin(phi)],phi};}
const ptoD=makeDemo($('ptoCv'),(st,d)=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);
  const p=P[pto.planet],r=pto.ratio,cx=w/2,cy=h/2,R=Math.min(w,h)/2*0.9/(1+r);
  const t=RM?p.T*0.37:d.t*0.55;
  circle(ctx,cx,cy,R,T.muted,1,[4,4]);
  const trail=Math.min(p.T,2*TK.synYears(p)),n=500;
  ctx.strokeStyle=T.brass;ctx.lineWidth=1.4;ctx.beginPath();
  for(let i=0;i<=n;i++){const q=ptoPos(p,t-trail+trail*i/n,r,R,cx,cy).X;i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);}
  ctx.stroke();
  const {C,X,phi}=ptoPos(p,t,r,R,cx,cy);
  circle(ctx,C[0],C[1],r*R,T.sky,1);
  ctx.strokeStyle=T.sky;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(C[0],C[1]);ctx.lineTo(X[0],X[1]);ctx.stroke();
  const Rs=R*0.42,S=[cx+Rs*Math.cos(phi),cy-Rs*Math.sin(phi)];
  circle(ctx,cx,cy,Rs,T.grid,1);line(ctx,cx,cy,S[0],S[1],T.sun,1,[3,4]);
  dot(ctx,S[0],S[1],6,T.sun);dot(ctx,cx,cy,5,T.sky);dot(ctx,C[0],C[1],2.5,T.sky);dot(ctx,X[0],X[1],5,T.planet);
  label(ctx,'地球',cx+8,cy+12,T.muted,11);label(ctx,'太陽',S[0]+9,S[1],T.muted,11);label(ctx,p.name,X[0]+9,X[1],T.fg,12);
  const l1=Math.atan2(cy-X[1],X[0]-cx),Y=ptoPos(p,t-0.004,r,R,cx,cy).X,l0=Math.atan2(cy-Y[1],Y[0]-cx);
  let dl=l1-l0;if(dl>Math.PI)dl-=TAU;if(dl<-Math.PI)dl+=TAU;
  const retro=dl<0;ptoState.textContent=retro?'逆行中':'順行';ptoState.classList.toggle('retro',retro);
  $('ptoT').textContent=fmt(t,1)+' 年';
});
function ptoSet(r){pto.ratio=r;ptoRatio.value=r;$('ptoR').textContent=fmt(r);ptoD.st.redraw();}
ptoRatio.addEventListener('input',()=>ptoSet(+ptoRatio.value));
$('ptoReset').onclick=()=>ptoSet(ALM[pto.planet]);
chips($('ptoChips'),[['mars','火星'],['jupiter','木星'],['saturn','土星']],'mars',k=>{pto.planet=k;ptoD.t=0;ptoSet(ALM[k]);});
ptoSet(ALM.mars);

/* ---------- コペルニクス ---------- */
const YEAR=365.256;
const synIn=$('synIn');let synInner=false;
function synCalc(){const S=+synIn.value,out=$('synOut'),F=$('synF');if(!(S>0)){out.textContent='—';F.textContent='会合周期に正の数を入れてください';return;}
  let Pd;if(synInner){Pd=1/(1/YEAR+1/S);F.textContent=`1/P = 1/${YEAR} + 1/${S}  →  P ≒ ${fmt(Pd,1)} 日`;}
  else{const v=1/YEAR-1/S;if(v<=0){out.textContent='—';F.textContent='外惑星の会合周期は1年（365.256日）より長くなります';return;}Pd=1/v;F.textContent=`1/P = 1/${YEAR} − 1/${S}  →  P ≒ ${fmt(Pd,1)} 日`;}
  out.textContent=`${fmt(Pd,1)} 日（${fmt(Pd/YEAR,2)} 年）`;$('synKind').textContent=synInner?'内惑星（地球より内側）':'外惑星（地球より外側）';}
chips($('synChips'),TK.PLANETS.map(k=>[k,P[k].name]),'mars',k=>{synInner=!!P[k].inner;synIn.value=P[k].syn;synCalc();});
synIn.addEventListener('input',synCalc);synCalc();

const elIn=$('elIn');
const elSt=makeCanvas($('elCv'),st=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);
  const th=+elIn.value*TK.R,a=Math.sin(th);
  const U=Math.min(w*0.56,h*0.8),S=[w*0.5+U*0.42,h*0.5-U*0.12],E=[S[0]-U,S[1]];
  const rr=a*U,Pp=[S[0]-rr*Math.sin(th),S[1]+rr*Math.cos(th)];
  circle(ctx,S[0],S[1],rr,T.muted,1,[4,4]);
  line(ctx,E[0],E[1],S[0],S[1],T.muted,1);line(ctx,E[0],E[1],Pp[0],Pp[1],T.brass,1.6);line(ctx,S[0],S[1],Pp[0],Pp[1],T.sky,1.4);
  const m=10,u1=[(S[0]-Pp[0])/rr,(S[1]-Pp[1])/rr],ex=E[0]-Pp[0],ey=E[1]-Pp[1],el=Math.hypot(ex,ey),u2=[ex/el,ey/el];
  ctx.strokeStyle=T.fg;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(Pp[0]+u1[0]*m,Pp[1]+u1[1]*m);ctx.lineTo(Pp[0]+u1[0]*m+u2[0]*m,Pp[1]+u1[1]*m+u2[1]*m);ctx.lineTo(Pp[0]+u2[0]*m,Pp[1]+u2[1]*m);ctx.stroke();
  ctx.strokeStyle=T.brass;ctx.beginPath();ctx.arc(E[0],E[1],34,0,th);ctx.stroke();
  label(ctx,'θ',E[0]+42,E[1]+14,T.brass,13);
  dot(ctx,S[0],S[1],8,T.sun);dot(ctx,E[0],E[1],5,T.sky);dot(ctx,Pp[0],Pp[1],5,T.planet);
  label(ctx,'太陽',S[0]+12,S[1]-12,T.muted,12);label(ctx,'地球',E[0]-6,E[1]-14,T.muted,12);label(ctx,'惑星',Pp[0]-8,Pp[1]+14,T.fg,12,'right');
  label(ctx,'a',(S[0]+Pp[0])/2+8,(S[1]+Pp[1])/2,T.sky,13);label(ctx,'1',(E[0]+S[0])/2,S[1]-12,T.muted,13,'center');
});
function elUpd(){const th=+elIn.value;$('elTh').textContent=fmt(th,1)+'°';$('elA').textContent=fmt(Math.sin(th*TK.R));elSt.redraw();}
elIn.addEventListener('input',elUpd);
chips($('elChips'),[['venus','金星 46.0°'],['mercury','水星 22.8°']],'venus',k=>{elIn.value=k==='venus'?46:22.8;elUpd();});
elUpd();

/* ---------- ティコ ---------- */
const ty={mode:'sun'};
const tyD=makeDemo($('tyCv'),(st,d)=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);
  const t=RM?0.8:d.t*0.35,cx=w/2,cy=h/2,span=ty.mode==='sun'?1.7:2.65,s=Math.min(w,h)/2*0.92/span;
  const O=tt=>ty.mode==='sun'?[0,0]:TK.helio(P.earth,tt);
  const pos=(b,tt)=>{const o=O(tt);const q=b==='sun'?[0,0]:TK.helio(P[b],tt);return [cx+(q[0]-o[0])*s,cy-(q[1]-o[1])*s];};
  const Sn=pos('sun',t);
  if(ty.mode==='sun'){[P.venus,P.earth,P.mars].forEach(p=>circle(ctx,cx,cy,p.a*s,T.grid,1));}
  else{circle(ctx,cx,cy,s,T.grid,1);circle(ctx,Sn[0],Sn[1],P.venus.a*s,T.muted,1,[3,4]);circle(ctx,Sn[0],Sn[1],P.mars.a*s,T.muted,1,[3,4]);}
  const bodies=ty.mode==='sun'?['venus','earth','mars']:['sun','venus','mars'];
  const cols={venus:T.fg,earth:T.sky,mars:T.planet,sun:T.sun};
  bodies.forEach(b=>{const n=320,tr=2.2;ctx.strokeStyle=cols[b];ctx.lineWidth=1.2;ctx.globalAlpha=.55;ctx.beginPath();for(let i=0;i<=n;i++){const q=pos(b,t-tr+tr*i/n);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);}ctx.stroke();ctx.globalAlpha=1;});
  const E=pos('earth',t),V=pos('venus',t),M=pos('mars',t);
  dot(ctx,Sn[0],Sn[1],8,T.sun);dot(ctx,E[0],E[1],5,T.sky);dot(ctx,V[0],V[1],4,T.fg);dot(ctx,M[0],M[1],5,T.planet);
  label(ctx,'太陽',Sn[0]+11,Sn[1]-10,T.muted,12);label(ctx,'地球',E[0]+9,E[1]+11,T.muted,12);label(ctx,'金星',V[0]+8,V[1],T.fg,11);label(ctx,'火星',M[0]+9,M[1],T.fg,12);
});
function tyText(){$('tyNote').textContent=ty.mode==='sun'?'太陽を止めて見た図。地球・金星・火星が太陽の周りを回ります。':'地球を止めて見た図（ティコの体系）。太陽が地球を回り、金星と火星は動く太陽の周りを回ります。点線の円は太陽と一緒に動く軌道です。';}
chips($('tyChips'),[['sun','太陽を止める（コペルニクス）'],['earth','地球を止める（ティコ）']],'sun',k=>{ty.mode=k;tyText();tyD.st.redraw();});
tyText();
const pxIn=$('pxIn');
function pxCalc(){const ly=+pxIn.value,out=$('pxOut'),c=$('pxCmp');if(!(ly>0)){out.textContent='—';c.textContent='';return;}const p=3.2616/ly;out.textContent=(p>=1?fmt(p,2):fmt(p,3))+'″';
  const r=60/p;c.innerHTML=r>1?`ティコの精度（約1′＝60″）の <b>${r>=100?Math.round(r).toLocaleString():fmt(r,1)}分の1</b>。肉眼では見えません。`:'ティコの精度でも見える大きさです（ただし、そんなに近い恒星はありません）。';}
chips($('pxChips'),[['4.24','プロキシマ・ケンタウリ'],['8.6','シリウス'],['25','ベガ']],'4.24',k=>{pxIn.value=k;pxCalc();});
pxIn.addEventListener('input',pxCalc);pxCalc();

/* ---------- ケプラー ---------- */
const kp={e:0.0934};const kpE=$('kpE');
const solveE=TK.solveE=(M,e)=>{let E=e>0.8?Math.PI:M;for(let i=0;i<30;i++){E-=(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));}return E;};
const kpD=makeDemo($('kpCv'),(st,d)=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);
  const e=kp.e,A=Math.min(w*0.44,h*0.46),B=A*Math.sqrt(1-e*e),cx=w/2,cy=h/2,F=[cx+A*e,cy];
  const pt=E=>[cx+A*Math.cos(E),cy-B*Math.sin(E)];
  const Mnow=RM?TAU*0.15:((d.t/8)%1)*TAU,k=Math.floor(Mnow/TAU*12)%12;
  for(let i=0;i<12;i++){const E0=solveE(TAU*i/12,e),E1=i===11?TAU:solveE(TAU*(i+1)/12,e);
    ctx.beginPath();ctx.moveTo(F[0],F[1]);for(let j=0;j<=24;j++){const q=pt(E0+(E1-E0)*j/24);ctx.lineTo(q[0],q[1]);}ctx.closePath();
    ctx.fillStyle=i===k?T.brass:T.sky;ctx.globalAlpha=i===k?0.42:(i%2?0.08:0.17);ctx.fill();ctx.globalAlpha=1;}
  ctx.strokeStyle=T.fg;ctx.globalAlpha=.7;ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(cx,cy,A,B,0,0,TAU);ctx.stroke();ctx.globalAlpha=1;
  line(ctx,cx-A,cy,cx+A,cy,T.grid,1);
  const q=pt(solveE(Mnow,e));line(ctx,F[0],F[1],q[0],q[1],T.brass,1);
  dot(ctx,F[0],F[1],7,T.sun);dot(ctx,q[0],q[1],5,T.planet);
  if(e>0.02){dot(ctx,cx-A*e,cy,2.5,T.muted);label(ctx,'もう一つの焦点',cx-A*e,cy+14,T.muted,10,'center');}
  label(ctx,'近日点',cx+A-4,cy-12,T.muted,11,'right');label(ctx,'遠日点',cx-A+4,cy-12,T.muted,11);
});
function kpSet(e){kp.e=e;kpE.value=e;$('kpEv').textContent=fmt(e);$('kpQ').textContent=fmt(1-e);$('kpQQ').textContent=fmt(1+e);$('kpV').textContent=fmt((1+e)/(1-e),2);kpD.st.redraw();}
kpE.addEventListener('input',()=>kpSet(+kpE.value));
chips($('kpChips'),[['0','円'],['0.0167','地球'],['0.0934','火星'],['0.2056','水星'],['0.967','ハレー彗星']],'0.0934',k=>kpSet(+k));
kpSet(0.0934);
$('k3Body').innerHTML=['mercury','venus','earth','mars','jupiter','saturn'].map(k=>{const p=P[k];return `<tr><td>${p.name}</td><td class="d">${fmt(p.a,4)}</td><td class="d">${fmt(p.T,3)}</td><td class="d hi">${fmt(p.T*p.T/(p.a**3),3)}</td></tr>`;}).join('');
const k3In=$('k3In');
function k3(){const a=+k3In.value,o=$('k3Out');if(!(a>0)){o.textContent='—';return;}const t=Math.pow(a,1.5);o.textContent=t>1e6?`${t.toExponential(2)} 年`:`${t.toLocaleString('ja-JP',{maximumFractionDigits:2})} 年（${Math.round(t*YEAR).toLocaleString()} 日）`;}
k3In.addEventListener('input',k3);k3();

/* ---------- ガリレオ：金星の満ち欠け ---------- */
TK.drawPhase=(ctx,x,y,r,i,litRight)=>{ // i: 位相角（0=満ち, π=新）
  ctx.save();ctx.fillStyle=T.grid;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();
  ctx.strokeStyle=T.rule;ctx.lineWidth=1;ctx.stroke();
  const s=litRight?1:-1,ci=Math.cos(i);ctx.fillStyle=T.sun;ctx.beginPath();
  const N=40;for(let j=0;j<=N;j++){const ps=-Math.PI/2+Math.PI*j/N;const px=x+s*r*Math.cos(ps),py=y+r*Math.sin(ps);j?ctx.lineTo(px,py):ctx.moveTo(px,py);}
  for(let j=0;j<=N;j++){const ps=Math.PI/2-Math.PI*j/N;ctx.lineTo(x-s*r*ci*Math.cos(ps),y+r*Math.sin(ps));}
  ctx.closePath();ctx.fill();ctx.restore();
};
const vn={model:'helio'};
const vnD=makeDemo($('vnCv'),(st,d)=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);
  const t=RM?0.3:d.t*0.18,half=w*0.5,cx=half*0.5,cy=h/2,s=Math.min(half,h)/2*0.85/1.1;
  let E,S,V;
  if(vn.model==='helio'){S=[0,0];E=TK.helio(P.earth,t);V=TK.helio(P.venus,t);}
  else{E=[0,0];const a=TAU*t;S=[Math.cos(a),Math.sin(a)];const C=[0.6*S[0],0.6*S[1]];const b=TAU*t/TK.synYears(P.venus)+1.0;V=[C[0]+0.36*Math.cos(b+a),C[1]+0.36*Math.sin(b+a)];}
  const toS=q=>[cx+q[0]*s,cy-q[1]*s];
  if(vn.model==='helio'){circle(ctx,cx,cy,P.venus.a*s,T.grid,1);circle(ctx,cx,cy,s,T.grid,1);}
  else{circle(ctx,cx,cy,s,T.grid,1);const C=toS([0.6*S[0],0.6*S[1]]);circle(ctx,C[0],C[1],0.36*s,T.muted,1,[3,3]);line(ctx,cx,cy,toS(S)[0],toS(S)[1],T.sun,1,[2,4]);}
  const [es,ss,vs]=[toS(E),toS(S),toS(V)];
  line(ctx,es[0],es[1],vs[0],vs[1],T.brass,1);
  dot(ctx,ss[0],ss[1],8,T.sun);dot(ctx,es[0],es[1],5,T.sky);dot(ctx,vs[0],vs[1],4.5,T.fg);
  label(ctx,'太陽',ss[0]+11,ss[1]-8,T.muted,11);label(ctx,'地球',es[0]+8,es[1]+11,T.muted,11);label(ctx,'金星',vs[0]+8,vs[1]-8,T.fg,11);
  const sv=[S[0]-V[0],S[1]-V[1]],ev=[E[0]-V[0],E[1]-V[1]];const dist=Math.hypot(ev[0],ev[1]);
  const i=Math.acos(Math.max(-1,Math.min(1,(sv[0]*ev[0]+sv[1]*ev[1])/(Math.hypot(...sv)*dist))));
  const ve=[V[0]-E[0],V[1]-E[1]],se=[S[0]-E[0],S[1]-E[1]];const cross=ve[0]*se[1]-ve[1]*se[0];
  const k=(1+Math.cos(i))/2;
  const rr=Math.min(h*0.42,Math.max(6,(half*0.11)/dist));
  line(ctx,half,12,half,h-12,T.rule,1);
  TK.drawPhase(ctx,half+half/2,cy,rr,i,cross<0);
  label(ctx,'望遠鏡で見た金星',half+half/2,h-14,T.muted,11,'center');
  $('vnK').textContent=Math.round(k*100)+'%';$('vnS').textContent=fmt(1/dist/ (1/0.277),2)+' 倍（最も近いときを1）';
});
chips($('vnChips'),[['helio','太陽中心（実際）'],['ptol','プトレマイオスの並べ方']],'helio',k=>{vn.model=k;vnD.t=0;vnD.st.redraw();});

/* ---------- ニュートンの大砲 ---------- */
const GM=398600.4418,RE=6371,H0=400,r0=RE+H0,VC=Math.sqrt(GM/r0),VE=Math.sqrt(2*GM/r0);
let nc={v:7.67,path:[],state:'',period:0};
function ncSim(v){
  let x=0,y=r0,vx=v,vy=0,t=0;const dt=4,pts=[[x,y]];let ang=0,prevA=Math.atan2(y,x);let state='';
  const acc=(x,y)=>{const r=Math.hypot(x,y),k=-GM/(r*r*r);return [k*x,k*y];};
  let [ax,ay]=acc(x,y);
  for(let i=0;i<60000;i++){
    x+=vx*dt+0.5*ax*dt*dt;y+=vy*dt+0.5*ay*dt*dt;const [nx,ny]=acc(x,y);vx+=0.5*(ax+nx)*dt;vy+=0.5*(ay+ny)*dt;ax=nx;ay=ny;t+=dt;
    if(i%3===0)pts.push([x,y]);
    const r=Math.hypot(x,y);const a=Math.atan2(y,x);let da=a-prevA;if(da>Math.PI)da-=TAU;if(da<-Math.PI)da+=TAU;ang+=Math.abs(da);prevA=a;
    if(r<RE){state='crash';pts.push([x,y]);break;}
    if(r>RE*5.2){state='out';break;}
    if(ang>=TAU){pts.push([0,r0]);break;}
  }
  const en=v*v/2-GM/r0;nc.period=en<0?TAU*Math.sqrt(Math.pow(-GM/(2*en),3)/GM):0;
  if(!state){state=Math.abs(v-VC)<0.06?'circle':'ellipse';}
  else if(state==='out')state=v>=VE?'escape':'ellipse-out';
  nc.path=pts;nc.state=state;
}
const ncD=makeDemo($('ncCv'),(st,d)=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);stars(ctx,w,h);
  const cx=w/2,cy=h/2+h*0.08,s=Math.min(w,h)/2*0.95/(RE*2.4);
  ctx.fillStyle=T.sky;ctx.globalAlpha=.18;ctx.beginPath();ctx.arc(cx,cy,RE*s,0,TAU);ctx.fill();ctx.globalAlpha=1;
  circle(ctx,cx,cy,RE*s,T.sky,1.4);circle(ctx,cx,cy,r0*s,T.grid,1,[3,4]);
  const n=nc.path.length;ctx.strokeStyle=T.brass;ctx.lineWidth=1.6;ctx.beginPath();
  nc.path.forEach((q,i)=>{const X=cx+q[0]*s,Y=cy-q[1]*s;i?ctx.lineTo(X,Y):ctx.moveTo(X,Y);});ctx.stroke();
  const k=RM?n-1:Math.floor((d.t*60)%Math.max(n,1));const q=nc.path[Math.min(k,n-1)]||[0,r0];
  dot(ctx,cx+q[0]*s,cy-q[1]*s,4.5,T.planet);
  ctx.fillStyle=T.fg;ctx.beginPath();ctx.moveTo(cx-7,cy-RE*s);ctx.lineTo(cx,cy-r0*s);ctx.lineTo(cx+7,cy-RE*s);ctx.closePath();ctx.globalAlpha=.6;ctx.fill();ctx.globalAlpha=1;
  label(ctx,'地球',cx,cy,T.muted,12,'center');
});
const NCS={crash:['地面に落ちる',true],circle:['円軌道（人工衛星）',false],ellipse:['楕円軌道',false],'ellipse-out':['大きな楕円軌道（画面の外まで）',false],escape:['地球の重力から脱出',true]};
function ncSet(v){nc.v=v;$('ncV').value=v;ncSim(v);$('ncVv').textContent=fmt(v,2)+' km/s';const [txt,warn]=NCS[nc.state];const s=$('ncState');s.textContent=txt;s.classList.toggle('retro',warn);
  $('ncT').textContent=nc.state==='crash'||nc.state==='escape'?'—':(nc.period/60<200?fmt(nc.period/60,1)+' 分':fmt(nc.period/3600,1)+' 時間');ncD.t=0;ncD.st.redraw();}
$('ncV').addEventListener('input',e=>ncSet(+e.target.value));
chips($('ncChips'),[['4','4 km/s'],['7.67','7.67（円）'],['9.5','9.5'],['11','11（脱出）']],'7.67',k=>ncSet(+k));
ncSet(7.67);
})();
