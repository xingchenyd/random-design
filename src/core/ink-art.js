// Original line drawing: layered mountain ridges, contour hatching and river ripples.
// Deterministic geometry keeps saved designs reproducible without raster assets.
export function inkLandscape(p){
 const ridges=[{y:225,a:87,f:1.1,color:'#7b8b72',opacity:.28},{y:278,a:76,f:1.8,color:'#536e5b',opacity:.45},{y:325,a:48,f:2.7,color:'#284b3e',opacity:.8}];
 const ridge=(x,r)=>r.y-r.a*(.45+.32*Math.sin(x*.012*r.f)+.18*Math.sin(x*.029+1));
 let art=`<defs><clipPath id="ink-v5-window"><circle cx="320" cy="250" r="199"/></clipPath></defs><g clip-path="url(#ink-v5-window)"><circle cx="320" cy="250" r="200" fill="#e6dfc7"/><circle cx="413" cy="126" r="24" fill="${p.accent}" opacity=".85"/>`;
 for(const [i,r] of ridges.entries()){const points=Array.from({length:91},(_,j)=>{const x=90+j*5;return [x,ridge(x,r)];});art+=`<path d="M${points.map(v=>v.join(' ')).join('L')}L540 430H90Z" fill="${r.color}" opacity="${r.opacity}"/>`;for(let x=110;x<530;x+=5){const y=ridge(x,r);art+=`<path d="M${x} ${y+2}q${9-i*3} 20 ${8-i*2} ${20+18*(1+Math.sin(x*.08))}" fill="none" stroke="${r.color}" stroke-width=".65" opacity="${.18+i*.1}"/>`;}}
 art+=`<path d="M109 367Q236 318 340 350T533 363L540 450H90Z" fill="#e9e4d0"/>`;
 for(let i=0;i<18;i++){const y=365+i*4;art+=`<path d="M${133+i*3} ${y}q${55+i*2} -12 ${139+i*3} -2t${105-i*2} 0" stroke="#597461" stroke-width="${i%4===0?1.3:.6}" opacity=".5" fill="none"/>`;}
 art+=`<path d="M396 348q12 -5 29 0l-5 5h-20Z" fill="#263c31"/><path d="M410 346v-17m0 2l12 13h-12" stroke="#263c31" stroke-width="1" fill="none"/></g><circle cx="320" cy="250" r="200" fill="none" stroke="#667057" stroke-width="1.3"/><path d="M112 244a208 208 0 0 1 408 -55" fill="none" stroke="#8d8c6b" stroke-width=".6"/>`;
 return art;
}
