// Shared vector substrates for PowerPoint. Text and chart objects stay native.
export function materialBackground(id, paper) {
 const fields={glassmorphism:['#218b68','#365c9d','#cf8a4c'],aurora:['#267e68','#284d73','#513780'],y2k:['#edc7ee','#c2e9fa','#e8d7fa'],vaporwave:['#24104c','#c04ad0','#170a29'],skeuomorphism:['#36251c','#61402b','#2f211a']};
 if(!fields[id])return '';
 const c=fields[id];
 const stripes=id==='aurora'?Array.from({length:16},(_,i)=>`<rect x="${i*85}" width="36" height="590" fill="url(#beam)" opacity="${.2+(i%3)*.1}"/>`).join(''):id==='skeuomorphism'?Array.from({length:120},(_,i)=>`<path d="M0 ${i*6}Q400 ${i*6+10} 1280 ${i*6-4}" stroke="#c38b5b" opacity=".06"/>`).join(''):'';
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><defs><linearGradient id="field" x2="1" y2="1"><stop stop-color="${c[0]}"/><stop offset=".5" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></linearGradient><linearGradient id="beam" x2="0" y2="1"><stop stop-color="#7dfbdc"/><stop offset="1" stop-color="${paper}" stop-opacity="0"/></linearGradient></defs><path d="M0 0H1280V720H0Z" fill="url(#field)"/>${stripes}</svg>`;
}
export function materialPanel(id, fill, width=500, height=140) {
 const soft=['neumorphism','claymorphism','y2k'].includes(id), glass=id==='glassmorphism', paper=id==='skeuomorphism';
 if(!soft&&!glass&&!paper)return '';
 const radius=paper?2:soft?20:14;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="surface" x2=".8" y2="1"><stop stop-color="${glass?'#ffffff':paper?'#fff8dc':fill}" stop-opacity="${glass?'.22':'1'}"/><stop offset="1" stop-color="${paper?'#d6c49a':fill}" stop-opacity="${glass?'.10':'1'}"/></linearGradient><linearGradient id="edge" x2="1" y2="1"><stop stop-color="#ffffff" stop-opacity=".8"/><stop offset="1" stop-color="#55606b" stop-opacity=".15"/></linearGradient></defs><rect x="6" y="8" width="${width-14}" height="${height-14}" rx="${radius}" fill="#21323c" opacity=".10"/><rect x="2" y="2" width="${width-14}" height="${height-14}" rx="${radius}" fill="url(#surface)" stroke="url(#edge)" stroke-width="3"/>${paper?`<rect x="8" y="8" width="${width-26}" height="${height-26}" fill="none" stroke="#b59d66"/>`:''}</svg>`;
}
