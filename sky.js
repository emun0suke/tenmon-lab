/* 3F 星空の部屋：日時と場所から計算する星座早見、季節の星、黄道12星座、南天、物語 */
(function(){
const {T,TAU,$,fmt,dot,circle,label,line,chips,makeCanvas}=TK;const D=TK.R;
/* 明るい恒星（J2000.0 赤経[時]・赤緯[度]・等級） */
const S={
betelgeuse:[5.919,7.41,0.5,'ベテルギウス'],rigel:[5.242,-8.20,0.13,'リゲル'],bellatrix:[5.419,6.35,1.64],saiph:[5.796,-9.67,2.06],alnitak:[5.679,-1.94,1.77],alnilam:[5.603,-1.20,1.69],mintaka:[5.533,-0.30,2.23],meissa:[5.585,9.93,3.39],
sirius:[6.752,-16.72,-1.46,'シリウス'],mirzam:[6.378,-17.96,1.98],adhara:[6.977,-28.97,1.5],wezen:[7.140,-26.39,1.83],aludra:[7.401,-29.30,2.45],
procyon:[7.655,5.22,0.34,'プロキオン'],gomeisa:[7.453,8.29,2.89],
castor:[7.577,31.89,1.58,'カストル'],pollux:[7.755,28.03,1.14,'ポルックス'],alhena:[6.629,16.40,1.93],mebsuta:[6.732,25.13,2.98],tejat:[6.383,22.51,2.87],wasat:[7.335,21.98,3.5],
aldebaran:[4.599,16.51,0.86,'アルデバラン'],elnath:[5.438,28.61,1.65],zetatau:[5.627,21.14,3.0],gammatau:[4.330,15.63,3.65],epstau:[4.477,19.18,3.53],pleiades:[3.791,24.11,2.87,'すばる'],
capella:[5.278,46.00,0.08,'カペラ'],menkalinan:[5.992,44.95,1.9],thetaaur:[5.995,37.21,2.6],iotaaur:[4.950,33.17,2.69],
mirfak:[3.405,49.86,1.79],algol:[3.136,40.96,2.1,'アルゴル'],
schedar:[0.675,56.54,2.24],caph:[0.153,59.15,2.28],navi:[0.945,60.72,2.15],ruchbah:[1.430,60.24,2.66],segin:[1.907,63.67,3.35],
dubhe:[11.062,61.75,1.79],merak:[11.031,56.38,2.37],phecda:[11.897,53.69,2.44],megrez:[12.257,57.03,3.31],alioth:[12.900,55.96,1.77],mizar:[13.399,54.93,2.27],alkaid:[13.792,49.31,1.86],
polaris:[2.530,89.26,1.98,'北極星'],kochab:[14.845,74.16,2.08],pherkad:[15.345,71.83,3.0],yildun:[17.537,86.59,4.35],epsumi:[16.766,82.04,4.2],zetaumi:[15.734,77.79,4.3],etaumi:[16.292,75.76,4.95],
regulus:[10.140,11.97,1.35,'レグルス'],denebola:[11.818,14.57,2.14,'デネボラ'],algieba:[10.333,19.84,2.0],zosma:[11.235,20.52,2.56],chertan:[11.237,15.43,3.33],adhafera:[10.278,23.42,3.4],rasalas:[9.880,26.01,3.9],epsleo:[9.764,23.77,2.98],etaleo:[10.122,16.76,3.5],
spica:[13.420,-11.16,0.98,'スピカ'],porrima:[12.694,-1.45,2.74],vindemiatrix:[13.036,10.96,2.85],deltavir:[12.927,3.40,3.38],zetavir:[13.578,-0.60,3.37],betavir:[11.845,1.76,3.6],
arcturus:[14.261,19.18,-0.05,'アークトゥルス'],izar:[14.750,27.07,2.37],muphrid:[13.911,18.40,2.68],seginus:[14.535,38.31,3.04],nekkar:[15.032,40.39,3.5],deltaboo:[15.258,33.31,3.47],
antares:[16.490,-26.43,1.06,'アンタレス'],dschubba:[16.006,-22.62,2.29],acrab:[16.091,-19.81,2.62],pisco:[15.981,-26.11,2.89],sigsco:[16.353,-25.59,2.9],tausco:[16.598,-28.22,2.8],epssco:[16.836,-34.29,2.29],musco:[16.864,-38.05,3.0],zetasco:[16.910,-42.36,3.6],etasco:[17.203,-43.24,3.33],thetasco:[17.622,-43.00,1.86],iotasco:[17.793,-40.13,3.0],kappasco:[17.708,-39.03,2.39],shaula:[17.560,-37.10,1.62],lesath:[17.513,-37.30,2.7],
kausaus:[18.403,-34.38,1.85],nunki:[18.921,-26.30,2.05],ascella:[19.044,-29.88,2.6],kausmed:[18.350,-29.83,2.7],kausbor:[18.466,-25.42,2.81],alnasl:[18.097,-30.42,2.99],phisgr:[18.761,-26.99,3.17],tausgr:[19.116,-27.67,3.3],
vega:[18.616,38.78,0.03,'ベガ（織姫）'],sheliak:[18.835,33.36,3.5],sulafat:[18.982,32.69,3.25],zetalyr:[18.746,37.61,4.3],deltalyr:[18.908,36.90,4.3],
deneb:[20.690,45.28,1.25,'デネブ'],sadr:[20.370,40.26,2.23],albireo:[19.512,27.96,3.05],gienah:[20.770,33.97,2.48],deltacyg:[19.750,45.13,2.87],
altair:[19.846,8.87,0.77,'アルタイル（彦星）'],tarazed:[19.771,10.61,2.72],alshain:[19.922,6.41,3.71],zetaaql:[19.090,13.86,2.99],deltaaql:[19.425,3.11,3.36],lambdaaql:[19.104,-4.88,3.43],
markab:[23.079,15.21,2.48],scheat:[23.063,28.08,2.42],algenib:[0.220,15.18,2.83],alpheratz:[0.140,29.09,2.06],enif:[21.736,9.88,2.38],homam:[22.691,10.83,3.4],
mirach:[1.162,35.62,2.05],almach:[2.065,42.33,2.1],deltaand:[0.656,30.86,3.27],
hamal:[2.120,23.46,2.0],sheratan:[1.911,20.81,2.64],mesarthim:[1.892,19.29,3.9],
acubens:[8.975,11.86,4.25],altarf:[8.275,9.19,3.5],asaus:[8.745,18.15,3.94],asbor:[8.721,21.47,4.66],iotacnc:[8.778,28.76,4.0],
zubenelg:[14.848,-16.04,2.75],zubenesch:[15.283,-9.38,2.61],siglib:[15.068,-25.28,3.29],gamlib:[15.592,-14.79,3.9],
algedi:[20.300,-12.54,3.57],dabih:[20.350,-14.78,3.08],psicap:[20.768,-25.27,4.1],omegacap:[20.864,-26.92,4.1],zetacap:[21.444,-22.41,3.7],gamcap:[21.668,-16.66,3.68],denebalg:[21.784,-16.13,2.87],
sadalsuud:[21.526,-5.57,2.9],sadalmelik:[22.096,-0.32,2.95],skat:[22.911,-15.82,3.27],sadachbia:[22.361,-1.39,3.84],zetaaqr:[22.481,-0.02,3.65],lambdaaqr:[22.877,-7.58,3.73],
etapsc:[1.525,15.35,3.6],alrescha:[2.034,2.76,3.8],gampsc:[23.286,3.28,3.7],omegapsc:[23.989,6.86,4.0],omicronpsc:[1.756,9.16,4.3],
rasalhague:[17.582,12.56,2.08],cebalrai:[17.725,4.57,2.76],sabik:[17.173,-15.72,2.43],zetaoph:[16.619,-10.57,2.54],yedprior:[16.239,-3.69,2.73],kappaoph:[16.961,9.38,3.2],
acrux:[12.443,-63.10,0.77,'アクルックス'],mimosa:[12.795,-59.69,1.25],gacrux:[12.519,-57.11,1.64],deltacru:[12.252,-58.75,2.79],
rigilkent:[14.660,-60.83,-0.27,'ケンタウルス座α'],hadar:[14.064,-60.37,0.61],menkent:[14.111,-36.37,2.06],
canopus:[6.399,-52.70,-0.74,'カノープス'],achernar:[1.629,-57.24,0.46,'アケルナル'],fomalhaut:[22.961,-29.62,1.16,'フォーマルハウト'],
atria:[16.811,-69.03,1.91],betatra:[15.919,-63.43,2.85],gammatra:[15.315,-68.68,2.89]
};
const C=[
 ['オリオン座',[['betelgeuse','bellatrix'],['betelgeuse','alnitak'],['bellatrix','mintaka'],['mintaka','alnilam'],['alnilam','alnitak'],['alnitak','saiph'],['mintaka','rigel'],['betelgeuse','meissa'],['meissa','bellatrix']]],
 ['おおいぬ座',[['mirzam','sirius'],['sirius','wezen'],['wezen','adhara'],['wezen','aludra']]],
 ['こいぬ座',[['procyon','gomeisa']]],
 ['ふたご座',[['castor','pollux'],['castor','mebsuta'],['mebsuta','tejat'],['pollux','wasat'],['wasat','alhena']]],
 ['おうし座',[['aldebaran','zetatau'],['gammatau','aldebaran'],['gammatau','epstau'],['epstau','elnath']]],
 ['ぎょしゃ座',[['capella','menkalinan'],['menkalinan','thetaaur'],['thetaaur','elnath'],['elnath','iotaaur'],['iotaaur','capella']]],
 ['ペルセウス座',[['mirfak','algol']]],
 ['カシオペヤ座',[['caph','schedar'],['schedar','navi'],['navi','ruchbah'],['ruchbah','segin']]],
 ['おおぐま座',[['dubhe','merak'],['merak','phecda'],['phecda','megrez'],['megrez','dubhe'],['megrez','alioth'],['alioth','mizar'],['mizar','alkaid']]],
 ['こぐま座',[['polaris','yildun'],['yildun','epsumi'],['epsumi','zetaumi'],['zetaumi','kochab'],['kochab','pherkad'],['pherkad','etaumi'],['etaumi','zetaumi']]],
 ['しし座',[['regulus','etaleo'],['etaleo','algieba'],['algieba','adhafera'],['adhafera','rasalas'],['rasalas','epsleo'],['algieba','zosma'],['zosma','denebola'],['denebola','chertan'],['chertan','regulus'],['zosma','chertan']]],
 ['おとめ座',[['betavir','porrima'],['porrima','deltavir'],['deltavir','vindemiatrix'],['deltavir','zetavir'],['zetavir','spica'],['porrima','spica']]],
 ['うしかい座',[['arcturus','izar'],['izar','deltaboo'],['deltaboo','nekkar'],['nekkar','seginus'],['seginus','arcturus'],['arcturus','muphrid']]],
 ['さそり座',[['acrab','dschubba'],['dschubba','pisco'],['dschubba','sigsco'],['sigsco','antares'],['antares','tausco'],['tausco','epssco'],['epssco','musco'],['musco','zetasco'],['zetasco','etasco'],['etasco','thetasco'],['thetasco','iotasco'],['iotasco','kappasco'],['kappasco','shaula'],['shaula','lesath']]],
 ['いて座',[['alnasl','kausmed'],['kausmed','kausbor'],['kausbor','phisgr'],['phisgr','nunki'],['nunki','tausgr'],['tausgr','ascella'],['ascella','phisgr'],['ascella','kausaus'],['kausaus','kausmed'],['kausaus','alnasl'],['phisgr','kausmed']]],
 ['こと座',[['vega','zetalyr'],['zetalyr','sheliak'],['sheliak','sulafat'],['sulafat','deltalyr'],['deltalyr','zetalyr']]],
 ['はくちょう座',[['deneb','sadr'],['sadr','albireo'],['deltacyg','sadr'],['sadr','gienah']]],
 ['わし座',[['tarazed','altair'],['altair','alshain'],['altair','deltaaql'],['deltaaql','lambdaaql'],['tarazed','zetaaql']]],
 ['ペガスス座',[['markab','scheat'],['scheat','alpheratz'],['alpheratz','algenib'],['algenib','markab'],['markab','homam'],['homam','enif']]],
 ['アンドロメダ座',[['alpheratz','deltaand'],['deltaand','mirach'],['mirach','almach']]],
 ['おひつじ座',[['hamal','sheratan'],['sheratan','mesarthim']]],
 ['かに座',[['altarf','asaus'],['asaus','asbor'],['asbor','iotacnc'],['asaus','acubens']]],
 ['てんびん座',[['zubenelg','zubenesch'],['zubenesch','gamlib'],['zubenelg','siglib']]],
 ['やぎ座',[['algedi','dabih'],['dabih','psicap'],['psicap','omegacap'],['omegacap','zetacap'],['zetacap','denebalg'],['denebalg','gamcap'],['gamcap','algedi']]],
 ['みずがめ座',[['sadalsuud','sadalmelik'],['sadalmelik','sadachbia'],['sadachbia','zetaaqr'],['sadalmelik','lambdaaqr'],['lambdaaqr','skat']]],
 ['うお座',[['gampsc','omegapsc'],['omegapsc','alrescha'],['alrescha','omicronpsc'],['omicronpsc','etapsc']]],
 ['へびつかい座',[['rasalhague','kappaoph'],['kappaoph','yedprior'],['yedprior','zetaoph'],['zetaoph','sabik'],['sabik','cebalrai'],['cebalrai','rasalhague']]],
 ['みなみじゅうじ座',[['acrux','gacrux'],['mimosa','deltacru']]],
 ['ケンタウルス座',[['rigilkent','hadar'],['hadar','menkent']]],
 ['みなみのさんかく座',[['atria','betatra'],['betatra','gammatra'],['gammatra','atria']]]
];
const ASTER={
  spring:{name:'春',date:[4,15],hl:[['alkaid','arcturus'],['arcturus','spica'],['arcturus','denebola'],['denebola','spica'],['alioth','mizar'],['mizar','alkaid']],
    h:'春の大曲線と、春の大三角',p:'北斗七星の柄のカーブをそのまま伸ばすと、オレンジ色のアークトゥルス、さらに白いスピカに届きます。この弧が春の大曲線。アークトゥルス、スピカ、しし座のデネボラを結ぶと春の大三角になります。',tip:'アークトゥルスはうしかい座の1等星で、天の北半球でいちばん明るい恒星です。'},
  summer:{name:'夏',date:[8,1],hl:[['vega','altair'],['altair','deneb'],['deneb','vega']],
    h:'夏の大三角と天の川',p:'こと座のベガ（織姫）、わし座のアルタイル（彦星）、はくちょう座のデネブを結ぶのが夏の大三角。暗い場所なら、その間を天の川が流れて見えます。南の低い空には赤いアンタレスのさそり座。',tip:'ベガまで約25光年、アルタイルまで約17光年。デネブは千数百光年以上と、桁違いに遠い星です。'},
  autumn:{name:'秋',date:[10,15],hl:[['markab','scheat'],['scheat','alpheratz'],['alpheratz','algenib'],['algenib','markab'],['markab','fomalhaut']],
    h:'ペガススの四辺形と、秋の一つ星',p:'明るい星が少ない秋は、ペガスス座の四辺形が目印です。四辺形の西の辺（シェアト→マルカブ）を南へ伸ばすと、南の空にぽつんと光るフォーマルハウト（秋の一つ星）。',tip:'アンドロメダ座の大銀河（約250万光年）は、肉眼で見える最も遠い天体の一つとされています。'},
  winter:{name:'冬',date:[1,15],hl:[['betelgeuse','sirius'],['sirius','procyon'],['procyon','betelgeuse'],['procyon','pollux'],['pollux','capella'],['capella','aldebaran'],['aldebaran','rigel'],['rigel','sirius']],
    h:'冬の大三角と、冬のダイヤモンド',p:'オリオン座のベテルギウス、おおいぬ座のシリウス、こいぬ座のプロキオンで冬の大三角。さらにポルックス、カペラ、アルデバラン、リゲルを加えた6つの1等星を結ぶと冬のダイヤモンドになります。',tip:'ベテルギウスは2019〜2020年に急に暗くなる「大減光」で話題になりました。原因は、星が放出したちりだと考えられています。'}
};
const LOC=[
 ['日本','大阪',34.69,135.50,9],['日本','東京',35.68,139.69,9],
 ['G7','ワシントンD.C.',38.91,-77.04,-5],['G7','オタワ',45.42,-75.70,-5],['G7','ロンドン',51.51,-0.13,0],['G7','パリ',48.86,2.35,1],['G7','ベルリン',52.52,13.40,1],['G7','ローマ',41.90,12.50,1],
 ['南半球','シドニー',-33.87,151.21,10],['南半球','テカポ湖',-44.00,170.48,12]
].map(([g,n,la,lo,tz])=>[n,la,lo,tz,g]);
const locIndex=n=>LOC.findIndex(l=>l[0]===n);
const sky={loc:locIndex('大阪'),date:null,hour:21,lines:true,names:true,ecl:true,hl:null};
const locSel=$('skyLoc');
locSel.innerHTML=[...new Set(LOC.map(l=>l[4]))].map(g=>`<optgroup label="${g}">${LOC.map((l,i)=>l[4]===g?`<option value="${i}">${l[0]}</option>`:'').join('')}</optgroup>`).join('');
locSel.value=sky.loc;
const pad=n=>String(n).padStart(2,'0');
function setNow(){const L=LOC[sky.loc];const now=new Date(Date.now()+L[3]*3600e3);sky.date=`${now.getUTCFullYear()}-${pad(now.getUTCMonth()+1)}-${pad(now.getUTCDate())}`;sky.hour=now.getUTCHours()+now.getUTCMinutes()/60;$('skyDate').value=sky.date;$('skyHour').value=sky.hour;sky.hl=null;}
const jd=d=>d.getTime()/86400000+2440587.5;
function utcDate(){const L=LOC[sky.loc];const [y,m,dd]=sky.date.split('-').map(Number);return new Date(Date.UTC(y,m-1,dd)+(sky.hour-L[3])*3600e3);}
function eclToEq(lam,bet){const e=23.4393*D,l=lam*D,b=bet*D;const ra=Math.atan2(Math.sin(l)*Math.cos(e)-Math.tan(b)*Math.sin(e),Math.cos(l));const dec=Math.asin(Math.sin(b)*Math.cos(e)+Math.cos(b)*Math.sin(e)*Math.sin(l));return [((ra/D/15)%24+24)%24,dec/D];}
function sunPos(J){const n=J-2451545;const L=280.460+0.9856474*n,g=(357.528+0.9856003*n)*D;return eclToEq(L+1.915*Math.sin(g)+0.020*Math.sin(2*g),0);}
function moonPos(J){const d=J-2451545;const Lp=218.316+13.176396*d,M=(134.963+13.064993*d)*D,F=(93.272+13.229350*d)*D;return eclToEq(Lp+6.289*Math.sin(M),5.128*Math.sin(F));}
TK.sunPos=sunPos;
let lastAlt={};
const skySt=makeCanvas($('skyCv'),st=>{
  const {ctx,w,h}=st;ctx.clearRect(0,0,w,h);
  const L=LOC[sky.loc],lat=L[1]*D,date=utcDate(),J=jd(date);
  const gmst=(280.46061837+360.98564736629*(J-2451545))%360;const lst=gmst+L[2];
  const cx=w/2,cy=h/2,R=Math.min(w,h)/2-22;
  const proj=(ra,dec)=>{const H=(lst-ra*15)*D,de=dec*D;const sa=Math.sin(lat)*Math.sin(de)+Math.cos(lat)*Math.cos(de)*Math.cos(H);const alt=Math.asin(sa);
    const az=Math.atan2(-Math.sin(H)*Math.cos(de),Math.cos(lat)*Math.sin(de)-Math.sin(lat)*Math.cos(de)*Math.cos(H));const r=(Math.PI/2-alt)/(Math.PI/2)*R;return {x:cx-r*Math.sin(az),y:cy-r*Math.cos(az),alt};};
  const sun=sunPos(J),sp=proj(sun[0],sun[1]);const sunAlt=sp.alt/D;
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,TAU);ctx.fillStyle=T.bg2;ctx.fill();ctx.clip();
  if(sunAlt>-12){ctx.fillStyle=T.sky;ctx.globalAlpha=Math.min(0.35,(sunAlt+12)/40);ctx.fillRect(0,0,w,h);ctx.globalAlpha=1;}
  [30,60].forEach(a=>circle(ctx,cx,cy,R*(90-a)/90,T.grid,1,[2,4]));
  for(let k=0;k<12;k++){const a=k*30*D;line(ctx,cx,cy,cx+R*Math.sin(a),cy-R*Math.cos(a),T.grid,1,[1,5]);}
  if(sky.ecl){ctx.strokeStyle=T.brass;ctx.globalAlpha=.55;ctx.setLineDash([5,5]);ctx.lineWidth=1;ctx.beginPath();let pen=false;for(let l=0;l<=360;l+=2){const q=eclToEq(l,0),p=proj(q[0],q[1]);if(p.alt>-0.02){pen?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);pen=true;}else pen=false;}ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;}
  const P={};for(const k in S)P[k]=proj(S[k][0],S[k][1]);
  if(sky.lines){C.forEach(([n,segs])=>{segs.forEach(([a,b])=>{if(P[a].alt>0&&P[b].alt>0)line(ctx,P[a].x,P[a].y,P[b].x,P[b].y,T.sky,1);});});}
  if(sky.hl){ctx.globalAlpha=.9;sky.hl.forEach(([a,b])=>{if(P[a].alt>0&&P[b].alt>0)line(ctx,P[a].x,P[a].y,P[b].x,P[b].y,T.brass,2.2);});ctx.globalAlpha=1;}
  for(const k in S){const p=P[k];if(p.alt<=0)continue;const m=S[k][2];const r=Math.max(0.8,3.6-0.62*m);ctx.fillStyle=T.fg;ctx.globalAlpha=m<1?1:0.85;ctx.beginPath();ctx.arc(p.x,p.y,r,0,TAU);ctx.fill();ctx.globalAlpha=1;
    if(m<0.6){ctx.fillStyle=T.sun;ctx.globalAlpha=.18;ctx.beginPath();ctx.arc(p.x,p.y,r*2.6,0,TAU);ctx.fill();ctx.globalAlpha=1;}
    if(sky.names&&S[k][3]&&m<1.7)label(ctx,S[k][3],p.x+r+3,p.y-r-2,T.brass,10.5);}
  if(sky.names&&w>=440){C.forEach(([n,segs])=>{const ks=[...new Set(segs.flat())].filter(k=>P[k].alt>0.05);if(ks.length<2)return;const x=ks.reduce((s,k)=>s+P[k].x,0)/ks.length,y=ks.reduce((s,k)=>s+P[k].y,0)/ks.length;label(ctx,n,x,y+12,T.muted,10,'center');});}
  /* LMC/SMC */
  [[5.39,-69.75,'大マゼラン雲',14],[0.88,-72.83,'小マゼラン雲',9]].forEach(([ra,de,nm,s])=>{const p=proj(ra,de);if(p.alt>0){ctx.fillStyle=T.fg;ctx.globalAlpha=.16;ctx.beginPath();ctx.ellipse(p.x,p.y,s,s*0.6,0.5,0,TAU);ctx.fill();ctx.globalAlpha=1;if(sky.names)label(ctx,nm,p.x,p.y+s+6,T.muted,10,'center');}});
  /* 月 */
  const mn=moonPos(J),mp=proj(mn[0],mn[1]);
  if(mp.alt>0){const age=Moon.moonAge(date);TK.moonIcon(ctx,mp.x,mp.y,8,age);label(ctx,'月',mp.x+12,mp.y,T.sun,11,'left',700);}
  if(sp.alt>0){dot(ctx,sp.x,sp.y,9,T.sun);label(ctx,'太陽',sp.x+12,sp.y,T.sun,11,'left',700);}
  ctx.restore();
  circle(ctx,cx,cy,R,T.muted,1.2);
  [['北',0],['東',90],['南',180],['西',270]].forEach(([t,a])=>{const r=R+12;label(ctx,t,cx-r*Math.sin(a*D),cy-r*Math.cos(a*D),T.brass,12,'center',700);});
  const lt=`${sky.date.replace(/-/g,'.')} ${pad(Math.floor(sky.hour)%24)}:${pad(Math.round((sky.hour%1)*60)%60)}`;
  $('skyTitle').textContent=`${L[0]}の空 ${lt}`+(sunAlt>-6?'（空が明るい時間）':'');
});
function redraw(){skySt.redraw();}
locSel.onchange=()=>{sky.loc=+locSel.value;redraw();};
$('skyDate').onchange=e=>{if(e.target.value){sky.date=e.target.value;redraw();}};
$('skyHour').oninput=e=>{sky.hour=+e.target.value;redraw();};
$('skyNow').onclick=()=>{setNow();chipsSeason();redraw();};
$('skyLines').onchange=e=>{sky.lines=e.target.checked;redraw();};
$('skyNames').onchange=e=>{sky.names=e.target.checked;redraw();};
$('skyEcl').onchange=e=>{sky.ecl=e.target.checked;redraw();};
function season(k){const a=ASTER[k];$('seasonK').textContent=a.name+'の星空';$('seasonH').textContent=a.h;$('seasonP').textContent=a.p;$('seasonTip').textContent=a.tip;}
function chipsSeason(){chips($('skySeason'),[['spring','春の夜'],['summer','夏の夜'],['autumn','秋の夜'],['winter','冬の夜']],'',k=>{const a=ASTER[k];const y=new Date().getFullYear();sky.date=`${y}-${pad(a.date[0])}-${pad(a.date[1])}`;sky.hour=21;$('skyDate').value=sky.date;$('skyHour').value=21;sky.hl=a.hl;season(k);redraw();});}
chipsSeason();
setNow();
if(sky.hour>=5&&sky.hour<18){sky.hour=21;$('skyHour').value=21;}
const mo=new Date().getMonth()+1;season(mo>=3&&mo<=5?'spring':mo>=6&&mo<=8?'summer':mo>=9&&mo<=11?'autumn':'winter');
$('skySouth').onclick=()=>{sky.loc=locIndex('シドニー');locSel.value=sky.loc;setNow();redraw();document.getElementById('sky').scrollIntoView({behavior:TK.RM?'auto':'smooth'});};

/* ---------- 物語 ---------- */
const MIMG={orion:['orion'],tanabata:['lyra','aquila'],andromeda:['cassiopeia','andromeda'],bears:['ursamajor','ursaminor'],gemini:['gemini']};
const mimgs=k=>`<div class="myimg">${MIMG[k].map(c=>`<img src="img/c_${c}.webp" alt="" loading="lazy">`).join('')}</div>`;
const MYTH={
  orion:['オリオンとさそり','力自慢の狩人オリオンは、さそりに刺されて命を落としたと伝えられます。夜空でも、さそり座が東から昇るころオリオン座は西に沈み、2つが同時に高く見えることはありません。','冬の星座オリオンと、夏の星座さそりは、空のちょうど反対側にあります。'],
  tanabata:['七夕 · 織姫と彦星','天の川の両岸に引き離された織姫（ベガ）と彦星（アルタイル）は、年に一度、7月7日だけ会うことを許されます。','実際の2つの星は約15光年離れています。光の速さで連絡しても、返事が届くまで往復30年かかります。'],
  andromeda:['カシオペヤとアンドロメダ','エチオピアの王妃カシオペヤが、娘アンドロメダは海の妖精より美しいと自慢したため、怒った海の神は怪物を送りました。生けにえにされかけたアンドロメダを救ったのが、英雄ペルセウスです。','秋の空には、王ケフェウス、カシオペヤ、アンドロメダ、ペルセウス、天馬ペガスス、怪物くじらと、物語の登場人物がそろって並びます。'],
  bears:['おおぐま座とこぐま座','ゼウスに愛されたカリストは、女神ヘラの怒りで熊の姿に変えられました。のちに狩人に育った息子アルカスが、知らずに母を射ようとしたため、ゼウスは2人を空に上げたといいます。','アルカスはこぐま座、あるいはうしかい座とされます。北斗七星はおおぐま座の腰から尾にあたります。'],
  gemini:['ふたご座 · カストルとポルックス','双子の兄弟のうち、ポルックスは不死の体、カストルは人間でした。カストルが命を落とすと、ポルックスは自分の不死を兄弟と分け合いたいと願い、2人は空で並ぶことになりました。','明るいのはポルックスの方（1.1等）。カストルは望遠鏡で見ると、6つの星が集まった多重星です。']
};
chips($('mythChips'),Object.keys(MYTH).map(k=>[k,MYTH[k][0].split(' · ')[0]]),'tanabata',k=>{const m=MYTH[k];$('mythBody').innerHTML=mimgs(k)+`<b style="font-family:var(--f-display);font-size:17px">${m[0]}</b><p>${m[1]}</p><p class="sub" style="color:var(--muted);font-size:13px">${m[2]}</p>`;});
$('mythBody').innerHTML=mimgs('tanabata')+`<b style="font-family:var(--f-display);font-size:17px">${MYTH.tanabata[0]}</b><p>${MYTH.tanabata[1]}</p><p style="color:var(--muted);font-size:13px">${MYTH.tanabata[2]}</p>`;

/* ---------- 黄道12星座 ---------- */
const Z=[
 ['おひつじ座','4/18〜5/13','3/21〜4/19','ハマル','空を飛ぶ金色の毛の羊。兄妹を背に乗せて逃がした。'],
 ['おうし座','5/13〜6/21','4/20〜5/20','アルデバラン','白い牛に姿を変えたゼウス。王女エウロペを背に乗せて海を渡った。'],
 ['ふたご座','6/21〜7/20','5/21〜6/21','ポルックス','仲のよい双子の兄弟、カストルとポルックス。'],
 ['かに座','7/20〜8/10','6/22〜7/22','プレセペ星団','英雄ヘラクレスと戦い、踏みつぶされた化け蟹。'],
 ['しし座','8/10〜9/16','7/23〜8/22','レグルス','ヘラクレスが倒した、ネメアの森の不死身の獅子。'],
 ['おとめ座','9/16〜10/30','8/23〜9/22','スピカ','麦の穂を持つ女神。農業の女神デメテル、または正義の女神アストライアとされる。'],
 ['てんびん座','10/30〜11/23','9/23〜10/23','ズベン・エス・カマリ','正義の女神アストライアが善悪をはかった天秤。'],
 ['さそり座','11/23〜11/29','10/24〜11/22','アンタレス','オリオンを刺したさそり。太陽は1週間ほどで通り過ぎる。'],
 ['へびつかい座','11/29〜12/17','—','ラスアルハゲ','死者もよみがえらせたという名医アスクレピオス。星占いには含まれない13番目。'],
 ['いて座','12/17〜1/20','11/23〜12/21','ヌンキ','弓を引く半人半馬のケンタウルス。ひしゃく形の「南斗六星」がある。'],
 ['やぎ座','1/20〜2/16','12/22〜1/19','デネブ・アルゲディ','怪物から逃げようと川に飛び込み、下半身だけ魚になった牧神パーン。'],
 ['みずがめ座','2/16〜3/11','1/20〜2/18','サダルスウド','神々の宴で酒をついだ美少年ガニュメデスの水がめ。'],
 ['うお座','3/11〜4/18','2/19〜3/20','アルレシャ','怪物から逃げるため魚に変身した女神アフロディテとエロス。はぐれないようリボンで結んだ。']
];
const ZIMG=['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpius', 'ophiuchus', 'sagittarius', 'capricornus', 'aquarius', 'pisces'];
document.querySelector('#zodTable tbody').innerHTML=Z.map((z,zi)=>`<tr${z[0]==='へびつかい座'?' style="background:var(--brass-dim)"':''}><td class="zimg"><img src="img/c_${ZIMG[zi]}.webp" alt="" loading="lazy" width="64" height="64"></td><td><b>${z[0]}</b></td><td class="d hi">${z[1]}</td><td class="d">${z[2]}</td><td>${z[3]}</td><td class="story">${z[4]}</td></tr>`).join('');

/* ---------- 南半球 ---------- */
const SOUTH=[
 ['88星座で最小','みなみじゅうじ座','南十字星。日本でも沖縄などでは、春に南の水平線近くに見えます。宮沢賢治『銀河鉄道の夜』では「サウザンクロス」として旅の終わり近くに登場します。'],
 ['4.37光年','ケンタウルス座α星','太陽にいちばん近い恒星系。肉眼では一つの明るい星ですが、A・Bの2つの星と、少し離れたプロキシマの3つでできています。'],
 ['−0.74等','カノープス','全天で2番目に明るい恒星（りゅうこつ座）。日本では南の地平線すれすれにしか昇らず、見ると長生きできるという言い伝えから「南極老人星」と呼ばれました。'],
 ['約16万光年','大マゼラン雲・小マゼラン雲','天の川銀河のそばを回る小さな銀河（小マゼラン雲は約20万光年）。1987年に大マゼラン雲で超新星が現れ、日本のカミオカンデがそのニュートリノを捉えました。'],
 ['逆さま','南半球で見る星空','オリオン座は逆さまに、月の欠け方も左右が逆に見えます。北極星は見えないので、南十字を手がかりに南の方角を探します。'],
 ['14星座','ラカイユの星座','18世紀、フランスのラカイユは南アフリカで南天を観測し、ぼうえんきょう座、けんびきょう座、とけい座など、当時の科学の道具にちなむ星座を作りました。']
];
$('southCards').innerHTML=SOUTH.map(s=>`<div class="tr"><span class="big">${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('');
})();
