/* 4F 月と暦：今日の月、月カレンダー、次の満ち欠け、流星群、ハレー彗星 */
(function(){
const {T,$,fmt}=TK;
const JST=9*3600e3;
const pad=n=>String(n).padStart(2,'0');
const jstParts=d=>{const j=new Date(d.getTime()+JST);return {y:j.getUTCFullYear(),m:j.getUTCMonth()+1,d:j.getUTCDate(),h:j.getUTCHours(),mi:j.getUTCMinutes(),w:j.getUTCDay()};};
const fmtJ=d=>{const p=jstParts(d);return `${p.m}/${p.d} ${pad(p.h)}:${pad(p.mi)}`;};
const WD='日月火水木金土';
const PN={0:'新月',0.25:'上弦',0.5:'満月',0.75:'下弦'};
const now=new Date();

/* 小さな月アイコン（キャンバス要素） */
function moonCanvas(cv,age,size){const dpr=Math.min(devicePixelRatio||1,2);cv.width=size*dpr;cv.height=size*dpr;const c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,size,size);TK.moonIcon(c,size/2,size/2,size/2-1.5,age);}

/* ---------- 今日 ---------- */
const METEORS=[
 ['しぶんぎ座流星群',1,4,110,'北東の空。極大の時間が短く、見ごろは数時間。'],
 ['こと座流星群',4,22,18,'春の流星群。年によって突発的に増えることがある。'],
 ['みずがめ座η流星群',5,6,50,'ハレー彗星のちりが母体。日本では夜明け前の短い時間に。'],
 ['ペルセウス座流星群',8,13,100,'夏休みの定番。北東の空から、明るく速い流星が多い。'],
 ['オリオン座流星群',10,22,20,'これもハレー彗星のちりが母体。真夜中過ぎが見ごろ。'],
 ['しし座流星群',11,17,15,'約33年ごとに大出現。2001年には日本で1時間に数千個。'],
 ['ふたご座流星群',12,14,150,'年間最大級。夜8時ごろから一晩中見える。']
];
function meteorEvents(){const ev=[];const y0=jstParts(now).y;for(const y of[y0,y0+1])for(const m of METEORS){const peak=new Date(Date.UTC(y,m[1]-1,m[2],12)); /* その日の夜（日本時間21時） */ if(peak.getTime()>now.getTime()-86400e3)ev.push({m,peak,y});}ev.sort((a,b)=>a.peak-b.peak);return ev.slice(0,7);}
function moonLight(age){const a=Math.min(age,29.53-age);if(a<=4)return['好条件','月明かりがほとんどない'];if(a<=9)return['まずまず','月の出入りによって暗い時間がある'];return['月明かりあり','明るい月が出ている時間が長い'];}
function todayStrip(){
  const age=Moon.moonAge(now);$('todayAge').textContent=fmt(age,1);moonCanvas($('todayMoon'),age,34);
  const nx=Moon.nextPhases(now,4);const full=nx.find(p=>p.type===0.5),nw=nx.find(p=>p.type===0);
  const first=full.date<nw.date?full:nw;$('todayNextLb').textContent='次の'+PN[first.type];$('todayNext').textContent=fmtJ(first.date);
  const ev=meteorEvents()[0];if(ev)$('todayMeteor').textContent=`${ev.m[0].replace('流星群','')} ${ev.m[1]}/${ev.m[2]}`;
}

/* ---------- カレンダー ---------- */
let cur=(()=>{const p=jstParts(now);return {y:p.y,m:p.m};})();
function drawCal(){
  const {y,m}=cur;$('calTitle').textContent=`${y}.${pad(m)}`;
  const start=new Date(Date.UTC(y,m-1,1)-JST),end=new Date(Date.UTC(y,m,1)-JST);
  const ph=Moon.nextPhases(new Date(start.getTime()-86400e3),8).filter(p=>p.date>=start&&p.date<end);
  const first=new Date(Date.UTC(y,m-1,1)).getUTCDay(),days=new Date(Date.UTC(y,m,0)).getUTCDate();
  const tp=jstParts(now);
  let html=[...WD].map(w=>`<div class="dw">${w}</div>`).join('');
  for(let i=0;i<first;i++)html+='<div class="day out"></div>';
  for(let d=1;d<=days;d++){
    const e=ph.find(p=>jstParts(p.date).d===d);
    const isT=tp.y===y&&tp.m===m&&tp.d===d;
    html+=`<div class="day${isT?' is-today':''}"${e?` title="${PN[e.type]} ${fmtJ(e.date)}"`:''}><span class="n">${d}</span><canvas data-d="${d}" aria-hidden="true"></canvas><span class="ev">${e?PN[e.type]:''}</span></div>`;
  }
  const g=$('calGrid');g.innerHTML=html;
  g.querySelectorAll('canvas').forEach(cv=>{const d=+cv.dataset.d;const noon=new Date(Date.UTC(y,m-1,d,3));moonCanvas(cv,Moon.moonAge(noon),26);});
}
$('calPrev').onclick=()=>{cur.m--;if(cur.m<1){cur.m=12;cur.y--;}drawCal();};
$('calNext').onclick=()=>{cur.m++;if(cur.m>12){cur.m=1;cur.y++;}drawCal();};

/* ---------- 次の満ち欠け ---------- */
function drawPhases(){
  const list=Moon.nextPhases(now,8);
  $('phaseList').innerHTML=list.map((p,i)=>{const pp=jstParts(p.date);return `<div class="phase"><canvas data-i="${i}" aria-hidden="true"></canvas><div><span>${PN[p.type]}</span><b>${pp.y}.${pad(pp.m)}.${pad(pp.d)}（${WD[pp.w]}）</b><b>${pad(pp.h)}:${pad(pp.mi)}</b></div></div>`;}).join('');
  $('phaseList').querySelectorAll('canvas').forEach(cv=>{const t=list[+cv.dataset.i].type;moonCanvas(cv,t*29.530588+0.01,34);});
}
/* ---------- 流星群 ---------- */
function drawMeteors(){
  $('meteorList').innerHTML=meteorEvents().map(e=>{const age=Moon.moonAge(e.peak);const [lv,ds]=moonLight(age);return `<li><span class="when">${e.y}.${pad(e.m[1])}.${pad(e.m[2])}</span><span class="what"><b>${e.m[0]} <span class="pill${lv==='好条件'?'':' retro'}" style="margin-left:6px">${lv}</span></b><span>${e.m[4]} 理想条件で1時間に約${e.m[3]}個（ZHR）。極大の夜の月齢 ${fmt(age,1)}：${ds}。</span></span></li>`;}).join('');
}
/* ---------- ハレー ---------- */
function halley(){const t=new Date(Date.UTC(2061,6,28));const days=Math.ceil((t-now)/86400e3);$('halley').textContent=days.toLocaleString()+' 日';}

TK.meteorEvents=meteorEvents;TK.moonLight=moonLight;TK.PN=PN;
function all(){todayStrip();drawCal();drawPhases();drawMeteors();halley();}
all();
TK.onTheme.push(all);
})();
