/* 5F 学びの階段：レベル別の公式・計算機・例題 */
(function(){
const {T,TAU,$,fmt,chips,makeCanvas,label,line,dot}=TK;
const G=6.674e-11;
const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹';
const sci=(x,d=3)=>{if(!isFinite(x))return '—';if(x===0)return '0';const e=Math.floor(Math.log10(Math.abs(x)));if(e>=-2&&e<5)return Number(x.toPrecision(d)).toLocaleString('ja-JP',{maximumFractionDigits:4});const m=x/Math.pow(10,e);return `${m.toFixed(d-1)} × 10${(e<0?'⁻':'')+String(Math.abs(e)).split('').map(c=>SUP[c]).join('')}`;};
const BODY={earth:['地球',3.986004e14,6.371e6],moon:['月',4.9049e12,1.7374e6],mars:['火星',4.2828e13,3.3895e6],jupiter:['木星',1.26687e17,6.9911e7]};
function bbColor(K){const t=K/100;let r,g,b;r=t<=66?255:329.698727446*Math.pow(t-60,-0.1332047592);g=t<=66?99.4708025861*Math.log(t)-161.1195681661:288.1221695283*Math.pow(t-60,-0.0755148492);b=t>=66?255:t<=19?0:138.5177312231*Math.log(t-10)-305.0447927307;const c=v=>Math.max(0,Math.min(255,Math.round(v)));return `rgb(${c(r)},${c(g)},${c(b)})`;}
TK.bbColor=bbColor;
const phaseName=a=>a<1.5||a>28?'新月':a<5?'三日月のころ':a<9?'上弦の月のころ':a<13?'十日夜〜十三夜':a<16.5?'満月':a<20?'十八夜〜二十日月':a<24?'下弦の月のころ':'有明の月';

const CARDS=[
 {lv:'j',t:'日周運動',why:'星が東から西へ動いて見えるのは、地球が1日に1回自転しているから。',f:'360° ÷ 24時間 ＝ 1時間に 15°',in:[['h','経過時間（時間）',3,0.5]],
  min:{h:0},c:v=>`星は <b>${fmt(v.h*15,1)}°</b> 西へ動く`,ex:['午後8時に真南に見えた星は、午後11時にはどこに見える？','3時間 × 15° ＝ 45°。真南から西へ45°（南西）の方向。']},
 {lv:'j',t:'年周運動',why:'同じ時刻に見える星座が季節で変わるのは、地球が1年で太陽を1周しているから。',f:'360° ÷ 12か月 ＝ 1か月に 30°（1日に約1°）<br>同じ位置に来る時刻は 1か月で約2時間早くなる',in:[['m','経過（か月）',1,1]],
  min:{m:0},c:v=>`同じ時刻で <b>${fmt(v.m*30,0)}°</b> 西へ。同じ位置に来るのは <b>${fmt(v.m*2,0)}時間</b> 早い時刻`,ex:['1月15日の午後9時に真南に見えたオリオン座が、2月15日に真南に見えるのは何時ごろ？','1か月で約2時間早くなるので、午後7時ごろ。']},
 {lv:'j',t:'太陽の南中高度',why:'季節によって太陽の高さが変わるのは、地軸が約23.4°傾いたまま公転しているから。',f:'夏至 ＝ 90° − 緯度 ＋ 23.4°<br>春分・秋分 ＝ 90° − 緯度<br>冬至 ＝ 90° − 緯度 − 23.4°',in:[['lat','緯度（北緯 °）',34.7,0.1]],
  min:{lat:0},max:{lat:66.5},c:v=>{const f=a=>a>90?`${fmt(180-a,1)}°（北の空）`:`${fmt(a,1)}°`;return `夏至 <b>${f(90-v.lat+23.4)}</b>　春分・秋分 <b>${f(90-v.lat)}</b>　冬至 <b>${f(90-v.lat-23.4)}</b>`;},ex:['北緯35°の地点での夏至の南中高度は？','90 − 35 + 23.4 ＝ 78.4°。初期値の34.7°は大阪の緯度です。']},
 {lv:'j',t:'月の満ち欠けと見える時刻',why:'月は約29.5日で満ち欠けし、南中する時刻は毎日約50分ずつ遅くなる。',f:'南中時刻 ≒ 正午 ＋ 月齢 × 約49分',in:[['a','月齢（日）',7.4,0.1]],min:{a:0},max:{a:29.5},
  c:v=>{const hr=(12+v.a*24/29.53)%24;return `${phaseName(v.a)}：南中は <b>${String(Math.floor(hr)).padStart(2,'0')}:${String(Math.round((hr%1)*60)%60).padStart(2,'0')}</b> ごろ`;},ex:['上弦の月が真南に見えるのは、いつごろ？','月齢約7.4 → 正午＋約6時間で、夕方6時ごろ。右半分が光り、真夜中ごろ西に沈む。']},
 {lv:'j',t:'金星の見え方',why:'金星は地球より内側を回るので、太陽から大きく離れて見えることがない。',f:'夕方の西の空 ＝ 宵の明星　／　明け方の東の空 ＝ 明けの明星<br>真夜中には見えない（太陽から最大約47°しか離れない）',in:[],c:null,ex:['大きく欠けて見える金星は、地球から遠い？近い？','近い。地球に近いほど大きく、細く欠けて見える。1F ガリレオの部屋の図で確かめられます。']},
 {lv:'h',t:'等級と明るさ',why:'1等級の差は約2.512倍。5等級違うとちょうど100倍の明るさの差。',f:'明るさの比 ＝ 100<sup>(m₂ − m₁)/5</sup> ＝ 2.512<sup>m₂ − m₁</sup>',in:[['m1','明るい星の等級 m₁',1,0.1],['m2','暗い星の等級 m₂',6,0.1]],
  c:v=>`<b>${sci(Math.pow(100,(v.m2-v.m1)/5))}</b> 倍`,ex:['シリウス（−1.5等）は6等星の何倍明るい？','差は7.5等級。100<sup>1.5</sup> ＝ 1000倍。']},
 {lv:'h',t:'年周視差とパーセク',why:'年周視差が1″の距離を1パーセク（pc）とする。距離は視差に反比例。',f:'距離 d［pc］＝ 1 ÷ 視差 p［″］　1 pc ≒ 3.26 光年',in:[['p','年周視差（秒角 ″）',0.768,0.001]],
  c:v=>`<b>${sci(1/v.p)} pc</b>（${sci(3.2616/v.p)} 光年）`,ex:['年周視差0.1″の恒星までの距離は？','1 ÷ 0.1 ＝ 10 pc ≒ 32.6光年。初期値0.768″はプロキシマ・ケンタウリ。']},
 {lv:'h',t:'絶対等級と距離指数',why:'星を10 pcの距離に置いたときの明るさが絶対等級 M。見かけの等級 m との差で距離がわかる。',f:'m − M ＝ 5 log₁₀ d − 5　→　d ＝ 10<sup>(m − M + 5)/5</sup>［pc］',in:[['m','見かけの等級 m',10,0.1],['M','絶対等級 M',0,0.1]],
  c:v=>{const d=Math.pow(10,(v.m-v.M+5)/5);return `<b>${sci(d)} pc</b>（${sci(d*3.2616)} 光年）`;},ex:['見かけ10等、絶対等級0等の星までの距離は？','m − M ＝ 10 → log d ＝ 3 → 1000 pc。']},
 {lv:'h',t:'星の色と温度（ウィーンの法則）',why:'熱い星ほど青白く、冷たい星ほど赤い。いちばん強く出す光の波長が温度に反比例。',f:'λ<sub>max</sub> ＝ 2.90 × 10⁻³ ÷ T［m］',in:[['T','表面温度 T（K）',5772,10]],
  c:v=>`<b>${sci(2.898e6/v.T)} nm</b> <span style="display:inline-block;width:1.4em;height:1.4em;border-radius:50%;vertical-align:-0.35em;margin-left:6px;border:1px solid var(--rule);background:${bbColor(v.T)}"></span>`,ex:['表面温度5800 Kの太陽が最も強く出す光の波長は？','2.90 × 10⁻³ ÷ 5800 ≒ 5.0 × 10⁻⁷ m ＝ 500 nm（緑〜青緑の光）。']},
 {lv:'h',t:'HR図',why:'星を温度と明るさで並べると、ほとんどの星は「主系列」の帯に乗る。星の一生を読む地図。',f:'横軸：表面温度（左ほど高温）　縦軸：光度（上ほど明るい）',in:[],c:null,hr:true,ex:['HR図の左下にあるのはどんな星？','高温だが暗い、つまり小さい星＝白色矮星（例：シリウスB）。']},
 {lv:'h',t:'ハッブルの法則と宇宙年齢',why:'遠くの銀河ほど速く遠ざかっている。宇宙が膨張している証拠。',f:'v ＝ H₀ d　　宇宙年齢の目安 ≒ 1 ÷ H₀',in:[['d','銀河までの距離（Mpc）',100,1],['H','ハッブル定数 H₀（km/s/Mpc）',70,0.5]],
  c:v=>`後退速度 <b>${sci(v.H*v.d)} km/s</b>　1/H₀ ≒ <b>${sci(9778/v.H)} 億年</b>`,ex:['H₀ ＝ 70 km/s/Mpc のとき、1/H₀ は何年？','1 Mpc ＝ 3.086 × 10¹⁹ km なので、1/H₀ ＝ 3.086×10¹⁹ ÷ 70 秒 ≒ 140億年。実際の宇宙年齢は約138億年。']},
 {lv:'h',t:'会合周期',why:'地球も動いているので、惑星が同じ見え方に戻る周期は公転周期と違う。',f:'内惑星：1/S ＝ 1/P − 1/E　外惑星：1/S ＝ 1/E − 1/P（E ＝ 1年）',in:[['P','惑星の公転周期 P（年）',1.881,0.001]],
  c:v=>{const S=1/Math.abs(1/v.P-1);return isFinite(S)?`会合周期 <b>${fmt(S,3)} 年</b>（${fmt(S*365.256,0)} 日）`:'—';},ex:['火星（P ＝ 1.88年）の会合周期は？','1/S ＝ 1 − 1/1.88 → S ≒ 2.14年。火星が見やすくなるのは約2年2か月ごと。']},
 {lv:'x',t:'円軌道の速さと周期',why:'万有引力が向心力になる。人工衛星の速さと周期はここから。',f:'G<i>Mm</i>/r² ＝ <i>m</i>v²/r　→　v ＝ √(GM/r)　T ＝ 2πr/v',in:[['h','地表からの高さ（km）',400,10]],min:{h:0},
  c:v=>{const r=6.371e6+v.h*1e3,vv=Math.sqrt(3.986004e14/r),Tt=TAU*r/vv;return `v ＝ <b>${fmt(vv/1000,2)} km/s</b>　T ＝ <b>${Tt<36000?fmt(Tt/60,1)+' 分':fmt(Tt/3600,2)+' 時間'}</b>`;},ex:['高度400 kmを回るISSの速さは？','r ＝ 6771 km、GM ＝ 3.99×10¹⁴ → v ≒ 7.67 km/s、約92分で1周。']},
 {lv:'x',t:'第一宇宙速度・第二宇宙速度',why:'地表すれすれの円軌道に必要な速さと、重力を振り切るのに必要な速さ。',f:'v₁ ＝ √(GM/R) ＝ √(gR)　　v₂ ＝ √(2GM/R) ＝ √2 · v₁',sel:true,in:[],
  c:v=>{const b=BODY[v.body];const v1=Math.sqrt(b[1]/b[2]);return `${b[0]}：v₁ ＝ <b>${fmt(v1/1000,2)} km/s</b>　v₂ ＝ <b>${fmt(Math.SQRT2*v1/1000,2)} km/s</b>`;},ex:['地球の第二宇宙速度は、なぜ第一宇宙速度の√2倍？','½mv₂² − GMm/R ＝ 0 から v₂ ＝ √(2GM/R)。v₁ ＝ √(GM/R) と比べると√2倍。']},
 {lv:'x',t:'静止衛星の高さ',why:'地球の自転と同じ周期で回れば、空の同じ場所に止まって見える。気象衛星「ひまわり」もこの軌道。',f:'GM T² ＝ 4π² r³　→　r ＝ (GM T² / 4π²)<sup>1/3</sup>',in:[['T','周期（時間）',23.934,0.001]],
  c:v=>{const Ts=v.T*3600,r=Math.cbrt(3.986004e14*Ts*Ts/(4*Math.PI*Math.PI));return `r ＝ <b>${fmt(r/1000,0)} km</b>　高さ ＝ <b>${fmt(r/1000-6371,0)} km</b>`;},ex:['静止衛星の周期を24時間ではなく23時間56分にするのはなぜ？','地球が恒星に対して1回転する時間（恒星日）が23時間56分だから。高さは約35,800 km。']},
 {lv:'x',t:'天体の質量をはかる',why:'衛星の公転半径と周期がわかれば、回られている天体の質量が出る。',f:'M ＝ 4π² r³ ÷ (G T²)',in:[['r','公転半径（km）',384400,100],['d','公転周期（日）',27.32,0.01]],
  c:v=>{const r=v.r*1e3,Ts=v.d*86400;return `M ＝ <b>${sci(4*Math.PI*Math.PI*r*r*r/(G*Ts*Ts))} kg</b>`;},presets:[['月 → 地球',{r:384400,d:27.32}],['地球 → 太陽',{r:149597871,d:365.256}],['イオ → 木星',{r:421700,d:1.769}]],
  ex:['月の公転（半径38.4万km、27.3日）から地球の質量を求めると？','約6.0 × 10²⁴ kg。実際の値 5.97 × 10²⁴ kg とよく合う。']},
 {lv:'x',t:'面積速度一定と近日点の速さ',why:'ケプラー第2法則は角運動量保存。太陽に近いほど速い。',f:'r₁v₁ ＝ r₂v₂（近日点・遠日点）　e ＝ (Q − q) ÷ (Q + q)',in:[['q','近日点距離 q',147.1,0.1],['Q','遠日点距離 Q',152.1,0.1]],
  c:v=>`近日点の速さは遠日点の <b>${fmt(v.Q/v.q,3)} 倍</b>　離心率 e ＝ <b>${fmt((v.Q-v.q)/(v.Q+v.q),4)}</b>`,presets:[['地球（百万km）',{q:147.1,Q:152.1}],['ハレー彗星（au）',{q:0.586,Q:35.1}]],
  ex:['ハレー彗星（q ＝ 0.59 au、Q ＝ 35.1 au）の速さの比は？','35.1 ÷ 0.586 ≒ 60倍。太陽のそばでは一気に駆け抜ける。']},
 {lv:'x',t:'ケプラー第3法則を導く',why:'円軌道なら、万有引力 ＝ 向心力 の1行から導ける。暗記より導出。',f:'GMm/r² ＝ m r ω²，ω ＝ 2π/T　→　T² ＝ (4π² / GM) r³',in:[],c:null,ex:['なぜ T²/a³ はどの惑星でも同じになる？','比例定数 4π²/GM に惑星の質量 m が入っていないから。決めるのは太陽の質量 M だけ。']}
];
const LV={j:['中学','j'],h:['高校','h'],x:['受験','x']};
const wrap=$('studyCards');
wrap.innerHTML=CARDS.map((c,i)=>`<article class="card" data-lv="${c.lv}">
<div class="row" style="gap:8px"><span class="lv ${LV[c.lv][1]}">${LV[c.lv][0]}</span></div>
<h3>${c.t}</h3><p class="why">${c.why}</p>
${TK.STUDYFIG&&TK.STUDYFIG[c.t]?`<canvas class="cv sfig" id="sf${i}" aria-label="${c.t}の図"></canvas>`:''}
<div class="formula">${c.f.split('<br>').map(l=>`<span>${l}</span>`).join('')}</div>
${c.presets?`<div class="chips" data-pre="${i}">${c.presets.map((p,j)=>`<button type="button" class="chip" data-j="${j}">${p[0]}</button>`).join('')}</div>`:''}
${c.sel?`<div class="chips" data-sel="${i}">${Object.keys(BODY).map((k,j)=>`<button type="button" class="chip" aria-pressed="${j===0}" data-b="${k}">${BODY[k][0]}</button>`).join('')}</div>`:''}
${c.in.length?`<div class="calc">${c.in.map(f=>`<label for="s${i}${f[0]}">${f[1]}</label><input id="s${i}${f[0]}" type="number" inputmode="decimal" step="${f[3]}" value="${f[2]}">`).join('')}</div>`:''}
${c.hr?`<canvas class="cv sq" id="hrCv" aria-label="HR図"></canvas>`:''}
${c.c?`<div class="result" style="font-size:16px" id="sr${i}">—</div>`:''}
<details><summary>例題</summary><p>${c.ex[0]}</p><details style="border:0;padding-top:4px"><summary>答えを見る</summary><div class="ans">${c.ex[1]}</div></details></details>
</article>`).join('');
const FIG={};
const wrapRes=h=>h.split('　').map(p=>`<span class="rv">${p}</span>`).join('');
CARDS.forEach((c,i)=>{const f=TK.STUDYFIG&&TK.STUDYFIG[c.t];const cv=document.getElementById('sf'+i);if(!f||!cv)return;const o={v:{}};o.st=makeCanvas(cv,st=>{st.ctx.clearRect(0,0,st.w,st.h);f(st.ctx,st.w,st.h,o.v);});FIG[i]=o;});
CARDS.forEach((c,i)=>{if(!c.c)return;const st={body:'earth'};const run=()=>{const v={...st};let ok=true;c.in.forEach(f=>{const x=parseFloat($(`s${i}${f[0]}`).value);if(!isFinite(x))ok=false;v[f[0]]=x;});
  let msg='正の数を入れてください';if(c.in.some(f=>['p','T','q','Q','d','r','P','H'].includes(f[0])&&v[f[0]]<=0))ok=false;
  if(ok&&c.min)for(const k in c.min)if(v[k]<c.min[k]){ok=false;msg=`${c.min[k]}以上の数を入れてください`;}
  if(ok&&c.max)for(const k in c.max)if(v[k]>c.max[k]){ok=false;msg=`${c.max[k]}以下の数を入れてください`;}
  if(ok&&'q' in v&&'Q' in v&&v.q>v.Q){ok=false;msg='近日点 q は遠日点 Q 以下にしてください';}
  $(`sr${i}`).innerHTML=ok?wrapRes(c.c(v)):msg;if(ok&&FIG[i]){FIG[i].v=v;FIG[i].st.redraw();}};
  c.in.forEach(f=>$(`s${i}${f[0]}`).addEventListener('input',run));
  const pre=wrap.querySelector(`[data-pre="${i}"]`);if(pre)pre.querySelectorAll('button').forEach(b=>b.onclick=()=>{const p=c.presets[+b.dataset.j][1];Object.keys(p).forEach(k=>$(`s${i}${k}`).value=p[k]);pre.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));run();});
  const sel=wrap.querySelector(`[data-sel="${i}"]`);if(sel)sel.querySelectorAll('button').forEach(b=>b.onclick=()=>{st.body=b.dataset.b;sel.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));run();});
  run();});
chips($('lvChips'),[['all','すべて'],['j','中学'],['h','高校'],['x','受験']],'all',k=>{wrap.querySelectorAll('.card').forEach(c=>c.hidden=!(k==='all'||c.dataset.lv===k));});

/* HR図 */
const HRS=[['太陽',5772,1],['シリウスA',9940,25],['ベガ',9600,40],['リゲル',12100,1.2e5],['ベテルギウス',3600,1e5],['アンタレス',3500,7.5e4],['アークトゥルス',4290,170],['プロキシマ',3042,0.0017],['シリウスB',25000,0.056]];
makeCanvas($('hrCv'),st=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);
  const L=40,Rp=12,Tp=12,B=34,x=t=>L+(Math.log10(40000)-Math.log10(t))/(Math.log10(40000)-Math.log10(2500))*(w-L-Rp),y=l=>Tp+(6-Math.log10(l))/10*(h-Tp-B);
  [1e-4,1e-2,1,1e2,1e4,1e6].forEach(l=>{line(ctx,L,y(l),w-Rp,y(l),T.grid,1);label(ctx,{'-4':'10⁻⁴','-2':'10⁻²','0':'1','2':'10²','4':'10⁴','6':'10⁶'}[Math.round(Math.log10(l))],L-6,y(l),T.muted,10,'right');});
  [30000,10000,6000,3000].forEach(t=>{line(ctx,x(t),Tp,x(t),h-B,T.grid,1);label(ctx,(t/1000)+'千K',x(t),h-B+14,T.muted,10,'center');});
  ctx.strokeStyle=T.sky;ctx.globalAlpha=.22;ctx.lineWidth=18;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x(35000),y(2e5));ctx.quadraticCurveTo(x(9000),y(30),x(2700),y(2e-4));ctx.stroke();ctx.globalAlpha=1;ctx.lineCap='butt';
  label(ctx,'主系列',x(14000),y(400)+16,T.sky,11,'left',700);label(ctx,'巨星・超巨星',x(4200),y(3e4)+22,T.muted,10,'center');label(ctx,'白色矮星',x(20000),y(5e-3)+14,T.muted,10,'center');
  HRS.forEach(([n,t,l])=>{const X=x(t),Y=y(l);dot(ctx,X,Y,5,bbColor(t));ctx.strokeStyle=T.rule;ctx.lineWidth=1;ctx.beginPath();ctx.arc(X,Y,5,0,TAU);ctx.stroke();label(ctx,n,X+8,Y-7,T.fg,10.5);});
  label(ctx,'光度（太陽＝1）',L,Tp-2,T.muted,10);
});
})();
