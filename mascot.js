/* 天文研究所の研究員（オリジナルキャラクター）。pose: wave / present / think / smile */
(function(){
const O='#4a2a26',SK='#fdeee6',HR='#a08d82',HR2='#7a665c',NV='#2f3a66',GD='#e2b85a',RD='#9b3343',CT='#fbfaf7',SH='#fff8f0';
let uid=0;
const sw=w=>`stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;const st=sw(2.2);
function eye(cx,cy,ix,iy){const id='me'+(++uid);return `<clipPath id="${id}"><ellipse cx="${cx}" cy="${cy}" rx="15" ry="17"/></clipPath>
<ellipse cx="${cx}" cy="${cy}" rx="15" ry="17" fill="#ffffff"/>
<g clip-path="url(#${id})"><ellipse cx="${cx+ix}" cy="${cy+3+iy}" rx="12.5" ry="15" fill="#6b3a2e"/><ellipse cx="${cx+ix}" cy="${cy+8+iy}" rx="8.5" ry="7" fill="#b4695a" opacity=".85"/><ellipse cx="${cx+ix}" cy="${cy+2+iy}" rx="5.5" ry="6.5" fill="#3b1c18"/>
<circle cx="${cx+ix-4.5}" cy="${cy-3+iy}" r="4.3" fill="#ffffff"/><circle cx="${cx+ix+4.5}" cy="${cy+8+iy}" r="1.9" fill="#ffffff"/></g>
<path d="M${cx-15.5} ${cy-2} Q${cx-12} ${cy-18} ${cx} ${cy-18} Q${cx+12} ${cy-18} ${cx+15.5} ${cy-2}" fill="none" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
<path d="M${cx+(cx<120?-15:15)} ${cy-4} l${cx<120?-4:4} -2.5" stroke="${O}" stroke-width="2.2" stroke-linecap="round"/>`;}
const wink=(cx,cy)=>`<path d="M${cx-12} ${cy+2} Q${cx} ${cy-10} ${cx+12} ${cy+2}" fill="none" stroke="${O}" stroke-width="3.2" stroke-linecap="round"/>`;
const MOUTH={
  open:`<path d="M112 146 Q120 161 128 146 Z" fill="#e9787a" ${st}/><path d="M115.5 152 Q120 157 124.5 152 Q120 149 115.5 152Z" fill="#f6a8a8"/>`,
  smile:`<path d="M113 148 Q120 154 127 148" fill="none" ${st}/>`,
  pout:`<path d="M115 152 Q120 147.5 125 152" fill="none" ${st}/>`
};
const blush=`<ellipse cx="88" cy="141" rx="11" ry="6.5" fill="#f6b0a6" opacity=".8"/><ellipse cx="152" cy="141" rx="11" ry="6.5" fill="#f6b0a6" opacity=".8"/>
<path d="M82 138l2.5 6M87 137l2.5 6M92 137l2.5 6M146 137l2.5 6M151 137l2.5 6M156 138l2.5 6" stroke="#e8867f" stroke-width="1.3" stroke-linecap="round"/><circle cx="121" cy="135" r="1.6" fill="#f0a39a"/>`;
const backHair=`<path d="M58 120 C50 96 54 64 76 48 C92 36 110 32 124 34 C150 36 172 52 180 78 C186 98 184 120 176 136 C180 146 176 156 168 162 C170 150 166 142 160 138 L80 138 C74 142 70 150 72 162 C64 156 58 146 62 136 C56 132 56 126 58 120Z" fill="${HR}" ${st}/>`;
const ears=`<ellipse cx="68" cy="122" rx="8" ry="10" fill="${SK}" ${st}/><ellipse cx="172" cy="122" rx="8" ry="10" fill="${SK}" ${st}/><path d="M67 118 q3 4 0 8M173 118 q-3 4 0 8" stroke="#e8a296" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
const face=`<path d="M70 108 C70 72 92 54 120 54 C148 54 170 72 170 108 C170 140 150 162 120 162 C90 162 70 140 70 108Z" fill="${SK}" ${st}/>`;
const bangs=`<path d="M70 106 C68 80 82 60 104 56 C124 50 150 56 164 74 C172 86 172 98 170 108 Q167 100 161 111 Q156 94 144 106 Q139 89 127 103 Q120 86 108 101 Q101 86 92 105 Q87 95 79 112 Z" fill="${HR}" ${st}/>
<path d="M70 98 C64 114 64 132 72 150 C76 138 78 124 82 110Z" fill="${HR}" ${st}/><path d="M170 98 C176 114 176 132 168 150 C164 138 162 124 158 110Z" fill="${HR}" ${st}/>
<path d="M104 62 C100 72 99 80 99 84M131 58 C133 70 133 78 134 86M150 66 C154 76 155 84 149 90M88 70 C84 80 84 92 89 104" stroke="${HR2}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<ellipse cx="91" cy="80" rx="5" ry="3.4" transform="rotate(-25 91 80)" fill="#f4a0a0"/><ellipse cx="103" cy="73" rx="4" ry="2.8" transform="rotate(-25 103 73)" fill="#f4a0a0"/>`;
const cap=`<g transform="rotate(-10 120 46)"><path d="M150 30 l2.4 6 6.4.3 -5 4 1.8 6.2 -5.6-3.6 -5.6 3.6 1.8-6.2 -5-4 6.4-.3z" fill="${GD}" ${sw(1.4)}/>
<ellipse cx="122" cy="36" rx="40" ry="14" fill="${NV}" ${st}/><path d="M82 42 Q122 57 162 42 L162 51 Q122 66 82 51Z" fill="${RD}" ${st}/>
<path d="M84 44.5 Q122 59 160 44.5M84 49 Q122 64 160 49" stroke="${GD}" stroke-width="1.6" fill="none"/>
<path d="M120 25 l2 5 5.3.3 -4.1 3.3 1.4 5.2 -4.6-3 -4.6 3 1.4-5.2 -4.1-3.3 5.3-.3z" fill="${GD}" stroke="${O}" stroke-width="1.2" stroke-linejoin="round"/>
<circle cx="159" cy="47" r="4" fill="${GD}" ${sw(1.6)}/></g>`;
const body=`<path d="M58 300 C60 236 80 200 120 196 C160 200 180 236 182 300 Z" fill="${CT}" ${st}/>
<path d="M98 200 L120 256 L142 200 C136 197 128 196 120 196 C112 196 104 197 98 200Z" fill="${NV}" ${st}/>
<path d="M101 203 L120 251 L139 203" stroke="${GD}" stroke-width="2" fill="none"/><circle cx="120" cy="244" r="3.6" fill="${GD}" ${sw(1.4)}/>
<path d="M108 196 L120 224 L132 196 Z" fill="${SH}" ${st}/>
<path d="M105 193 L118 207 L109 212 Z" fill="${SH}" ${st}/><path d="M135 193 L122 207 L131 212 Z" fill="${SH}" ${st}/>
<path d="M118 211 L111 234 L117 230 L120 213Z" fill="${RD}" ${st}/><path d="M122 211 L129 234 L123 230 L120 213Z" fill="${RD}" ${st}/>
<path d="M120 209 C110 200 101 204 103 212 C105 219 114 215 120 209Z" fill="${RD}" ${st}/><path d="M120 209 C130 200 139 204 137 212 C135 219 126 215 120 209Z" fill="${RD}" ${st}/>
<circle cx="120" cy="209" r="4.2" fill="${GD}" ${sw(1.4)}/>
<path d="M95 200 L112 270 L114 300M145 200 L128 270 L126 300" fill="none" ${st}/>
<rect x="143" y="226" width="22" height="14" rx="3" fill="#ffffff" ${sw(1.6)}/><path d="M154 229.5 l1.3 3 3.2.2 -2.5 2 .9 3.1 -2.9-1.8 -2.9 1.8 .9-3.1 -2.5-2 3.2-.2z" fill="${GD}"/>
<path d="M78 266 h22 v18 h-22z" fill="none" ${sw(1.8)}/><path d="M84 266 v-12" stroke="#88b6e4" stroke-width="3.4" stroke-linecap="round"/>`;
const neck=`<rect x="110" y="148" width="20" height="52" rx="8" fill="${SK}" ${st}/>`;
const finger=(x,y,r)=>`<ellipse cx="${x}" cy="${y}" rx="3.8" ry="8.5" transform="rotate(${r} ${x} ${y})" fill="${SK}" ${sw(1.8)}/>`;
const cuff=(d,g)=>`<path d="${d}" fill="${NV}" ${st}/><path d="${g}" stroke="${GD}" stroke-width="1.8" fill="none"/>`;
const ARMS={
  wave:{under:`<path d="M156 212 C168 236 174 262 174 300 L154 300 C154 270 150 244 142 222Z" fill="${CT}" ${st}/>`,
    over:`<path d="M86 212 C72 200 62 182 58 166 L78 158 C82 176 90 190 102 202 Z" fill="${CT}" ${st}/>${cuff('M55 168 L79 159 L76 149 L52 158 Z','M54 163 L77 154')}
${finger(52,124,-22)}${finger(58,120,-8)}${finger(65,119,6)}${finger(72,122,20)}${finger(76,142,60)}<circle cx="63" cy="140" r="12.5" fill="${SK}" ${st}/>
<path d="M36 112l-8-6M33 126h-10M38 99l-5-8" stroke="#f08c84" stroke-width="3" stroke-linecap="round"/>`},
  present:{under:`<path d="M154 212 C162 228 158 242 146 248 L136 236 C142 231 146 224 144 214Z" fill="${CT}" ${st}/><circle cx="137" cy="242" r="9.5" fill="${SK}" ${st}/>`,
    over:`<path d="M88 214 C72 222 56 230 44 236 L50 252 C64 248 80 240 98 232Z" fill="${CT}" ${st}/>${cuff('M42 234 L50 252 L41 256 L33 238Z','M38 236 L45 254')}
<ellipse cx="41" cy="243" rx="3.6" ry="7.5" transform="rotate(50 41 243)" fill="${SK}" ${sw(1.8)}/><ellipse cx="27" cy="249" rx="15" ry="7" transform="rotate(-8 27 249)" fill="${SK}" ${st}/>
<circle cx="26" cy="222" r="10" fill="#f3c55e" ${st}/><ellipse cx="26" cy="222" rx="18" ry="5" transform="rotate(-18 26 222)" fill="none" ${st}/><path d="M18 218 q4 -4 10 -3" stroke="#fff3c4" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M8 202l2 4 4 1-4 1.5-2 4-2-4-4-1.5 4-1z M46 206l1.5 3 3 .8-3 1-1.5 3-1.5-3-3-1 3-.8z" fill="#f3c55e"/>`},
  think:{under:`<path d="M154 212 C156 238 140 252 106 256 L104 242 C128 240 140 230 142 214Z" fill="${CT}" ${st}/>${cuff('M106 256 L104 242 L95 243 L97 257Z','M100 243 L101 256')}<circle cx="90" cy="250" r="9.5" fill="${SK}" ${st}/>`,
    over:`<path d="M92 226 C82 220 74 214 71 206 L89 201 C92 209 98 215 106 219Z" fill="${CT}" ${st}/>${cuff('M70 207 L89 202 L87 193 L68 198Z','M69 202 L88 197')}
${finger(80,176,12)}<circle cx="76" cy="189" r="10.5" fill="${SK}" ${st}/><path d="M71 187 q5 2 9 0" stroke="#e8a296" stroke-width="1.4" fill="none"/>`},
  smile:{under:'',over:`<path d="M84 214 C84 242 94 262 110 272 L118 262 C104 252 98 236 98 214Z" fill="${CT}" ${st}/><path d="M156 214 C156 242 146 262 130 272 L122 262 C136 252 142 236 142 214Z" fill="${CT}" ${st}/>
<circle cx="112" cy="270" r="10.5" fill="${SK}" ${st}/><circle cx="128" cy="270" r="10.5" fill="${SK}" ${st}/><path d="M118 264 q2 6 0 12M122 264 q-2 6 0 12" stroke="${O}" stroke-width="1.4" fill="none"/>`}
};
TK.mascot=(pose='wave')=>{
  const a=ARMS[pose]||ARMS.wave;
  let eyes;
  if(pose==='present')eyes=eye(98,118,0,0)+wink(142,118);
  else if(pose==='think')eyes=eye(98,118,-3,-3)+eye(142,118,-3,-3);
  else eyes=eye(98,118,0,0)+eye(142,118,0,0);
  const mouth=pose==='think'?MOUTH.pout:pose==='smile'?MOUTH.smile:MOUTH.open;
  return `<svg viewBox="0 0 240 300" role="img" aria-label="天文研究所の研究員">${body}${a.under}<g transform="translate(120 140) scale(1.16) translate(-120 -110)">${backHair}${ears}${face}${eyes}${blush}${mouth}${bangs}${cap}</g>${a.over}</svg>`;
};
document.querySelectorAll('.mascot-svg').forEach(el=>el.innerHTML=TK.mascot(el.dataset.pose));
})();

/* イラスト版の研究員M（表情5種） */
TK.MIMG={telescope:'img/p_telescope.webp',starmap:'img/p_starmap.webp',meteor:'img/p_meteor.webp',moon:'img/p_moon.webp',note:'img/p_note.webp',book:'img/p_book.webp',bye:'img/p_bye.webp',sleepy:'img/p_sleepy.webp',howa:'img/m_howa.webp',niko:'img/m_niko.webp',kyoton:'img/m_kyoton.webp',think:'img/m_think.webp',awa:'img/m_awa.webp'};
const POSE2IMG={wave:'niko',present:'howa',think:'think',smile:'howa',kyoton:'kyoton',awa:'awa'};
TK.mimg=(face)=>`<img src="${TK.MIMG[face]||TK.MIMG.howa}" alt="研究員M" decoding="async" loading="lazy">`;
document.querySelectorAll('.mascot-svg').forEach(el=>el.innerHTML=TK.mimg(POSE2IMG[el.dataset.pose]||el.dataset.pose));
