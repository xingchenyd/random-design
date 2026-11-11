// Each preset owns the surface and hierarchy of its reference style.
export const PRESET_CSS = {
  cyberpunk: `
    body { background: radial-gradient(ellipse at 72% 41%, #4b1a57, transparent 54%), var(--paper); }
    .mast { border-bottom: 1px solid var(--accent2); }
    .copy h1 { text-shadow: 3px 2px var(--accent2), -3px -1px #29ddd9; }
    .action { clip-path: polygon(0 0,100% 0,100% 70%,92% 100%,0 100%); }
    .item { border-color: #4ad7d6; box-shadow: inset 0 0 16px #24e9da20; border-left-width: 5px; }
    .item:nth-child(2) { border-color: var(--accent2); }
    .item:nth-child(3) { border-color: var(--accent); }
    .visual { filter: drop-shadow(0 0 24px #f04fa86b); }
  `,
  'retro-terminal': `
    body { font-family: var(--font-display); background: repeating-linear-gradient(0deg,transparent 0 3px,#0004 3px 4px),var(--paper); }
    .frame { border: 1px solid var(--ink); margin: 18px auto; max-width: min(1380px,95%); box-shadow: 0 0 26px #36ef5540; }
    .mast { border-bottom-style: dashed; }
    .copy h1 { font-size: clamp(40px,6.4vw,86px); text-shadow: 0 0 18px #66ff8280; }
    .copy h1::before { content: "> "; font-size: .44em; vertical-align: middle; }
    .item { color: var(--ink); background: transparent; border: 0; border-bottom: 1px dashed currentColor; }
    .item h3 { font-size: clamp(17px,2vw,27px); }
    .action { border: 1px solid currentColor; background: transparent; color: var(--ink); }
  `,
  skeuomorphism: `
    body { background: radial-gradient(ellipse at 47% 20%,#9f653963,transparent 68%), repeating-linear-gradient(93deg,#ffffff07 0 1px,#0002 2px 6px,transparent 7px 18px),var(--paper); }
    .copy h1 { color: #ffe8b5; text-shadow: 0 2px #21150f; font-size: clamp(43px,6.5vw,90px); }
    .menu { padding: clamp(15px,2.7vw,37px); background: var(--panel); color: var(--panel-ink); border: 5px double #d3aa6e; box-shadow: 0 14px 36px #0006,inset 0 0 28px #0005; }
    .item { background: #f4e6c8; color: #3f2c20; border: 1px solid #b89559; box-shadow: 0 4px 0 #0004,inset 0 0 0 4px #e7d4ac; }
    .action { border-color: #be8358; box-shadow: 0 4px 0 #2b140e,inset 0 1px #fff9; }
  `,
  glassmorphism: `
    body { background: radial-gradient(ellipse at 10% 20%,#29846e 0,transparent 45%),radial-gradient(ellipse at 84% 35%,#466db2 0,transparent 48%),radial-gradient(ellipse at 85% 95%,#b47256,transparent 42%),var(--paper); }
    .hero, .menu { border: 1px solid #e0fff96b; border-radius: var(--radius); background: #1333398c; backdrop-filter: blur(22px); padding: clamp(18px,3.2vw,44px); box-shadow: inset 0 1px 0 #faffff63,0 16px 46px #08202955; color: #f5fffc; }
    .copy h1 { font-size: clamp(38px,5vw,75px); }
    .item { background: #d6fffd15; color: #f5fffc; border-color: #eeffff60; }
    .visual { width: min(100%,190px) !important; }
  `,
  brutalism: `
    .mast { border-bottom: 4px solid var(--ink); }
    .sheet { border-bottom: 4px solid var(--ink); }
    .hero { border: 3px solid var(--ink); padding: clamp(16px,3.1vw,44px); }
    .copy h1 { font-weight: 900; letter-spacing: -.075em; }
    .action { border: 3px solid currentColor; }
    .items { gap: 0; border: 3px solid #181818; }
    .item { min-height: 118px; border: 0; background: #fffdf5; color: #181818; }
    .item + .item { border-top: 3px solid #181818; }
    .item:nth-child(3n+1) { background: #ffdf24; }
    .item:nth-child(3n+3) { background: #f94a36; }
  `,
  'pop-art': `
    body { background: radial-gradient(#2b1a3940 1px,transparent 1.7px) 0 0/9px 9px,var(--paper); }
    .copy h1 { color: #fff7e9; -webkit-text-stroke: 2px #221934; paint-order: stroke fill; text-shadow: 4px 5px #241b28; font-weight: 900; }
    .hero { border: 3px solid #241b28; padding: clamp(17px,3vw,41px); background: #ffce3e; color: #241b28; box-shadow: 6px 6px #241b28; }
    .menu { padding: clamp(12px,2.5vw,33px); border: 3px solid #241b28; background: #fa85b7; color: #241b28; }
    .item { background: #ffdf57; border: 3px solid #241b28; color: #241b28; }
    .item:nth-child(2) { background: #fbf1d9; }
    .item:nth-child(3) { background: #b2c5ff; }
    .price { background: #fff3ce; padding: .45em .28em; clip-path: polygon(50% 0,62% 11%,79% 4%,85% 21%,100% 29%,93% 46%,100% 66%,82% 72%,77% 94%,58% 88%,42% 100%,32% 84%,11% 90%,13% 69%,0 55%,12% 38%,6% 17%,28% 20%,33% 3%); }
    .action { border: 3px solid #241b28; border-radius: 100px; box-shadow: 4px 4px #241b28; }
  `,
  memphis: `
    .mast { border-bottom: 3px solid currentColor; }
    .hero { padding: 18px clamp(0px,2vw,30px); }
    .copy h1 { text-shadow: 3px 3px var(--accent); }
    .item { border: 2px solid #282139; color: #21182b; background: #fbe17b; box-shadow: 4px 4px #282139; }
    .item:nth-child(2) { background: #d7c7fb; }
    .item:nth-child(3) { background: #8bdfc7; }
    .price { border: 2px solid #282139; border-radius: 100%; padding: .36em .25em; background: #fbe8f0; }
    .action { border: 2px solid #282139; box-shadow: 3px 3px #282139; }
  `,
  editorial: `
    .mast { border-block: 3px double var(--rule); margin-top: 13px; }
    .copy h1 { font-size: clamp(49px,7.6vw,108px); letter-spacing: -.065em; }
    .description { border-left: 1px solid currentColor; padding-left: 16px; }
    .visual { width: min(48%,230px) !important; }
    .menu { border-inline-start: 1px solid var(--rule); padding-inline-start: clamp(12px,3vw,40px); }
    .items { gap: 0; }
    .item { border: 0; border-top: 1px solid var(--rule); background: transparent; color: var(--ink); }
    .item h3, .price { font-weight: 500; }
    .action { background: transparent; color: var(--ink); padding-left: 0; border-bottom: 1px solid currentColor; }
  `,
  swiss: `
    .frame { background: repeating-linear-gradient(90deg,transparent 0 calc(8.33% - 1px),#0000000e calc(8.33% - 1px) 8.33%); }
    .mast { border-bottom: 2px solid currentColor; }
    .copy h1 { font-size: clamp(48px,8.5vw,112px); letter-spacing: -.075em; }
    .visual { width: min(45%,160px) !important; margin-left: 0 !important; }
    .items { gap: 0; }
    .item { border: 0; border-top: 1px solid var(--rule); background: transparent; color: var(--ink); }
    .item:last-child { border-bottom: 1px solid var(--rule); }
  `,
  claymorphism: `
    body { background: radial-gradient(ellipse at 80% 32%,#fff9edaa,transparent 50%),var(--paper); }
    .action, .item { box-shadow: inset 5px 5px 12px #fff9,inset -5px -5px 12px #9b6c6825,0 9px 16px #87534e24; border: 0; }
    .item:nth-child(3n+2) { background: #e5d9f5; color: #462c52; }
    .item:nth-child(3n+3) { background: #d5eddf; color: #29493f; }
    .visual { filter: drop-shadow(0 14px 16px #874f5530); }
  `,
  neumorphism: `
    .action, .item, .visual { box-shadow: 9px 9px 19px #344c6940,-7px -7px 17px #ffffffa3; border: 1px solid #f9fdff82; }
    .action, .item { background: var(--paper); color: var(--ink); }
    .visual { margin: 8px auto; width: min(78%,380px); border-radius: 50%; background: var(--paper); }
    .visual svg { scale: .92; }
  `,
  y2k: `
    body { background: radial-gradient(ellipse at 84% 21%,#9eeff3,transparent 50%),radial-gradient(ellipse at 12% 90%,#f7b9eb,transparent 60%),var(--paper); }
    .frame { border: 2px solid #6e5ca1; border-radius: 17px; margin: 16px auto; max-width: min(1370px,96%); box-shadow: inset 0 0 0 4px #fff9,0 8px 35px #653f9e38; }
    .mast { border-bottom: 2px solid #8671b4; }
    .copy h1 { color: #3d2b76; text-shadow: 2px 3px #fff,-2px 1px #eba7e9; }
    .action { background: linear-gradient(#fff,#b9f5ff 46%,#8ce3f1 51%,#bdadf5); border-color: #7655a8; color: #31204c; border-radius: 100px; }
    .item { background: linear-gradient(145deg,#fff9ff,#efe0ff); color: #3d285a; border-color: #806ab7; box-shadow: inset 0 2px #fff; }
  `,
  'pixel-art': `
    body { background: repeating-linear-gradient(0deg,#3c503107 0 1px,transparent 1px 8px),var(--paper); }
    .mast { border-bottom: 3px solid var(--ink); }
    .copy h1 { text-shadow: 3px 3px var(--accent2); font-size: clamp(42px,6.7vw,90px); }
    .action, .item { border: 3px solid var(--ink); box-shadow: 4px 4px var(--ink); }
    .visual svg { image-rendering: pixelated; }
  `,
  neubrutalism: `
    body { background: radial-gradient(#141d1955 1px,transparent 1.3px) 0 0/16px 16px,var(--paper); }
    .hero { padding: clamp(15px,2.3vw,30px); border: 3px solid #172821; background: #a5e9cd; color: #172821; box-shadow: 6px 6px #172821; }
    .action, .item { border: 3px solid #172821; box-shadow: 5px 5px #172821; }
    .item { background: #ffdc56; color: #172821; }
    .item:nth-child(3n+2) { background: #b9ddfa; }
    .item:nth-child(3n+3) { background: #f5a1b9; }
  `,
  bauhaus: `
    .mast { border-bottom: 4px solid currentColor; }
    .copy h1 { font-size: clamp(48px,7.3vw,107px); letter-spacing: -.07em; }
    .hero { border-bottom: 1px solid var(--rule); }
    .visual { border-left: 1px solid var(--rule); }
    .items { gap: 0; }
    .item { color: #191919; background: #f2c21b; border: 2px solid #191919; }
    .item:nth-child(3n+2) { color: #fff; background: #2451a4; }
    .item:nth-child(3n+3) { color: #fff; background: #a9231b; }
  `,
  vaporwave: `
    body { background: radial-gradient(ellipse at 52% 53%,#b444b88c,transparent 62%),linear-gradient(180deg,transparent 35%,#b45dc34d 67%,#201449 70%),var(--paper); }
    .sheet { position: relative; isolation: isolate; }
    .sheet::before { content: ""; position: absolute; z-index: -1; inset: 51% 0 0; background: repeating-linear-gradient(0deg,transparent 0 23px,#f8a5fa3c 24px 25px),repeating-linear-gradient(90deg,transparent 0 57px,#8cf6f23b 58px 59px); transform: perspective(300px) rotateX(29deg); transform-origin: center bottom; }
    .copy h1 { text-shadow: 2px 3px #d14fbd; }
    .item { border-color: #eca6f7; box-shadow: inset 0 0 12px #cf87f263; }
  `,
  aurora: `
    body { background: radial-gradient(ellipse at 18% -3%,#1b916f 0,transparent 51%),radial-gradient(ellipse at 72% -12%,#497ed3 0,transparent 49%),radial-gradient(ellipse at 100% 49%,#443275 0,transparent 60%),var(--paper); }
    .hero { background: repeating-linear-gradient(100deg,transparent 0 35px,#b4fff807 38px 46px,transparent 52px 87px); border-bottom: 1px solid #e0ffff44; }
    .copy h1 { color: #effbff; text-shadow: 0 0 35px #8cdde98a; }
    .description { color: #effbff; }
    .item { background: #183047cc; color: #f5fbff; border-color: #d4e6ff5c; }
  `,
  'art-deco': `
    .frame { border: 4px double var(--accent); margin: 18px auto; max-width: min(1360px,96%); }
    .hero { text-align: center; align-content: center; gap: 0; }
    .hero .visual { grid-area: 1 / 1; width: min(90%,390px); align-self: start; margin-top: -22px; }
    .hero .copy { grid-area: 2 / 1; margin-top: -45px; }
    .copy h1 { font-size: clamp(43px,6vw,86px); letter-spacing: .035em; }
    .item { background: transparent; color: var(--ink); border: 3px double var(--accent); }
    .action { background: transparent; color: var(--ink); border-color: var(--accent); }
  `,
  'sci-fi-hud': `
    body { background: linear-gradient(#b7fbfb16 1px,transparent 1px) 0 0/40px 40px,linear-gradient(90deg,#b7fbfb16 1px,transparent 1px) 0 0/40px 40px,var(--paper); }
    .mast { border-bottom: 2px solid var(--accent); }
    .hero { border: 1px solid var(--accent); background: radial-gradient(ellipse,#11536577,transparent 72%); }
    .hero .visual { opacity: .38; width: min(95%,520px); }
    .hero .copy { padding: 35px 8px; }
    .copy h1 { text-shadow: 0 0 16px #60fff08c; }
    .item { border-color: var(--accent); border-left-width: 5px; }
  `,
  bento: `
    .hero { padding: clamp(22px,3.4vw,46px); border-radius: var(--radius); background: var(--panel); color: var(--panel-ink); gap: 4px; }
    .copy h1 { font-size: clamp(42px,6.1vw,88px); }
    .visual { width: min(89%,340px); margin-inline: auto; }
    .menu { display: flex; flex-direction: column; }
    .items { flex: 1; grid-auto-rows: minmax(113px,1fr); }
    .item { align-content: center; background: #f2d690; color: #2f362a; border: 0; }
    .item:first-child { background: #ecdfc6; }
    .item:nth-child(3n+2) { background: #a7cdb1; }
    .item:nth-child(3n+3) { background: #dc937a; }
    .item:not(:first-child) { grid-template-columns: 1fr; }
  `,
  'new-chinese': `
    .frame { border: 4px double var(--accent); margin: 16px auto; max-width: min(1360px,96%); }
    .sheet { gap: clamp(12px,2vw,28px); }
    .copy h1 { font: 400 clamp(39px,5.2vw,74px)/1.05 "Ma Shan Zheng","KaiTi","STKaiti",serif; }
    .copy .vertical-title { writing-mode: vertical-rl; letter-spacing: .12em; max-height: 410px; }
    .copy .vertical-title br { display: none; }
    .description { font-family: var(--font-cjk),serif; }
    .action { border-radius: 0; }
    .items { gap: 0; }
    .item { border: 0; border-top: 1px solid var(--rule); color: var(--ink); background: transparent; }
    .price { color: var(--accent-ink); }
    @media (max-width: 560px) { .copy .vertical-title { font-size: clamp(30px,9vw,44px); max-height: 200px; } }
  `
};
