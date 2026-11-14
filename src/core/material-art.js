// Original vector material studies. All light comes from the upper left;
// contact shadows, rims and highlights describe the same physical object.
export function materialCup({ top = false, clay = false, chrome = false, dark = false, colour = '#f9f4e9' } = {}) {
  const body = chrome ? '#b6a5ea' : clay ? '#ee9e89' : colour;
  const defs = `<defs>
    <radialGradient id="porcelain" cx=".29" cy=".18" r=".85"><stop stop-color="#ffffff"/><stop offset=".48" stop-color="${body}"/><stop offset=".82" stop-color="${clay ? '#d87a68' : '#c4ccd0'}"/><stop offset="1" stop-color="${clay ? '#b86154' : '#939fa8'}"/></radialGradient>
    <radialGradient id="well" cx=".64" cy=".75"><stop stop-color="#fff"/><stop offset=".66" stop-color="${body}"/><stop offset=".87" stop-color="#a5b0b8"/><stop offset="1" stop-color="#ecf1f3"/></radialGradient>
    <radialGradient id="coffee" cx=".38" cy=".36"><stop stop-color="${dark ? '#38291e' : '#b47d45'}"/><stop offset=".74" stop-color="${dark ? '#1c1713' : '#87552d'}"/><stop offset=".94" stop-color="#603a1c"/><stop offset="1" stop-color="#d1a570"/></radialGradient>
    <linearGradient id="glaze" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".2" stop-color="${body}"/><stop offset=".57" stop-color="${chrome ? '#dbedff' : body}"/><stop offset=".74" stop-color="${chrome ? '#8a74bc' : clay ? '#d7826e' : '#c5c9c7'}"/><stop offset="1" stop-color="${chrome ? '#f0bfe9' : clay ? '#be6857' : '#a6b0b6'}"/></linearGradient>
    <radialGradient id="contact"><stop stop-color="#18242d" stop-opacity=".32"/><stop offset="1" stop-color="#18242d" stop-opacity="0"/></radialGradient>
    <linearGradient id="steam" x2="0" y2="1"><stop stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".8"/></linearGradient>
  </defs>`;
  const heart = `<path d="M283 236C254 210 274 183 298 200C321 171 350 197 336 222C327 239 310 253 305 266Z" fill="#f9ebd2"/><path d="M305 266Q287 236 287 217" stroke="#d5af7d" stroke-width="2" fill="none"/>`;
  const shadow = (cx,cy,rx,ry) => Array.from({length:12},(_,i)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx*(1-i*.025)}" ry="${ry*(1-i*.025)}" fill="#24343f" opacity=".012"/>`).join('');
  const view = top ? `${shadow(333,271,180,169)}
    <circle cx="312" cy="243" r="159" fill="url(#porcelain)"/>
    <circle cx="312" cy="243" r="145" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="2"/>
    <circle cx="312" cy="243" r="119" fill="url(#well)"/>
    ${shadow(324,253,106,102)}
    <path d="M399 224C464 204 458 283 397 264" stroke="url(#glaze)" stroke-width="24" fill="none"/>
    <circle cx="307" cy="235" r="98" fill="url(#glaze)"/>
    <circle cx="307" cy="232" r="86" fill="#fffaf1"/>
    <circle cx="307" cy="233" r="77" fill="url(#coffee)"/>
    <path d="M241 206A72 72 0 0 1 330 166" fill="none" stroke="#fce9c8" stroke-width="3" opacity=".6"/>
    ${dark ? '' : heart}
    <path d="M205 194A110 110 0 0 1 304 128" fill="none" stroke="#fff" stroke-width="3" opacity=".75"/>`
    : `${shadow(332,395,177,29)}
    <ellipse cx="311" cy="378" rx="158" ry="32" fill="url(#glaze)"/><ellipse cx="311" cy="372" rx="147" ry="25" fill="${clay?'#fbd7c2':'#e9edf1'}"/>
    <path d="M422 221C509 202 497 322 420 303" fill="none" stroke="${clay ? '#c77463' : '#98a6af'}" stroke-width="31"/>
    <path d="M422 216C501 201 493 310 420 296" fill="none" stroke="url(#glaze)" stroke-width="24"/>
    <path d="M191 205Q193 284 215 325Q235 366 310 369Q390 368 409 326Q429 279 431 205Z" fill="url(#glaze)"/>
    <ellipse cx="311" cy="205" rx="120" ry="40" fill="${clay ? '#ffd6b9' : '#fcf8ee'}"/>
    <ellipse cx="311" cy="208" rx="103" ry="30" fill="#765033"/><ellipse cx="311" cy="207" rx="94" ry="23" fill="#65422b"/>
    <g transform="translate(80 121) scale(.75 .4)">${dark ? '' : heart}</g>
    <path d="M204 237Q208 292 228 319" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="10" stroke-linecap="round"/>
    ${clay ? '<g fill="#56332c"><ellipse cx="276" cy="290" rx="4" ry="6"/><ellipse cx="345" cy="290" rx="4" ry="6"/><path d="M299 307q12 13 23 0" fill="none" stroke="#56332c" stroke-width="4" stroke-linecap="round"/></g>' : ''}
    <path d="M278 155C253 120 299 109 281 70M326 150C304 124 346 107 330 77" fill="none" stroke="url(#steam)" stroke-width="9" stroke-linecap="round"/>`;
  return `${defs}${view}`;
}

export function menuIcon(design, index = 0) {
  const id = design.direction, p = design.palette;
  const detailed = ['skeuomorphism','glassmorphism','claymorphism','neumorphism','bento','editorial'].includes(id);
  let drawing;
  if (detailed) drawing = materialCup({top:true,dark:index===1,clay:id==='claymorphism',colour:index===2?'#c9ddd0':'#f8f1dc'});
  else if (['bauhaus','memphis','swiss'].includes(id)) drawing = index === 0 ? `<circle cx="320" cy="250" r="145" fill="${p.accent}" stroke="${p.ink}" stroke-width="14"/>` : index === 1 ? `<path d="M175 105H465V395H175Z" fill="${p.accent2}" stroke="${p.ink}" stroke-width="14"/>` : `<path d="M320 90L495 400H145Z" fill="${p.accent}" stroke="${p.ink}" stroke-width="14"/>`;
  else drawing = `<ellipse cx="310" cy="370" rx="173" ry="25" fill="${p.ink}" opacity=".2"/><path d="M420 200h65v70h-65M175 180H435L411 315Q310 391 199 315Z" fill="${index===1?p.accent2:p.panel}" stroke="${p.ink}" stroke-width="16"/><ellipse cx="305" cy="180" rx="130" ry="27" fill="${p.ink}"/><path d="M263 135v-55m54 55v-69m54 69v-44" stroke="${p.ink}" stroke-width="10"/>`;
  // Unique local IDs prevent gradient collisions between the three inline icons.
  drawing = drawing.replace(/id="([^"]+)"/g,`id="mi${index}-$1"`).replace(/url\(#([^)]+)\)/g,`url(#mi${index}-$1)`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="90 35 450 430" aria-hidden="true">${drawing}</svg>`;
}
