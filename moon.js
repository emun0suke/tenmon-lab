/* 月相の計算（Meeus『Astronomical Algorithms』第49章の主要項）。誤差はおおむね数分。 */
(function(g){
const R=Math.PI/180;
function phaseJDE(k){ // k: 整数=新月, .25=上弦, .5=満月, .75=下弦
  const T=k/1236.85,T2=T*T,T3=T2*T,T4=T3*T;
  let jde=2451550.09766+29.530588861*k+0.00015437*T2-0.000000150*T3+0.00000000073*T4;
  const E=1-0.002516*T-0.0000074*T2;
  const M=(2.5534+29.10535670*k-0.0000014*T2-0.00000011*T3)*R;
  const Mp=(201.5643+385.81693528*k+0.0107582*T2+0.00001238*T3-0.000000058*T4)*R;
  const F=(160.7108+390.67050284*k-0.0016118*T2-0.00000227*T3+0.000000011*T4)*R;
  const O=(124.7746-1.56375588*k+0.0020672*T2+0.00000215*T3)*R;
  const s=Math.sin,c=Math.cos,f=((k%1)+1)%1;
  let d;
  if(f<0.01||f>0.99){
    d=-0.40720*s(Mp)+0.17241*E*s(M)+0.01608*s(2*Mp)+0.01039*s(2*F)+0.00739*E*s(Mp-M)-0.00514*E*s(Mp+M)+0.00208*E*E*s(2*M)-0.00111*s(Mp-2*F)-0.00057*s(Mp+2*F)+0.00056*E*s(2*Mp+M)-0.00042*s(3*Mp)+0.00042*E*s(M+2*F)+0.00038*E*s(M-2*F)-0.00024*E*s(2*Mp-M)-0.00017*s(O);
  }else if(Math.abs(f-0.5)<0.01){
    d=-0.40614*s(Mp)+0.17302*E*s(M)+0.01614*s(2*Mp)+0.01043*s(2*F)+0.00734*E*s(Mp-M)-0.00515*E*s(Mp+M)+0.00209*E*E*s(2*M)-0.00111*s(Mp-2*F)-0.00057*s(Mp+2*F)+0.00056*E*s(2*Mp+M)-0.00042*s(3*Mp)+0.00042*E*s(M+2*F)+0.00038*E*s(M-2*F)-0.00024*E*s(2*Mp-M)-0.00017*s(O);
  }else{
    d=-0.62801*s(Mp)+0.17172*E*s(M)-0.01183*E*s(Mp+M)+0.00862*s(2*Mp)+0.00804*s(2*F)+0.00454*E*s(Mp-M)+0.00204*E*E*s(2*M)-0.00180*s(Mp-2*F)-0.00070*s(Mp+2*F)-0.00040*s(3*Mp)-0.00034*E*s(2*Mp-M)+0.00032*E*s(M+2*F)+0.00032*E*s(M-2*F)-0.00028*E*E*s(Mp+2*M)+0.00027*E*s(2*Mp+M)-0.00017*s(O);
    const W=0.00306-0.00038*E*c(M)+0.00026*c(Mp)-0.00002*c(Mp-M)+0.00002*c(Mp+M)+0.00002*c(2*F);
    d+=(f<0.5)?W:-W;
  }
  return jde+d;
}
const DT_DAYS=69.5/86400; // ΔT（TT−UT）の2020年代の概算
const jdToDate=jd=>new Date((jd-DT_DAYS-2440587.5)*86400000);
const dateToJd=d=>d.getTime()/86400000+2440587.5;
/* 指定日時以降の月相を n 件返す */
function nextPhases(from,n){
  const y=from.getUTCFullYear()+(from.getUTCMonth()+from.getUTCDate()/31)/12;
  let k=Math.floor((y-2000)*12.3685)-2;const out=[];
  while(out.length<n){
    for(const q of [0,0.25,0.5,0.75]){
      const d=jdToDate(phaseJDE(k+q));
      if(d>=from&&out.length<n)out.push({type:q,date:d});
    }
    k++;
  }
  return out;
}
/* その時刻の月齢（直前の新月からの日数） */
function moonAge(d){
  const y=d.getUTCFullYear()+d.getUTCMonth()/12;
  let k=Math.floor((y-2000)*12.3685)+2;
  while(jdToDate(phaseJDE(k))>d)k--;
  return (d-jdToDate(phaseJDE(k)))/86400000;
}
g.Moon={phaseJDE,nextPhases,moonAge,jdToDate,dateToJd};
})(typeof window!=='undefined'?window:globalThis);
