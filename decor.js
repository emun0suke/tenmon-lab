/* 各階の扉絵（イラストはイメージ） */
(function(){
const D={history:'history',views:'views',sky:'sky',moon:'moon',study:'study',cosmos:'cosmos',near:'near',shelf:'shelf',trivia:'trivia'};
Object.keys(D).forEach(id=>{const f=document.querySelector('#'+id+' .floor-head');if(f){f.classList.add('door');f.style.setProperty('--door',`url("img/d_${D[id]}.webp")`);}});
const s=document.getElementById('support');if(s)s.style.setProperty('--door','url("img/d_support.webp")');
})();
