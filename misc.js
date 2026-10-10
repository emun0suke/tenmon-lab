/* 6F 宇宙の年表・7F 近くの星・8F 本棚・9F 豆知識・受付・ナビ */
(function(){
const {T,TAU,$,fmt,chips,makeCanvas,label,line,dot,circle}=TK;

/* ---------- 宇宙の年表 ---------- */
const AGE=13.8e9;
const COS=[
 {t:'138億年前',ago:13.8e9,h:'ビッグバン',s:'宇宙は、とても熱く密度の高い状態から膨張を始めました。'},
 {t:'10⁻³⁶秒後ごろ',ago:13.8e9,h:'インフレーション',s:'宇宙が一瞬で急激に膨張したと考えられています（理論）。'},
 {t:'約3分後',ago:13.8e9,h:'元素のもとができる',s:'水素とヘリウムの原子核ができました。質量で水素約75%、ヘリウム約25%。'},
 {t:'約38万年後',ago:13.8e9-3.8e5,h:'宇宙の晴れ上がり',s:'原子ができて、光がまっすぐ進めるようになりました。その光は今も約2.7 Kの「宇宙マイクロ波背景放射」として届いています。'},
 {t:'約1〜2億年後',ago:13.65e9,h:'最初の星が輝く',s:'「宇宙の夜明け」。ジェイムズ・ウェッブ宇宙望遠鏡は、ビッグバンから約3億年後の銀河まで見つけています。'},
 {t:'約100億年前',ago:10e9,h:'星づくりの最盛期',s:'宇宙全体で星が最も盛んに生まれていた時代です。'},
 {t:'約46億年前',ago:4.6e9,h:'太陽系の誕生',s:'ガスとちりの雲が縮んで太陽が生まれ、周りの円盤から惑星ができました。'},
 {t:'約45億年前',ago:4.5e9,h:'月の誕生',s:'火星ほどの天体が若い地球にぶつかり、飛び散った破片から月ができたという「ジャイアント・インパクト説」が有力です。'},
 {t:'約38億年前',ago:3.8e9,h:'地球の生命',s:'このころまでに生命が生まれていたと考えられています（時期には諸説あります）。'},
 {t:'約6600万年前',ago:6.6e7,h:'恐竜の絶滅',s:'直径約10 kmの小惑星がユカタン半島付近に衝突しました。'},
 {t:'約30万年前',ago:3e5,h:'ホモ・サピエンス',s:'わたしたちの種が現れました。'},
 {t:'現在',ago:0,now:true,h:'宇宙は138億歳',s:'見えている宇宙の果ては、膨張のため約465億光年の距離にあります。'},
 {t:'約10億年後',fut:true,h:'地球の海が失われ始める',s:'太陽は少しずつ明るくなっており、地球の海が蒸発し始めると考えられています。'},
 {t:'数十億年後',fut:true,h:'天の川銀河とアンドロメダ銀河',s:'45億年後ごろの衝突が有力とされてきましたが、2025年の研究では、100億年以内に合体する確率は約50%と見直されました。'},
 {t:'約50億年後',fut:true,h:'太陽が赤色巨星に',s:'燃料の水素を使い果たした太陽は大きくふくらみ、その後、白色矮星として静かに冷えていきます。'},
 {t:'約100兆年後',fut:true,h:'星が生まれなくなる',s:'星の材料になるガスが尽き、新しい星ができなくなると考えられています。'},
 {t:'10¹⁰⁰年以上後',fut:true,h:'ブラックホールも蒸発する',s:'ホーキング放射で、ブラックホールもゆっくり消えていくと予想されています（一つの未来像）。'}
];
const YS=365*86400/AGE; /* 1年あたりの宇宙カレンダー秒 */
const pad=n=>String(n).padStart(2,'0');
function ccDate(ago){if(ago<=0)return '12月31日 24:00（現在）';const sec=(AGE-ago)*YS;const d=new Date(Date.UTC(2025,0,1)+sec*1000);const m=d.getUTCMonth()+1,dd=d.getUTCDate();const lastDay=m===12&&dd===31;return lastDay||ago<2e6?`${m}月${dd}日 ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`:`${m}月${dd}日`;}
$('cosmosList').innerHTML=COS.map(c=>`<li class="${c.now?'now':c.fut?'fut':''}"><span class="t">${c.t}</span><span class="m"><i></i></span><span><b>${c.h}</b><span class="s">${c.s}</span></span><span class="cc">${c.fut?'未来':c.now?'12月31日 24:00':ccDate(c.ago)}</span></li>`).join('');
const CCE=[[13.8e9,'ビッグバン'],[13.65e9,'最初の星'],[10e9,'星づくりの最盛期'],[4.6e9,'太陽系'],[3.8e9,'生命'],[6.6e7,'恐竜の絶滅'],[3e5,'人類']];
makeCanvas($('ccCv'),st=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);
  const L=36,R=w-10,top=8,rh=(h-top-8)/12;const DM=[31,28,31,30,31,30,31,31,30,31,30,31];
  for(let m=0;m<12;m++){const y=top+rh*m+rh/2;label(ctx,(m+1)+'月',L-6,y,T.muted,11,'right');ctx.fillStyle=T.grid;ctx.fillRect(L,y-3,R-L,6);}
  CCE.forEach(([ago,nm],i)=>{const sec=(AGE-ago)*YS;const d=new Date(Date.UTC(2025,0,1)+sec*1000);const m=d.getUTCMonth(),day=d.getUTCDate()-1+d.getUTCHours()/24;
    const x=L+(R-L)*(day/DM[m]),y=top+rh*m+rh/2;dot(ctx,x,y,4.5,ago<1e8?T.planet:T.brass);
    const up=nm==='人類'||nm==='最初の星'||nm==='生命';label(ctx,nm,Math.min(x,R-4),y+(up?-12:12),T.fg,10.5,x>R-80?'right':'left');});
});
const ccIn=$('ccIn');function cc(){const raw=ccIn.value.trim(),v=+raw;$('ccOut').textContent=raw===''||!isFinite(v)?'数値を入れてください':v>=0&&v<=138?ccDate(v*1e8):'0〜138で入力';}
ccIn.addEventListener('input',cc);cc();

/* ---------- 近くの星 ---------- */
const SC={A:'#9bb8ff',F:'#f5f3d8',G:'#fff1c9',K:'#ffc58a',M:'#ff8a6b',BD:'#b27bd6',WD:'#e8e8f0'};
const NEAR=[
 ['プロキシマ・ケンタウリ',4.24,14.50,'M','赤色矮星','×（11等）'],
 ['ケンタウルス座α星 A・B',4.37,14.66,'G','太陽に似た星の連星','○（−0.27等）'],
 ['バーナード星',5.96,17.96,'M','赤色矮星','×'],
 ['ルーマン16 A・B',6.5,10.82,'BD','褐色矮星の連星','×'],
 ['WISE 0855−0714',7.4,8.92,'BD','とても冷たい褐色矮星','×'],
 ['ウォルフ359',7.86,10.94,'M','赤色矮星','×'],
 ['ラランド21185',8.31,11.06,'M','赤色矮星','×（7.5等）'],
 ['シリウス A・B',8.6,6.75,'A','A型星＋白色矮星','○（−1.46等）'],
 ['ルイテン726-8 A・B',8.7,1.65,'M','赤色矮星の連星','×'],
 ['ロス154',9.7,18.83,'M','赤色矮星','×'],
 ['ロス248',10.3,23.70,'M','赤色矮星','×'],
 ['エリダヌス座ε星',10.5,3.55,'K','惑星をもつK型星','○（3.7等）'],
 ['ラカイユ9352',10.7,23.10,'M','赤色矮星','×（7.3等）'],
 ['ロス128',11.0,11.80,'M','赤色矮星','×'],
 ['みずがめ座EZ星',11.1,22.64,'M','赤色矮星の三重連星','×'],
 ['はくちょう座61番星 A・B',11.4,21.12,'K','K型星の連星','○（5.2等）'],
 ['プロキオン A・B',11.4,7.66,'F','F型星＋白色矮星','○（0.34等）']
];
const LOFF={'ウォルフ359':16,'ルーマン16 A・B':-2,'ラランド21185':-14,'ロス128':6};
makeCanvas($('nearCv'),st=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);const cx=w/2,cy=h/2,R=Math.min(w,h)/2-18,s=R/12;
  for(let r=2;r<=12;r+=2){circle(ctx,cx,cy,r*s,T.grid,1,r%4?[2,4]:[]);label(ctx,r+'光年',cx+4,cy-r*s+8,T.muted,9.5);}
  const narrow=w<520;NEAR.forEach(([n,d,ra,ty],i)=>{const a=ra/24*TAU;const x=cx+Math.cos(a)*d*s,y=cy-Math.sin(a)*d*s;line(ctx,cx,cy,x,y,T.grid,1);
    const col=SC[ty];dot(ctx,x,y,ty==='A'||ty==='F'?5.5:ty==='G'||ty==='K'?4.5:3.4,col);ctx.strokeStyle=T.rule;ctx.beginPath();ctx.arc(x,y,ty==='A'?5.5:4,0,TAU);ctx.stroke();
    if(narrow&&ty==='M'&&n!=='プロキシマ・ケンタウリ'&&n!=='バーナード星')return;
    const t=n.split(' ')[0];ctx.font='500 10px "Zen Kaku Gothic New",system-ui,sans-serif';const tw=ctx.measureText(t).width;let right=x>cx;if(!right&&x-7-tw<2)right=true;if(right&&x+7+tw>w-2)right=false;
    label(ctx,t,x+(right?7:-7),y+(LOFF[n]??(i%2?9:-9)),T.fg,10,right?'left':'right');});
  dot(ctx,cx,cy,6,T.sun);label(ctx,'太陽',cx+9,cy+10,T.sun,11,'left',700);
});
$('nearBody').innerHTML=NEAR.map(n=>`<tr><td><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${SC[n[3]]};margin-right:7px"></span>${n[0]}</td><td class="d">${n[1]}</td><td>${n[4]}</td><td>${n[5]}</td></tr>`).join('');
const VEH={c:['光',299792.458,'1年で約9.46兆km進みます。'],v1:['ボイジャー1号',17,'1977年打ち上げ。人類が作ったもので最も遠くにある探査機。'],psp:['パーカー・ソーラー・プローブ',192,'太陽に最接近するときの速さ（人工物の最速記録、約190 km/s）。'],jet:['旅客機',0.25,'時速約900 km。'],train:['新幹線',0.0833,'時速300 km。']};
let veh='v1';
function tr(){const d=+$('trD').value,v=VEH[veh][1];if(!(d>0)){$('trOut').textContent='—';return;}const yrs=d*9.4607e12/v/3.15576e7;$('trOut').textContent=yrs<1000?fmt(yrs,yrs<10?2:0)+' 年':(yrs>=1e8?(yrs/1e8).toFixed(1)+' 億年':(yrs>=1e4?Math.round(yrs/1e4).toLocaleString()+' 万年':Math.round(yrs).toLocaleString()+' 年'));$('trNote').textContent=VEH[veh][2];}
chips($('trChips'),Object.keys(VEH).map(k=>[k,VEH[k][0]]),'v1',k=>{veh=k;tr();});
$('trD').addEventListener('input',tr);tr();

/* ---------- 宇宙の本棚 ---------- */
const SHELF=[
 ['漫画','宇宙兄弟','小山宙哉｜講談社「モーニング」2007年〜。アニメ・実写映画化','宇宙飛行士を目指す兄弟の物語。選抜試験、訓練、月面での活動まで、宇宙飛行士という仕事の現実が細かく描かれます。','→ 5F 円軌道の速さ'],
 ['漫画・アニメ','チ。―地球の運動について―','魚豊｜小学館「ビッグコミックスピリッツ」2020〜2022年。2024〜2025年アニメ化。第26回手塚治虫文化賞マンガ大賞','命がけで地動説を研究し、次の世代へ受け継いでいく人々の物語。舞台は架空の国で、史実のコペルニクスとは別のフィクションです。','→ 1F 歴史館'],
 ['漫画・アニメ','プラネテス','幸村誠｜講談社「モーニング」1999〜2004年。2003〜2004年アニメ化','宇宙ごみ（スペースデブリ）を回収する仕事の物語。デブリが衝突で連鎖的に増える「ケスラーシンドローム」は、今まさに現実の課題です。','→ 1F ニュートンの大砲'],
 ['漫画','ふたつのスピカ','柳沼行｜メディアファクトリー「月刊コミックフラッパー」2001〜2009年。アニメ・ドラマ化','宇宙学校で学びながら宇宙飛行士を目指す少女の成長物語。','→ 7F 近くの星'],
 ['漫画・アニメ','恋する小惑星','Quro｜芳文社「まんがタイムきららキャラット」。2020年アニメ化','地学部で天文と地質を学ぶ高校生たち。夢は新しい小惑星を見つけること。小惑星は発見者が名前を提案し、国際天文学連合が承認します。','→ 5F 学びの階段'],
 ['小説','銀河鉄道の夜','宮沢賢治｜1934年刊（没後）','白鳥座から南十字星（サウザンクロス）まで、天の川に沿って走る鉄道の旅。実在の星座が順に登場します。','→ 3F 星空の部屋'],
 ['アニメ映画','君の名は。','新海誠監督｜2016年','1200年ぶりに地球に近づく架空の「ティアマト彗星」が物語の鍵。彗星の核が分裂する現象は、実際の彗星でも観測されています。','→ 4F 遠い暦'],
 ['アニメ','ほしのこえ','新海誠｜2002年','地球と宇宙の間でメールが届くまで、何年もかかっていく恋の物語。光の速さにも限りがあることを実感させます。','→ 7F 届くまでの時間'],
 ['映画','2001年宇宙の旅','スタンリー・キューブリック監督｜1968年','回転して人工重力をつくる宇宙船、音のない宇宙空間。半世紀以上たっても科学考証の細かさで語られる作品。','→ 5F 円軌道'],
 ['映画','インターステラー','クリストファー・ノーラン監督｜2014年','ブラックホールの映像は、物理学者キップ・ソーンの協力で計算して作られました。強い重力の近くでは時間がゆっくり進みます。','→ 6F 宇宙の年表'],
 ['映画','オデッセイ','リドリー・スコット監督｜2015年。原作アンディ・ウィアー『火星の人』','火星に一人取り残された植物学者の生還劇。火星の重力は地球の約0.38倍。地球と行き来しやすい時期は約2.1年ごとにしか来ません。','→ 5F 会合周期']
];
$('shelfCards').innerHTML=SHELF.map(s=>`<div class="tr"><span class="k">${s[0]}</span><h3 style="font-size:19px">${s[1]}</h3><p style="font-size:12px">${s[2]}</p><p style="color:var(--fg)">${s[3]}</p><span class="exam">${s[4]}</span></div>`).join('');

/* ---------- 豆知識 ---------- */
const TRI=[
 ['243日','金星では、1日が1年より長い','金星の自転は約243日、公転は約225日。しかも逆向きに自転しています。','内惑星の性質'],
 ['8分19秒','今見ている太陽は8分19秒前の姿','太陽の光が地球に届くまでの時間。1天文単位 ÷ 光の速さで計算できます。','光速と天文単位'],
 ['3.8 cm','月は毎年、地球から遠ざかっている','アポロ計画で月に置いた反射板にレーザーを当てて測った値。潮の満ち引きが地球の自転にブレーキをかけ、その分だけ月が遠ざかります。','潮汐'],
 ['0.69','土星は水に浮く（計算上は）','平均密度は約0.69 g/cm³で、水より小さい。浮かべられるほど大きなお風呂があれば、の話です。','密度'],
 ['4分','星は毎日4分ずつ早く昇る','地球が恒星に対して1回転する恒星日は23時間56分。太陽日との差が、1か月で約2時間になります。','日周運動と年周運動'],
 ['1604年','天の川銀河で肉眼で見えた最後の超新星','ケプラーが観測した「ケプラーの超新星」。それ以来、銀河系内の超新星は肉眼で見られていません。',''],
 ['2.6万年','北極星は交代する','地球の自転軸は約2万6000年かけてこまのように首を振っています（歳差）。約1万2000年後には、こと座のベガが北極星の近くに来ます。','歳差運動'],
 ['金属の鼻','ティコ・ブラーエの付け鼻','20歳のころ決闘で鼻の一部を失い、金属の付け鼻をしていたと伝えられています。',''],
 ['魔女裁判','ケプラーは母を弁護した','ケプラーの母は魔女の疑いで裁判にかけられ、ケプラー自身が弁護して無罪を勝ち取りました（1615〜1621年）。',''],
 ['約500','ハッブルの最初の値は7倍も大きかった','1929年にハッブルが出した宇宙膨張の値は約500 km/s/Mpc。今の値は約67〜73で、まだ測り方によって食い違いがあります。','ハッブルの法則'],
 ['99.86%','太陽系の重さはほぼ太陽','太陽系全体の質量の99.86%を太陽が占めています。残りの大部分は木星です。',''],
 ['2.7 K','宇宙の温度','宇宙マイクロ波背景放射の温度は約2.725 K（約−270℃）。ビッグバンの名残の光です。','宇宙の年表'],
 ['88','星座の数','1922年に国際天文学連合が88星座を決め、1928年に境界線を採択しました（1930年に公表）。','黄道12星座'],
 ['約9割','ISSにも重力はある','高度400 kmでも重力は地上の約9割。ふわふわ浮くのは、地球の周りを落ち続けている（自由落下している）からです。','円運動と万有引力'],
 ['1月初め','地球が太陽に一番近いのは真冬','季節は距離ではなく、地軸の傾き（約23.4°）で決まります。','南中高度'],
 ['1992年','ガリレオの名誉回復','ローマ教皇ヨハネ・パウロ2世が、ガリレオ裁判の誤りを正式に認めました。裁判から359年後のことです。','']
];
$('triviaCards').innerHTML=TRI.map(t=>`<div class="tr"><span class="big">${t[0]}</span><h3>${t[1]}</h3><p>${t[2]}</p>${t[3]?`<span class="exam">入試につながる：${t[3]}</span>`:''}</div>`).join('');

/* ---------- 受付（支援） ---------- */
/* 各サービスのURLをここに入れると「〇〇で応援する」ボタンになります */
const SUPPORT_LINKS={ofuse:'https://ofuse.me/kenkyuinm',booth:''};
/* BOOTH：ショップと商品を公開したら BOOTH_OPEN を true にする（それまでは「公開準備中」表示でリンクしない） */
const BOOTH_OPEN=true;
const BOOTH_ITEMS={'ポラリス':'https://booth.pm/ja/items/8963337','ベガ':'https://booth.pm/ja/items/8963337','シリウス':'https://booth.pm/ja/items/8963337','太陽':'https://booth.pm/ja/items/8963337'}; /* 4つの星は1商品のバリエーション */
const BOOTH_WALL=''; /* 壁紙セットは出品しない */
const linkFor=(k,star)=>k==='booth'?(BOOTH_OPEN?BOOTH_ITEMS[star]||'':''):SUPPORT_LINKS[k];
const PAY=[
 ['ofuse','OF','OFUSE（オフセ）',['1回','カード','ファンレター'],'好きな額で応援できて、研究員Mへのファンレターも一緒に送れます。'],
 ['booth','BO','BOOTH',['グッズ','BOOST'],'グッズや資料を買って応援。購入時に金額を上乗せする「BOOST」もできます。']
];
const tiersEl=$('tiers'),box=$('payBox');
function openPay(btn){
  tiersEl.querySelectorAll('.tier').forEach(t=>{const on=t===btn;t.classList.toggle('sel',on);t.setAttribute('aria-expanded',String(on));});
  const star=btn.dataset.star,yen=Number(btn.dataset.yen).toLocaleString();
  $('pbTitle').innerHTML=`<b>${star}</b> をひとつ灯す <span>${yen} G</span>`;
  $('payGrid').innerHTML=PAY.map(([k,ic,nm,tags,ds])=>{const u=linkFor(k,star);return `<div class="pm"><div class="hd"><span class="ic">${ic}</span><b>${nm}</b></div><div class="tags">${tags.map(t=>`<span>${t}</span>`).join('')}</div><p>${ds}</p>${u?`<a class="btn solid go" href="${u}" target="_blank" rel="noopener">${nm}で ${star} を灯す</a>`:`<span class="btn go" aria-disabled="true">${k==='booth'?'BOOTH公開準備中':'準備中'}</span>`}</div>`;}).join('');
  box.hidden=false;
}
tiersEl.querySelectorAll('.tier').forEach(t=>t.onclick=()=>{if(t.classList.contains('sel')){closePay();return;}openPay(t);});
function closePay(){box.hidden=true;tiersEl.querySelectorAll('.tier').forEach(t=>{t.classList.remove('sel');t.setAttribute('aria-expanded','false');});}
$('pbClose').onclick=closePay;
if(BOOTH_OPEN&&BOOTH_WALL){const wg=$('wallGo');if(wg){wg.innerHTML=`<a class="btn solid oc-go" href="${BOOTH_WALL}" target="_blank" rel="noopener">惑星の軌跡 壁紙セット（500 G）</a>`;const sb=wg.closest('.oc').querySelector('.soon');if(sb)sb.textContent='販売中';}}

/* ---------- ナビの現在地 ---------- */
const links=[...document.querySelectorAll('.nav a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));const on=links.find(a=>a.classList.contains('on'));if(on&&on.scrollIntoView)on.parentElement.scrollTo({left:on.offsetLeft-40,behavior:'smooth'});}}),{rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('main > section[id]').forEach(s=>io.observe(s));
})();
