/* 掲示板：研究員のタイムライン（計算した今夜の空＋出典を確認したニュース） */
(function(){
const {$,fmt}=TK;
const JST=9*3600e3,pad=n=>String(n).padStart(2,'0');
const jp=d=>{const j=new Date(d.getTime()+JST);return {y:j.getUTCFullYear(),m:j.getUTCMonth()+1,d:j.getUTCDate(),h:j.getUTCHours(),mi:j.getUTCMinutes()};};
const md=d=>{const p=jp(d);return `${p.m}月${p.d}日`;};
const hm=d=>{const p=jp(d);return `${pad(p.h)}:${pad(p.mi)}`;};
const now=new Date();
const daysTo=d=>Math.ceil((d-now)/86400e3);
const FACES=['niko','howa','kyoton','think','awa'];
const AV=k=>`<img src="img/i_${k}.webp" alt="" class="avimg">`;
const faceFor=p=>p.face&&FACES.includes(p.face)?p.face:null;

/* 出典を確認したニュース（新しい順に並べ替え） */
const MMX=new Date('2026-10-19T19:41:00Z');
let NEWS=[
 {date:'2026-09-28',tags:['ニュース','ロケット'],text:'SpaceXのスターシップが、初めて地球を回る軌道に乗りました。第14回の飛行で、新型のスターリンク衛星26機を軌道に放出。上昇中にエンジン1基が止まったため、予定の約10時間の飛行を約3時間に短縮し、ハワイ北方の太平洋に着水しています。',
  link:['https://www.wunc.org/national/2026-09-28/spacexs-starship-launches-on-first-orbital-mission-from-texas','wunc.org（NPR）','SpaceX’s Starship launches on first orbital mission from Texas']},
 {date:'2026-08-20',tags:['ニュース','ロケット','日本'],text:'日本の火星衛星探査機「MMX」は、10月20日 午前4時41分にH3ロケット10号機で種子島から打ち上げ予定と発表されました。火星の衛星フォボスの砂を持ち帰る世界初の計画で、地球への帰還は2031年度の予定です。打ち上げ日は天候などで変わることがあります。',
  link:['https://www.sakigake.jp/news/article/20260820CO0089/','sakigake.jp（共同通信）','火星衛星探査、10月20日出発 MMX、H3ロケットで']},
 {date:'2026-04-10',tags:['ニュース','有人探査'],text:'アルテミス2号の4人が月を回って地球に帰還しました。4月1日に打ち上げ、約10日間の飛行で地球から約40万6771 kmまで到達。アポロ13号の記録を抜き、人類が最も遠くまで行った記録を更新しました。乗組員はワイズマン、グローバー、コック、ハンセン（カナダ）の4人です。',
  link:['https://news.wttw.com/2026/04/10/artemis-ii-astronauts-return-moon-splashdown-close-out-record-breaking-lunar-voyage','news.wttw.com（AP）','Artemis II’s record-breaking journey around the moon ends with splashdown']}
];

/* 研究員の自動投稿（その場で計算） */
function autoPosts(){
  const out=[];
  const age=Moon.moonAge(now);const nx=Moon.nextPhases(now,4);
  const nw=nx.find(p=>p.type===0),fu=nx.find(p=>p.type===0.5);
  const near=Math.min(age,29.53-age);
  out.push({auto:true,date:now,tags:['研究員','今夜の空'],text:`今日の月齢は${fmt(age,1)}。次の新月は${md(nw.date)} ${hm(nw.date)}、次の満月は${md(fu.date)} ${hm(fu.date)}です。${near<=3?'いまは月明かりがほとんどないんだ。星を見るなら、今がいちばんのチャンスだよ！':near>=11?'今は月が明るい時期。星よりも、月そのものを眺めてみるのもいいと思うな。':'月が沈んだあとを狙ってみて。きっと星がよく見えるよ。'}`,moon:age});
  const ev=TK.meteorEvents?TK.meteorEvents()[0]:null;
  if(ev){const a=Moon.moonAge(ev.peak);const [lv,ds]=TK.moonLight(a);out.push({auto:true,date:new Date(now.getTime()-60e3),tags:['研究員','今夜の空'],text:`次の流星群は${ev.m[0]}。極大は${ev.m[1]}月${ev.m[2]}日ごろです。極大の夜の月齢は${fmt(a,1)}で、条件は「${lv}」（${ds}）。${ev.m[4]}`});}
  const d=daysTo(MMX);if(d>0)out.push({auto:true,date:new Date(now.getTime()-120e3),tags:['研究員','ロケット','日本'],text:`火星衛星探査機MMXの打ち上げ予定まで、あと${d}日。H3ロケット10号機で、10月20日 午前4時41分の予定です。フォボスの砂を持ち帰れたら世界初なんだ。ぼく、ずっと待ってたんだよ！`,count:d});
  return out;
}
let filter='all';
const liked=(()=>{try{return new Set(JSON.parse(localStorage.getItem('tk-liked')||'[]'));}catch(e){return new Set();}})();
const saveLiked=()=>{try{localStorage.setItem('tk-liked',JSON.stringify([...liked]));}catch(e){}};
const ICON={
 heart:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="currentColor" fill-opacity="var(--fill,0)" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
 copy:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 8h11v11H8zM5 16V5h11" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
 star:'<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.3l6-.7z" fill="currentColor"/></svg>'
};
function render(){
  const posts=[...autoPosts(),...NEWS.map(n=>({...n,date:new Date(n.date+'T12:00:00+09:00')}))].sort((a,b)=>b.date-a.date);
  posts.forEach((p,i)=>{p._face=faceFor(p)||FACES[i%FACES.length];});
  const show=posts.filter(p=>filter==='all'||p.tags.includes(filter));
  $('feed').innerHTML=show.map((p,i)=>{const id=(p.link?p.link[0]:'auto'+i);const isL=liked.has(id);
    return `<article class="post" data-id="${id}">
<div class="pav">${AV(p._face)}</div>
<div class="pbody">
<div class="phead"><b>研究員M</b><span class="pmeta">@ken9inM</span><span class="badge" title="研究所の公式投稿">${ICON.star}</span><span class="pmeta">· ${p.auto?'今日':md(p.date)}</span>${p.auto?'<span class="pauto">自動計算</span>':''}</div>
<p class="ptext">${p.text}</p>
${p.moon!=null?`<div class="pmoon"><canvas width="44" height="44" data-age="${p.moon}" aria-hidden="true"></canvas><span>月齢 <b>${fmt(p.moon,1)}</b></span></div>`:''}
${p.count?`<div class="pcount"><span class="num">${p.count}</span><span>日後に打ち上げ予定</span></div>`:''}
${p.link?`<a class="lcard" href="${p.link[0]}" target="_blank" rel="noopener"><span class="ld">${p.link[1]}</span><span class="lt">${p.link[2]}</span></a>`:''}
<div class="ptags">${p.tags.filter(t=>t!=='研究員').map(t=>`<span>#${t}</span>`).join('')}</div>
<div class="pact"><button type="button" class="pa like${isL?' on':''}" aria-pressed="${isL}" aria-label="いいね">${ICON.heart}<span>${isL?'いいね済み':'いいね'}</span></button><button type="button" class="pa copy" aria-label="本文をコピー">${ICON.copy}<span>コピー</span></button>${p.link?`<a class="pa" href="${p.link[0]}" target="_blank" rel="noopener">出典を開く</a>`:''}</div>
</div></article>`;}).join('')||'<p class="feed-end">この分類の投稿はまだありません。</p>';
  $('feed').querySelectorAll('canvas[data-age]').forEach(cv=>{const c=cv.getContext('2d');const dpr=Math.min(devicePixelRatio||1,2);cv.width=44*dpr;cv.height=44*dpr;cv.style.width='44px';cv.style.height='44px';c.setTransform(dpr,0,0,dpr,0,0);TK.moonIcon(c,22,22,20,+cv.dataset.age);});
  $('feed').querySelectorAll('.post').forEach(el=>{const id=el.dataset.id;
    el.querySelector('.like').onclick=e=>{const b=e.currentTarget;if(liked.has(id))liked.delete(id);else liked.add(id);saveLiked();const on=liked.has(id);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);b.querySelector('span').textContent=on?'いいね済み':'いいね';if(on&&!TK.RM){b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop');}};
    el.querySelector('.copy').onclick=e=>{const b=e.currentTarget,t=el.querySelector('.ptext').textContent;const done=ok=>{b.querySelector('span').textContent=ok?'コピーしました':'選択しました';setTimeout(()=>b.querySelector('span').textContent='コピー',1800);};
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(()=>done(true),()=>{sel(el);done(false);});}else{sel(el);done(false);}};
  });
}
function sel(el){const r=document.createRange();r.selectNodeContents(el.querySelector('.ptext'));const s=getSelection();s.removeAllRanges();s.addRange(r);}
const tabs=[['all','すべて'],['今夜の空','今夜の空'],['ニュース','ニュース'],['ロケット','ロケット'],['日本','日本']];
$('feedTabs').innerHTML=tabs.map(([k,t])=>`<button type="button" role="tab" class="ft${k===filter?' on':''}" aria-selected="${k===filter}" data-k="${k}">${t}</button>`).join('');
$('feedTabs').querySelectorAll('.ft').forEach(b=>b.onclick=()=>{filter=b.dataset.k;$('feedTabs').querySelectorAll('.ft').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b);});render();});

/* これからの予定 */
function upcoming(){
  const items=[];
  Moon.nextPhases(now,4).forEach(p=>{if(p.type===0||p.type===0.5)items.push([p.date,TK.PN[p.type],`${hm(p.date)}`]);});
  if(MMX>now)items.push([MMX,'MMX打ち上げ（H3 10号機）','04:41 予定']);
  (TK.meteorEvents?TK.meteorEvents().slice(0,3):[]).forEach(e=>items.push([e.peak,e.m[0],'極大ごろ']));
  items.sort((a,b)=>a[0]-b[0]);
  $('upcoming').innerHTML=items.slice(0,6).map(([d,t,s])=>`<li><span class="ud"><b>${jp(d).m}/${jp(d).d}</b><small>あと${Math.max(0,daysTo(d))}日</small></span><span><b>${t}</b><small>${s}</small></span></li>`).join('');
}
render();upcoming();
TK.onTheme.push(render);

/* 最新ニュースを読み込む：Claudeのページでは共有データベース、ほかのサイト（Netlifyなど）では news.json */
const BASE=NEWS.slice();
function applyRows(raw){
  const rows=(raw||[]).filter(r=>r&&typeof r.text==='string'&&typeof r.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)).map(r=>({
    date:r.date,face:typeof r.face==='string'?r.face:null,
    tags:Array.isArray(r.tags)?r.tags.filter(t=>typeof t==='string').slice(0,5):['ニュース'],
    text:esc(r.text),link:r.url&&/^https:\/\//.test(r.url)?[r.url,esc(r.site||''),esc(r.title||'')]:null}))
    .sort((x,y)=>x.date<y.date?1:-1).slice(0,60);
  if(!rows.length){NEWS=BASE;render();return;}
  const urls=new Set(rows.map(r=>r.link&&r.link[0]));
  NEWS=rows.concat(BASE.filter(b=>!urls.has(b.link[0])));
  const lu=rows.reduce((m,r)=>r.date>m?r.date:m,'');if(lu){const [y,mo,da]=lu.split('-');$('feedUpdated').textContent=`${y}年${+mo}月${+da}日`;}
  render();
}
(async()=>{
  if(!window.claude||!window.claude.use){
    try{const r=await fetch('news.json',{cache:'no-store'});if(r.ok){const j=await r.json();applyRows(Array.isArray(j)?j:j.items);}}catch(e){}
    return;
  }
  let db=null;try{db=await window.claude.use('db');}catch(e){}
  if(!db)return;
  try{db.collection('news').orderBy('date','desc').limit(60).onSnapshot(snap=>applyRows(snap.docs.map(d=>d.data())),()=>{});}catch(e){}
})();
function esc(t){return String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
})();
