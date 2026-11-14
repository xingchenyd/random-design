import { materialCup } from './material-art.js';
// Original motif drawings for the preset renderers. Coordinate units are SVG
// viewBox units, shared by the website and PowerPoint exports.
function cup(fill, edge, coffee = '#56331e', shine = '#fff1d4') {
  return `<ellipse cx="310" cy="383" rx="168" ry="28" fill="${edge}" opacity=".18"/>
  <ellipse cx="310" cy="361" rx="153" ry="38" fill="${fill.startsWith('url(') ? shine : fill}" stroke="${edge}" stroke-width="5"/>
  <path d="M424 222C514 194 523 302 435 310" fill="none" stroke="${edge}" stroke-width="26"/>
  <path d="M424 222C514 194 523 302 435 310" fill="none" stroke="${fill}" stroke-width="16"/>
  <path d="M175 218H440L420 300Q408 355 311 359Q215 355 196 300Z" fill="${fill}" stroke="${edge}" stroke-width="5"/>
  <ellipse cx="307" cy="216" rx="132" ry="41" fill="${shine}" stroke="${edge}" stroke-width="5"/>
  <ellipse cx="307" cy="218" rx="112" ry="30" fill="${coffee}"/>
  <path d="M260 225Q295 194 352 219Q331 236 307 231Q282 227 280 214Q287 209 316 210" fill="none" stroke="${shine}" stroke-width="5" stroke-linecap="round" opacity=".8"/>`;
}

function rays(count, radius, color) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (202 + index * 136 / (count - 1)) * Math.PI / 180;
    const point = distance => `${320 + Math.cos(angle) * distance} ${337 + Math.sin(angle) * distance}`;
    return `<path d="M${point(radius * .46)}L${point(radius)}" stroke="${color}" stroke-width="${index % 2 ? 2 : 5}"/>`;
  }).join('');
}

function pixelCounter(palette) {
  const { ink, accent, accent2 } = palette;
  // Coordinates use an 8 px grid. Cup, window, counter and steam share it.
  return `<g shape-rendering="crispEdges">
    <path d="M64 72H576V436H64Z" fill="${ink}"/>
    <path d="M80 88H560V416H80Z" fill="${accent2}"/>
    <path d="M104 112H296V272H104Z" fill="#293d36"/>
    <path d="M120 128H200V184H120ZM216 128H280V184H216ZM120 200H200V256H120ZM216 200H280V256H216Z" fill="#d4e6ce"/>
    <path d="M120 232H152V216H176V248H120ZM216 240H240V216H280V248H216Z" fill="#8abf9e"/>
    <path d="M80 328H560V416H80Z" fill="#835441"/><path d="M80 328H560V352H80ZM96 392H544V400H96Z" fill="#ba7951"/>
    <path d="M336 176H536V192H336ZM336 240H536V256H336Z" fill="#344a3b"/>
    <path d="M360 136H392V176H360ZM416 144H448V176H416ZM480 128H512V176H480Z" fill="#f0d6a2"/>
    <path d="M360 216H384V240H360ZM400 208H424V240H400ZM448 216H472V240H448ZM496 208H520V240H496Z" fill="#c36b55"/>
    <path d="M208 272H344V288H376V328H344V360H224V344H208Z" fill="${ink}"/>
    <path d="M224 288H328V344H240V328H224ZM344 296H360V312H344Z" fill="#fff4da"/>
    <path d="M248 296H264V304H280V296H296V320H280V328H264V320H248Z" fill="${accent}"/>
    <path d="M248 248H264V232H256V208H264V224H272V240H264V248ZM288 248H304V232H296V208H304V224H312V240H304V248Z" fill="#fff4da"/>
  </g>`;
}

export function presetArtwork(design, decorative) {
  const p = design.palette;
  const shape = design.graphic.family;
  const defs = `<defs>
    <linearGradient id="ceramic" x2=".84" y2="1"><stop stop-color="#fff8ec"/><stop offset=".55" stop-color="#ded5c8"/><stop offset="1" stop-color="#a88a76"/></linearGradient>
    <linearGradient id="clay" x2=".8" y2="1"><stop stop-color="#fff1e7"/><stop offset=".4" stop-color="${p.accent}"/><stop offset="1" stop-color="${p.accent2}"/></linearGradient>
    <linearGradient id="sun" x2="0" y2="1"><stop stop-color="#ffdf69"/><stop offset=".55" stop-color="#ff804b"/><stop offset="1" stop-color="#ff58bb"/></linearGradient>
    <linearGradient id="chrome" x2="1" y2="1"><stop stop-color="#ffe0fc"/><stop offset=".23" stop-color="#a68aff"/><stop offset=".48" stop-color="#eaf9ff"/><stop offset=".53" stop-color="#6d77c1"/><stop offset=".84" stop-color="#a8f6f0"/><stop offset="1" stop-color="#e792e7"/></linearGradient>
    <linearGradient id="mist" x2="0" y2="1"><stop stop-color="#f8edcf"/><stop offset="1" stop-color="#98b0a1"/></linearGradient>
    <clipPath id="moon-window"><circle cx="320" cy="250" r="196"/></clipPath>
  </defs>`;
  let art = '';
  switch (shape) {
    case 'ceramic':
      art = materialCup({top: true, colour: design.direction === 'neumorphism' ? '#e4edf2' : '#fff4dd'});
      break;
    case 'clay-cup':
      art = materialCup({clay:true});
      break;
    case 'chrome':
      art = `<circle cx="320" cy="242" r="199" fill="url(#chrome)" stroke="#fff" stroke-width="3"/><circle cx="320" cy="242" r="190" fill="none" stroke="#6e57ad" stroke-width="2"/>${materialCup({chrome:true})}`;
      break;
    case 'neon':
    case 'sunset': {
      const cyber = shape === 'neon';
      art = `<g clip-path="url(#moon-window)"><circle cx="320" cy="250" r="196" fill="url(#sun)"/>
        ${Array.from({length: 9}, (_, i) => `<path d="M100 ${279 + i * 19}H540" stroke="${p.paper}" stroke-width="${3 + i * .8}"/>`).join('')}</g>
        ${cyber ? `<path d="M200 220H422L408 308Q309 378 219 309ZM422 229H463V279L412 292" fill="${p.paper}" stroke="#65fff0" stroke-width="4"/><path d="M209 230H414" stroke="#ef46b3" stroke-width="3"/>` : materialCup({colour:'#77e3e5'})}
        ${cyber ? `<path d="M222 284h38l20-22 24 39 19-17h62" fill="none" stroke="${p.accent}" stroke-width="5"/>` : ''}`;
      break;
    }
    case 'terminal':
      art = `<g fill="none" stroke="${p.ink}" stroke-width="3">
        <path d="M138 119H502V387H138Z" opacity=".35"/>
        <path d="M218 221H408L394 297L366 321H258L232 294ZM409 229H452V272L400 290M205 344H430M267 195v-31h12v-26m34 57v-31h12v-26m34 57v-31h12v-26"/>
        <path d="M146 133h18m312 0h18m-348 240h18m312 0h18" stroke-width="6"/>
      </g>`;
      break;
    case 'lens':
      art = `<circle cx="326" cy="244" r="168" fill="${p.accent}" fill-opacity=".12" stroke="${p.accent}" stroke-opacity=".4" stroke-width="2"/>
        <circle cx="326" cy="244" r="127" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>
        <path d="M212 244H440M326 130V358" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`;
      break;
    case 'pop':
      art = `<path d="M78 349L137 311 102 259 164 249 146 182 212 195 228 129 282 164 328 101 363 157 430 121 447 183 522 161 517 227 578 247 540 294 568 343 501 354 492 410 433 392 390 434 344 402 289 439 247 402 184 426 173 377 111 386Z" fill="${p.accent}" stroke="${p.ink}" stroke-width="6"/>
        ${cup(p.panel, p.ink)}`;
      break;
    case 'memphis':
      art = `<path d="M144 320a108 108 0 1 1 216 0Z" fill="${p.accent2}" stroke="${p.ink}" stroke-width="6"/>
        <path d="M285 321H478V387H285Z" fill="${p.accent}" stroke="${p.ink}" stroke-width="6"/>
        <path d="M309 360q20-37 41 0t41 0t41 0" fill="none" stroke="${p.ink}" stroke-width="5"/>
        <circle cx="450" cy="248" r="68" fill="${p.panel}" stroke="${p.ink}" stroke-width="6"/>`;
      break;
    case 'editorial-cup':
      art = `<circle cx="317" cy="247" r="191" fill="${p.accent}"/>
        <circle cx="317" cy="247" r="172" fill="none" stroke="${p.paper}" stroke-width="2"/>
        <circle cx="317" cy="247" r="111" fill="${p.paper}"/><circle cx="317" cy="247" r="90" fill="#4f3323"/>
        <path d="M417 229h26a19 19 0 0 1 0 38h-27" fill="none" stroke="${p.paper}" stroke-width="12"/>
        <path d="M268 258q55-48 105-2m-87 4q26-27 63-14" stroke="#e7c5a0" stroke-width="5" fill="none"/>`;
      break;
    case 'swiss-mark':
      art = `<circle cx="320" cy="249" r="135" fill="${p.accent}"/><path d="M129 249H511M320 57V442" stroke="${p.ink}" stroke-width="2"/>`;
      break;
    case 'pixel-counter':
      art = pixelCounter(p);
      break;
    case 'bauhaus-cup':
      art = `<path d="M102 75H291V267H102Z" fill="${p.panel}"/>
        <path d="M382 65L511 274H253Z" fill="${p.accent2}"/>
        <path d="M451 288H545V316H451Z" fill="${p.ink}"/>
        <circle cx="343" cy="288" r="133" fill="${p.accent}"/><circle cx="343" cy="288" r="88" fill="${p.ink}"/>
        <circle cx="310" cy="252" r="15" fill="${p.paper}"/>
        <path d="M102 313v115m23-115v115m23-115v115m23-115v115" stroke="${p.ink}" stroke-width="8"/>`;
      break;
    case 'deco-fan':
      art = `<path d="M93 356H547M125 335H515M158 314H482M189 293H451" stroke="${p.accent}" stroke-width="2"/>${rays(21, 245, p.accent)}
        <path d="M320 253L382 325 320 396 258 325Z" fill="${p.paper}" stroke="${p.accent}" stroke-width="4"/><path d="M320 278l39 47-39 46-39-46Z" fill="none" stroke="${p.accent}" stroke-width="2"/>`;
      break;
    case 'reticle':
      art = `<g fill="none" stroke="${p.accent}" stroke-width="2">
        <circle cx="320" cy="249" r="174" opacity=".4"/><circle cx="320" cy="249" r="144" stroke-dasharray="3 8"/>
        <circle cx="320" cy="249" r="111"/><path d="M320 46V452M119 249H521" opacity=".45"/>
        <path d="M139 137V83H193M447 83H501V137M139 361V415H193M447 415H501V361" stroke-width="4"/>
        <path d="M245 269H281L298 232 322 289 345 254H397" stroke="${p.accent2}" stroke-width="4"/>
      </g>`;
      break;
    case 'ink-landscape':
      art = `<g clip-path="url(#moon-window)"><circle cx="320" cy="250" r="196" fill="url(#mist)"/>
        <circle cx="420" cy="143" r="31" fill="${p.accent}"/>
        <path d="M97 267Q148 216 207 228Q263 159 305 201Q327 218 374 236Q418 191 489 217L544 243V333H97Z" fill="#729080" opacity=".45"/>
        <path d="M103 301Q174 243 236 269Q298 205 367 263Q413 249 543 299V361H103Z" fill="#3e6d62" opacity=".68"/>
        <path d="M109 331Q228 310 340 327T542 322M145 360Q290 333 483 355M172 386Q312 358 454 379" stroke="#f3eedb" stroke-width="5" opacity=".63" fill="none"/>
        <path d="M212 339Q320 387 430 339L412 361Q320 399 230 361Z" fill="#234f43"/><ellipse cx="321" cy="338" rx="109" ry="15" fill="#b7d2bb"/><ellipse cx="321" cy="338" rx="91" ry="10" fill="#3b5946"/><path d="M192 385Q315 407 443 385" fill="none" stroke="#5e7c6b" stroke-width="3"/>
      </g><circle cx="320" cy="250" r="196" fill="none" stroke="${p.ink}" stroke-width="5"/>
      <circle cx="320" cy="250" r="208" fill="none" stroke="${p.ink}" stroke-width="1"/>`;
      break;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="500" viewBox="0 0 640 500"${decorative ? ' aria-hidden="true"' : ' role="img" aria-label="Style illustration"'}>${defs}${art}</svg>`;
}
