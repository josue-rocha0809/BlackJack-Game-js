const miModulo=(()=>{"use strict";let e=[],t=[];const r=["C","D","H","S"],n=["A","J","Q","K"],o=document.querySelector("#btnPedirCarta"),l=document.querySelector("#btnStop"),a=document.querySelector("#btnNewGame"),s=document.querySelectorAll("small"),d=document.querySelectorAll("#divCartas"),c=(r=2)=>{e=i(),t=[];for(let e=0;e<r;e++)t.push(0);return s.forEach(e=>e.innerText=0),d.forEach(e=>e.innerText=""),o.disabled=!1,l.disabled=!1,t},i=()=>{e=[];for(let t=2;t<=10;t++)for(let n of r)e.push(t+n);for(let t of r)for(let r of n)e.push(r+t);return _.shuffle(e)},u=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},h=(e,r)=>(t[r]=t[r]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),s[r].innerText=t[r],t[r]),b=(e,t)=>{const r=document.createElement("img");r.src=`assets/cartas/${e}.png`,r.classList.add("carta"),d[t].append(r)},f=e=>{let r=0;do{const n=u();if(r=h(n,t.length-1),b(n,t.length-1),e>21)break}while(r<e&&e<=21);(()=>{const[e,r]=t;setTimeout(()=>{e==r?(alert("draw"),l.disabled=!0):e>21?alert("you have lost"):r>21?alert("you have won"):alert("computer wins")},100)})()};return o.addEventListener("click",()=>{const e=u(),t=h(e,0);b(e,0),t>21?(console.warn("you have lost"),o.disabled=!0,l.disabled=!0,f(t)):21===t&&(console.warn("21 you have won"),o.disabled=!0,l.disabled=!0,f(t))}),l.addEventListener("click",()=>{o.disabled=!0,l.disabled=!0,f(t[0])}),a.addEventListener("click",()=>{c()}),{newGame:c}})();