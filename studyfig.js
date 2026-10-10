/* 5F 学びの階段：各カードの図（入力に合わせて描き直す） */
(function(){
const {T,TAU,dot,circle,label,line}=TK;const D=Math.PI/180;
const arrow=(x,a,b,c,d2,col,lw=1.6)=>{line(x,a,b,c,d2,col,lw);const an=Math.atan2(d2-b,c-a);x.fillStyle=col;x.beginPath();x.moveTo(c,d2);x.lineTo(c-8*Math.cos(an-0.4),d2-8*Math.sin(an-0.4));x.lineTo(c-8*Math.cos(an+0.4),d2-8*Math.sin(an+0.4));x.closePath();x.fill();};
const arc=(x,cx,cy,r,a0,a1,col,lw=1.6,dash)=>{x.strokeStyle=col;x.lineWidth=lw;x.setLineDash(dash||[]);x.beginPath();x.arc(cx,cy,r,a0,a1,a1<a0);x.stroke();x.setLineDash([]);};
const ground=(x,w,y)=>{x.fillStyle=T.grid;x.fillRect(0,y,w,6);line(x,0,y,w,y,T.muted,1.2);};
const F={
 '日周運動':(x,w,h,v)=>{const cy=h*0.84,cx=w/2,R=Math.min(w*0.42,h*0.74);ground(x,w,cy);
  arc(x,cx,cy,R,Math.PI,0,T.rule,1.2,[3,4]);
  const e=Math.max(0,Math.min(180,90-(v.h||0)*15));
  arc(x,cx,cy,R,-90*D,-e*D,T.brass,3);
  const p=a=>[cx+R*Math.cos(-a*D),cy+R*Math.sin(-a*D)];
  const [sx,sy]=p(90),[ex,ey]=p(e);
  dot(x,sx,sy,4,T.muted);dot(x,ex,ey,6,T.sun);label(x,'★',ex,ey,T.bg,8,'center',700);
  label(x,'南中',sx,sy-12,T.muted,11,'center');label(x,`${(v.h*15).toFixed(0)}°`,cx+R*0.42*Math.cos(-(90+e)/2*D),cy+R*0.42*Math.sin(-(90+e)/2*D),T.brass,13,'center',700);
  line(x,cx,cy,sx,sy,T.rule,1,[2,3]);line(x,cx,cy,ex,ey,T.brass,1,[2,3]);
  label(x,'東',cx-R,cy+16,T.fg,12,'center',700);label(x,'南',cx,cy+16,T.fg,12,'center',700);label(x,'西',cx+R,cy+16,T.fg,12,'center',700);
  label(x,'南の空を見たところ',8,12,T.muted,10);},
 '年周運動':(x,w,h,v)=>{const cx=w*0.42,cy=h/2,R=Math.min(w*0.3,h*0.4);
  circle(x,cx,cy,R,T.rule,1.2);dot(x,cx,cy,9,T.sun);label(x,'太陽',cx,cy+18,T.muted,10,'center');
  const a1=-(v.m||0)*30*D,p0=[cx+R,cy],p1=[cx+R*Math.cos(a1),cy+R*Math.sin(a1)];
  arc(x,cx,cy,R,0,a1,T.brass,3);dot(x,p0[0],p0[1],5,T.muted);dot(x,p1[0],p1[1],6,T.sky);
  arrow(x,p1[0],p1[1],p1[0]+(p1[0]-cx)*0.55,p1[1]+(p1[1]-cy)*0.55,T.sky,1.2);
  label(x,'真夜中に南に見える方向',Math.min(w-4,p1[0]+(p1[0]-cx)*0.6),p1[1]+(p1[1]-cy)*0.6+12,T.sky,10,'center');
  label(x,`${((v.m||0)*30).toFixed(0)}°`,cx+R*0.55*Math.cos(a1/2),cy+R*0.55*Math.sin(a1/2),T.brass,13,'center',700);
  label(x,'上から見た地球の公転',8,12,T.muted,10);},
 '太陽の南中高度':(x,w,h,v)=>{const ox=w*0.2,oy=h*0.86,L=Math.min(w*0.7,h*0.78);ground(x,w,oy);
  const s=[['夏至',90-v.lat+23.4,T.planet],['春分・秋分',90-v.lat,T.sun],['冬至',90-v.lat-23.4,T.sky]];
  s.forEach(([n,a,c],i)=>{if(a<=0)return;const r=a*D;const ex=ox+L*Math.cos(r),ey=oy-L*Math.sin(r);line(x,ox,oy,ex,ey,c,1.6);dot(x,ex,ey,7,c);
   arc(x,ox,oy,26+i*14,0,-r,c,1.2);label(x,`${n} ${a.toFixed(1)}°`,ex+(ex>w-110?-10:10),ey,c,11.5,ex>w-110?'right':'left',700);});
  dot(x,ox,oy,4,T.fg);label(x,'あなた',ox,oy+16,T.muted,10,'center');label(x,'南 →',w-8,oy+16,T.fg,12,'right',700);},
 '月の満ち欠けと見える時刻':(x,w,h,v)=>{const cx=w*0.36,cy=h/2,R=Math.min(w*0.22,h*0.36);
  for(let i=0;i<4;i++)arrow(x,w*0.66,cy-30+i*20,w*0.6,cy-30+i*20,T.sun,1);label(x,'太陽の光',w*0.66,cy-46,T.sun,10,'center');
  circle(x,cx,cy,R,T.rule,1,[3,4]);dot(x,cx,cy,8,T.sky);label(x,'地球',cx,cy+18,T.muted,10,'center');
  const a=(v.a||0)/29.53*TAU;const mx=cx+R*Math.cos(-a),my=cy+R*Math.sin(-a);
  x.save();x.translate(mx,my);x.fillStyle=T.grid;x.beginPath();x.arc(0,0,7,0,TAU);x.fill();x.fillStyle=T.sun;x.beginPath();x.arc(0,0,7,-Math.PI/2,Math.PI/2);x.fill();x.restore();
  label(x,'上から見た図',8,12,T.muted,10);
  TK.moonIcon(x,w*0.86,cy,Math.min(w*0.1,h*0.3),v.a||0);label(x,'見える形',w*0.86,cy+Math.min(w*0.1,h*0.3)+14,T.muted,10,'center');},
 '金星の見え方':(x,w,h)=>{const cx=w/2,cy=h*0.42,R=Math.min(w*0.3,h*0.42),r=R*0.723,E=[cx,cy+R];
  circle(x,cx,cy,R,T.rule,1,[3,4]);circle(x,cx,cy,r,T.rule,1);dot(x,cx,cy,9,T.sun);dot(x,E[0],E[1],6,T.sky);label(x,'地球',E[0],E[1]+16,T.muted,10,'center');
  const pts=[[-1,'宵の明星','夕方・西の空'],[1,'明けの明星','明け方・東の空']];
  pts.forEach(([sg,n,s])=>{const X=cx+sg*r*Math.cos(46*D),Y=cy+r*Math.sin(46*D);
   line(x,E[0],E[1],X,Y,T.brass,1,[2,3]);dot(x,X,Y,5,T.fg);label(x,n,X+sg*10,Y-10,T.brass,11.5,sg<0?'right':'left',700);label(x,s,X+sg*10,Y+6,T.muted,10,sg<0?'right':'left');});
  label(x,'上から見た図（左が東）',8,12,T.muted,10);},
 '等級と明るさ':(x,w,h,v)=>{const r=Math.pow(100,((v.m2||0)-(v.m1||0))/5);const R0=Math.min(h*0.32,w*0.18);const r2=Math.max(1.2,R0/Math.sqrt(Math.max(r,1)));
  [[w*0.3,R0,`${v.m1}等`],[w*0.7,r2,`${v.m2}等`]].forEach(([X,rr,t])=>{x.fillStyle=T.sun;x.globalAlpha=.18;x.beginPath();x.arc(X,h*0.45,rr*1.8,0,TAU);x.fill();x.globalAlpha=1;dot(x,X,h*0.45,rr,T.sun);label(x,t,X,h*0.88,T.fg,13,'center',700);});
  label(x,'円の面積 ＝ 明るさ',8,12,T.muted,10);},
 '年周視差とパーセク':(x,w,h,v)=>{const cx=w/2,cy=h*0.8,R=Math.min(w*0.22,h*0.16),S=[cx,h*0.12];
  x.save();x.translate(cx,cy);x.scale(1,0.35);circle(x,0,0,R,T.rule,1.2);x.restore();dot(x,cx,cy,7,T.sun);
  const A=[cx-R,cy],B=[cx+R,cy];dot(x,A[0],A[1],5,T.sky);dot(x,B[0],B[1],5,T.sky);label(x,'1月',A[0]-6,A[1]+14,T.muted,10,'right');label(x,'7月',B[0]+6,B[1]+14,T.muted,10,'left');
  line(x,A[0],A[1],S[0],S[1],T.brass,1.2);line(x,B[0],B[1],S[0],S[1],T.brass,1.2);line(x,cx,cy,S[0],S[1],T.rule,1,[2,3]);
  dot(x,S[0],S[1],5,T.fg);label(x,'恒星',S[0]+10,S[1],T.fg,11,'left');arc(x,S[0],S[1],28,Math.atan2(cy-S[1],cx-S[0]),Math.atan2(B[1]-S[1],B[0]-S[0]),T.brass,1.4);
  label(x,`p ＝ ${v.p}″（図は大げさ）`,S[0]+16,S[1]+38,T.brass,11,'left',700);label(x,'1 au',cx+R/2,cy-8,T.muted,10,'center');line(x,cx,cy,B[0],B[1],T.muted,1);},
 '絶対等級と距離指数':(x,w,h,v)=>{const d=Math.pow(10,((v.m||0)-(v.M||0)+5)/5);const L=24,Rr=w-24,y=h*0.55;const lo=-1,hi=7;const X=p=>L+(Math.log10(p)-lo)/(hi-lo)*(Rr-L);
  line(x,L,y,Rr,y,T.muted,1.4);for(let k=lo;k<=hi;k++){line(x,X(10**k),y-5,X(10**k),y+5,T.muted,1);label(x,k===0?'1pc':k===1?'10pc':`10${['⁻¹','','','²','³','⁴','⁵','⁶','⁷'][k+1]}`,X(10**k),y+18,T.muted,9.5,'center');}
  dot(x,X(10),y,6,T.sky);label(x,'絶対等級の基準',X(10),y-16,T.sky,10,'center');
  const xd=Math.max(L,Math.min(Rr,X(d)));dot(x,xd,y,7,T.sun);label(x,`この星 ${d<1e4?d.toFixed(d<100?1:0):d.toExponential(1)} pc`,xd,y-34,T.sun,11.5,'center',700);arrow(x,xd,y-26,xd,y-10,T.sun,1.2);
  label(x,'距離（対数目盛）',8,12,T.muted,10);},
 '星の色と温度（ウィーンの法則）':(x,w,h,v)=>{const Tk=v.T||5772,L=26,Rr=w-10,top=18,bot=h-26;const lam0=100,lam1=2000;const X=l=>L+(l-lam0)/(lam1-lam0)*(Rr-L);
  const grd=x.createLinearGradient(X(380),0,X(750),0);['#7a00ff','#0040ff','#00c0ff','#00ff40','#ffff00','#ff8000','#ff0000'].forEach((c,i)=>grd.addColorStop(i/6,c));x.globalAlpha=.25;x.fillStyle=grd;x.fillRect(X(380),top,X(750)-X(380),bot-top);x.globalAlpha=1;
  const B=l=>{const m=l*1e-9;return 1/(m**5*(Math.exp(1.4388e-2/(m*Tk))-1));};const pk=2.898e6/Tk;const mx=B(Math.max(lam0,Math.min(lam1,pk)));
  x.beginPath();for(let l=lam0;l<=lam1;l+=5){const yy=bot-(B(l)/mx)*(bot-top);l===lam0?x.moveTo(X(l),yy):x.lineTo(X(l),yy);}x.strokeStyle=TK.bbColor(Tk);x.lineWidth=2.4;x.stroke();
  line(x,L,bot,Rr,bot,T.muted,1);[500,1000,1500,2000].forEach(l=>label(x,l+'nm',X(l),bot+12,T.muted,9.5,'center'));
  if(pk>=lam0&&pk<=lam1){line(x,X(pk),top,X(pk),bot,T.brass,1,[3,3]);label(x,`ピーク ${pk.toFixed(0)} nm`,X(pk)+6,top+8,T.brass,11,'left',700);}else label(x,`ピーク ${pk.toFixed(0)} nm（図の外）`,L+4,top+8,T.brass,11,'left',700);
  label(x,'目に見える光',X(565),bot-10,T.fg,9.5,'center');},
 'ハッブルの法則と宇宙年齢':(x,w,h,v)=>{const L=40,Rr=w-12,top=14,bot=h-24;const dm=Math.max(200,(v.d||0)*1.25),vm=(v.H||70)*dm;const X=d=>L+d/dm*(Rr-L),Y=s=>bot-s/vm*(bot-top);
  line(x,L,bot,Rr,bot,T.muted,1);line(x,L,bot,L,top,T.muted,1);line(x,X(0),Y(0),X(dm),Y(vm),T.sky,2);
  dot(x,X(v.d||0),Y((v.H||70)*(v.d||0)),6,T.sun);label(x,'距離 →',Rr,bot+12,T.muted,10,'right');label(x,'速さ',L-4,top+4,T.muted,10,'right');
  label(x,'傾き ＝ H₀',X(dm*0.55),Y(vm*0.55)-14,T.sky,11,'center',700);},
 '会合周期':(x,w,h,v)=>{const P=v.P||1.881;const a=Math.pow(P,2/3);const cx=w/2,cy=h/2,Rm=Math.min(w,h)*0.44;const s=Rm/Math.max(1,a);
  circle(x,cx,cy,s,T.sky,1.2);circle(x,cx,cy,a*s,T.planet,1.2);dot(x,cx,cy,8,T.sun);
  dot(x,cx+s,cy,5,T.sky);dot(x,cx+a*s,cy,5,T.planet);line(x,cx,cy,cx+Math.max(1,a)*s,cy,T.brass,1,[3,3]);
  label(x,'地球',cx+s,cy-12,T.sky,10,'center');label(x,`惑星（${a.toFixed(2)} au）`,cx+a*s,cy+14,T.planet,10,a<1?'center':'right');
  label(x,'一直線に並ぶ → 次に並ぶまでが会合周期',8,12,T.muted,10);},
 '円軌道の速さと周期':(x,w,h,v)=>{const RE=6371,r=RE+(v.h||0);const cx=w/2,cy=h/2,s=Math.min(w,h)*0.44/r;
  x.fillStyle=T.sky;x.globalAlpha=.2;x.beginPath();x.arc(cx,cy,RE*s,0,TAU);x.fill();x.globalAlpha=1;circle(x,cx,cy,RE*s,T.sky,1.4);circle(x,cx,cy,r*s,T.brass,1.4,[4,3]);
  const p=[cx,cy-r*s];dot(x,p[0],p[1],5,T.planet);arrow(x,p[0],p[1],p[0]+40,p[1],T.planet,1.6);arrow(x,p[0],p[1]+2,p[0],p[1]+30,T.fg,1.2);
  label(x,'v',p[0]+46,p[1],T.planet,12,'left',700);label(x,'引力',p[0]+6,p[1]+24,T.fg,10,'left');label(x,'地球',cx,cy,T.muted,11,'center');},
 '第一宇宙速度・第二宇宙速度':(x,w,h)=>{const cx=w*0.4,cy=h*0.6,R=Math.min(w,h)*0.28,top=[cx,cy-R];
  x.fillStyle=T.sky;x.globalAlpha=.2;x.beginPath();x.arc(cx,cy,R,0,TAU);x.fill();x.globalAlpha=1;circle(x,cx,cy,R,T.sky,1.4);
  x.strokeStyle=T.muted;x.lineWidth=1.6;x.beginPath();x.moveTo(top[0],top[1]);x.quadraticCurveTo(cx+R*0.6,cy-R*1.05,cx+R*0.85,cy-R*0.55);x.stroke();
  circle(x,cx,cy,R*1.06,T.sun,1.6);x.strokeStyle=T.planet;x.beginPath();x.moveTo(top[0],top[1]);x.quadraticCurveTo(cx+R*2.2,cy-R*1.2,w-6,cy+R*0.2);x.stroke();
  label(x,'遅い → 落ちる',cx+R*0.9,cy-R*0.4,T.muted,10,'left');label(x,'v₁ 円軌道',cx-R*1.1,cy-R*0.9,T.sun,11,'right',700);label(x,'v₂ 脱出',w-8,cy+R*0.4,T.planet,11,'right',700);},
 '静止衛星の高さ':(x,w,h,v)=>{const Ts=(v.T||23.934)*3600;const r=Math.cbrt(3.986004e14*Ts*Ts/(4*Math.PI*Math.PI))/1000;const cx=w*0.5,cy=h/2,s=Math.min(w,h)*0.45/r;
  x.fillStyle=T.sky;x.globalAlpha=.2;x.beginPath();x.arc(cx,cy,6371*s,0,TAU);x.fill();x.globalAlpha=1;circle(x,cx,cy,6371*s,T.sky,1.2);
  circle(x,cx,cy,(6371+400)*s,T.muted,1,[2,3]);circle(x,cx,cy,r*s,T.brass,1.6);dot(x,cx+r*s,cy,5,T.planet);
  label(x,`${Math.round(r-6371).toLocaleString()} km`,cx+r*s*0.55,cy-10,T.brass,11.5,'center',700);line(x,cx+6371*s,cy,cx+r*s,cy,T.brass,1,[2,3]);label(x,'ISS（400 km）はほぼ地表すれすれ',8,h-10,T.muted,10);},
 '天体の質量をはかる':(x,w,h,v)=>{const cx=w/2,cy=h/2,R=Math.min(w,h)*0.38;circle(x,cx,cy,R,T.brass,1.4,[4,3]);dot(x,cx,cy,12,T.sky);dot(x,cx+R*0.71,cy-R*0.71,5,T.fg);
  line(x,cx,cy,cx+R*0.71,cy-R*0.71,T.muted,1);label(x,'r',cx+R*0.38,cy-R*0.32,T.fg,12,'center',700);label(x,'M = ?',cx,cy+24,T.sky,11,'center',700);label(x,`周期 T = ${v.d} 日`,cx+R+6,cy+R*0.6,T.brass,11,'left');},
 '面積速度一定と近日点の速さ':(x,w,h,v)=>{const q=v.q||1,Q=v.Q||1;const a=(q+Q)/2,e=(Q-q)/(Q+q);const A=Math.min(w*0.4,(h*0.42)/Math.sqrt(1-e*e)),B=A*Math.sqrt(1-e*e);const cx=w/2,cy=h/2,Fx=cx+A*e;
  const pt=E=>[cx+A*Math.cos(E),cy-B*Math.sin(E)];const sec=(M0,M1,c)=>{const E0=TK.solveE(M0,e),E1=TK.solveE(M1,e);x.beginPath();x.moveTo(Fx,cy);for(let j=0;j<=20;j++){const p=pt(E0+(E1-E0)*j/20);x.lineTo(p[0],p[1]);}x.closePath();x.fillStyle=c;x.globalAlpha=.35;x.fill();x.globalAlpha=1;};
  sec(-0.35,0.35,T.sun);sec(Math.PI-0.35,Math.PI+0.35,T.sky);x.strokeStyle=T.fg;x.lineWidth=1.2;x.beginPath();x.ellipse(cx,cy,A,B,0,0,TAU);x.stroke();dot(x,Fx,cy,6,T.sun);
  label(x,'速い',cx+A+4,cy,T.sun,11,'left',700);label(x,'遅い',cx-A-4,cy,T.sky,11,'right',700);label(x,'同じ時間 → 同じ面積',8,12,T.muted,10);},
 'ケプラー第3法則を導く':(x,w,h)=>{const cx=w/2,cy=h/2,R=Math.min(w,h)*0.38;circle(x,cx,cy,R,T.rule,1.2,[4,3]);dot(x,cx,cy,10,T.sun);const p=[cx+R*Math.cos(-0.6),cy+R*Math.sin(-0.6)];dot(x,p[0],p[1],6,T.sky);
  arrow(x,p[0],p[1],p[0]+(cx-p[0])*0.35,p[1]+(cy-p[1])*0.35,T.planet,1.8);const tx=-Math.sin(-0.6),ty=Math.cos(-0.6);arrow(x,p[0],p[1],p[0]-tx*44,p[1]-ty*44,T.brass,1.8);
  label(x,'GMm/r²',p[0]+(cx-p[0])*0.35-6,p[1]+(cy-p[1])*0.35+12,T.planet,11,'right',700);label(x,'v',p[0]-tx*50,p[1]-ty*50,T.brass,12,'center',700);label(x,'r',cx+(p[0]-cx)/2+8,cy+(p[1]-cy)/2+10,T.fg,12,'center',700);line(x,cx,cy,p[0],p[1],T.muted,1);}
};
TK.STUDYFIG=F;
})();
