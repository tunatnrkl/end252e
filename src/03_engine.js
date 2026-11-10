/* ===================== Video engine ===================== */
const V = {};
const SC = {acc:"#5fd3da",warm:"#f0c349",red:"#ff7b6e",good:"#6fdc9a",mut:"#8fa7ae",fg:"#e9f1f3",line:"rgba(255,255,255,.18)",bg:"#0e1b21",pane:"rgba(255,255,255,.07)"};
const COL = {acc:SC.acc,warm:SC.warm,red:SC.red,good:SC.good,mut:SC.mut,fg:SC.fg};
let _uid = 0; const uid = ()=>"u"+(++_uid);
const mi = s => esc(s).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>");
const fmt = (v,d)=> (Math.round(v*10**d)/10**d).toString();
const svgo = (inner,h=540)=>`<svg class="vsvg" viewBox="0 0 960 ${h}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${inner}</svg>`;
function tx(x,y,s,o={}){
  const fam = o.mono ? "'JetBrains Mono',ui-monospace,monospace" : "'Inter',system-ui,sans-serif";
  return `<text x="${x}" y="${y}" fill="${o.fill||SC.fg}" font-size="${o.fs||22}" text-anchor="${o.anchor||"start"}" font-family="${fam}" font-weight="${o.w||400}"${o.attrs?" "+o.attrs:""}${o.s!=null?` data-s="${o.s}"`:""}${o.only?" data-only":""}>${esc(s)}</text>`;
}
const spread = (n,a,b)=> n===1 ? [(a+b)/2] : Array.from({length:n},(_,i)=>a+(b-a)*i/(n-1));
function ruleOne(rule){ rule=rule.trim(); let m;
  if(rule==="all") return ()=>true;
  if((m=rule.match(/^(sum|r|c|max|min)(<=|>=|=|<|>|:)(\d+)$/))){ const k=m[1],n=+m[3]; const g=(r,c)=>({sum:r+c,r,c,max:Math.max(r,c),min:Math.min(r,c)})[k]; const cmp={"<=":(a,b)=>a<=b,">=":(a,b)=>a>=b,"=":(a,b)=>a===b,":":(a,b)=>a===b,"<":(a,b)=>a<b,">":(a,b)=>a>b}[m[2]]; return (r,c)=>cmp(g(r,c),n); }
  if((m=rule.match(/^(r|c|sum):(even|odd)$/))){ const g=(r,c)=>({r,c,sum:r+c})[m[1]]; return (r,c)=>g(r,c)%2===(m[2]==="even"?0:1); }
  if((m=rule.match(/^any:(\d+)$/))) return (r,c)=>r===+m[1]||c===+m[1];
  if(rule==="same") return (r,c)=>r===c; if(rule==="diff") return (r,c)=>r!==c;
  if(rule==="r<c") return (r,c)=>r<c; if(rule==="r>c") return (r,c)=>r>c;
  return ()=>false; }
function cellsOf(rule,R,C){ if(!rule) return []; const f=rule.split("&").map(ruleOne).reduce((a,b)=>(r,c)=>a(r,c)&&b(r,c)); const out=[]; for(let r=1;r<=R;r++)for(let c=1;c<=C;c++) if(f(r,c)) out.push([r,c]); return out; }
function fnOf(v){ const p=v.p||{};
  if(v.fn==="normal"){ const mu=p.mu??0,s=p.sigma??1; return x=>Math.exp(-((x-mu)**2)/(2*s*s))/(s*Math.sqrt(2*Math.PI)); }
  if(v.fn==="unif") return x=>(x>=p.a&&x<=p.b)?1/(p.b-p.a):0;
  if(v.fn==="exp") return x=>x>=0?p.lam*Math.exp(-p.lam*x):0;
  if(v.fn==="poly") return x=>(x>=v.dom[0]&&x<=v.dom[1])?v.coef.reduce((a,c,i)=>a+c*x**i,0):0;
  return ()=>0; }

const R = {
  title(v){ return `<div class="v-title"><div class="vt-k" data-s="0">${esc(v.k||"END252E · Olasılık")}</div><h2 data-s="0">${mi(v.h)}</h2>${v.sub?`<p data-s="1">${mi(v.sub)}</p>`:""}${v.tags?`<div class="vt-tags" data-s="2">${v.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div>`:""}</div>`; },
  text(v){ return `<div class="v-text">${v.h?`<h3>${mi(v.h)}</h3>`:""}<ul>${v.items.map((it,i)=>`<li data-s="${i}">${mi(it)}</li>`).join("")}</ul></div>`; },
  formula(v){ return `<div class="v-form">${v.h?`<h3>${mi(v.h)}</h3>`:""}${v.lines.map((l,i)=>`<div class="fl" data-s="${i}"><div class="ff">${esc(l[0])}</div>${l[1]?`<div class="fw">${mi(l[1])}</div>`:""}</div>`).join("")}</div>`; },
  cards(v){ return `<div class="v-cards"><div class="vc-h">${esc(v.h||"Özet kartı")}</div><ol>${v.items.map((it,i)=>`<li data-s="${i}">${mi(it)}</li>`).join("")}</ol></div>`; },
  steps(v){ return `<div class="v-steps${v.wrong?" wrong":""}">${v.h?`<h3>${v.wrong?"✗ ":""}${mi(v.h)}</h3>`:""}<ol>${v.lines.map((l,i)=>`<li data-s="${i}"><span class="n">${i+1}</span><span class="b">${mi(l)}</span></li>`).join("")}</ol></div>`; },
  compare(v){ const col=(c,i,bad)=>`<div class="col${bad?" bad":""}" data-s="${i}"><h4>${mi(c.h)}</h4><ul>${c.items.map(x=>`<li>${mi(x)}</li>`).join("")}</ul></div>`; return `<div class="v-cmp"><div class="cols">${col(v.l,0,v.bad==="l")}${col(v.r,1,v.bad==="r")}</div>${v.verdict?`<div class="verdict" data-s="2">${mi(v.verdict)}</div>`:""}</div>`; },
  table(v){ return `<div class="v-table">${v.h?`<h3>${mi(v.h)}</h3>`:""}<div class="tw"><table><thead><tr>${v.head.map(h=>`<th>${mi(h)}</th>`).join("")}</tr></thead><tbody>${v.rows.map((r,i)=>`<tr data-s="${v.all?0:i}">${r.map((c,j)=>`<td${j===0?' class="rh"':""}>${mi(String(c))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${v.note?`<p class="note" data-s="${v.all?1:v.rows.length}">${mi(v.note)}</p>`:""}</div>`; },
  list(v){ const chips=(hl=[],col="acc")=>`<div class="chips">${v.items.map((it,i)=>`<span class="ch${hl.includes(i)?" hl "+col:""}">${mi(it)}</span>`).join("")}</div>`;
    if(!v.steps) return `<div class="v-list">${v.h?`<h3>${mi(v.h)}</h3>`:""}<div data-s="0">${chips()}</div>${v.label?`<p class="lbl" data-s="1">${mi(v.label)}</p>`:""}</div>`;
    return `<div class="v-list" style="height:100%;display:flex;flex-direction:column">${v.h?`<h3>${mi(v.h)}</h3>`:""}<div class="vstack">${v.steps.map((s,i)=>`<div data-only data-s="${i}">${chips(s.hl||[],s.col)}<p class="lbl">${mi(s.label||"")}</p></div>`).join("")}</div></div>`; },
  venn(v){ const id=uid(); const dj=v.layout==="disjoint"; const A={cx:dj?300:400,cy:265,r:dj?140:160}, B={cx:dj?660:560,cy:265,r:dj?140:160};
    const circ=(c,extra="")=>`<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" ${extra}/>`;
    const rect=(extra)=>`<rect x="60" y="45" width="840" height="440" rx="14" ${extra}/>`;
    const defs=`<defs><clipPath id="${id}a">${circ(A)}</clipPath>
      <mask id="${id}mA"><rect width="960" height="540" fill="white"/>${circ(B,'fill="black"')}</mask>
      <mask id="${id}mB"><rect width="960" height="540" fill="white"/>${circ(A,'fill="black"')}</mask>
      <mask id="${id}mNA"><rect width="960" height="540" fill="white"/>${circ(A,'fill="black"')}</mask>
      <mask id="${id}mNB"><rect width="960" height="540" fill="white"/>${circ(B,'fill="black"')}</mask>
      <mask id="${id}mNAB"><rect width="960" height="540" fill="white"/>${circ(A,'fill="black"')}${circ(B,'fill="black"')}</mask>
      <mask id="${id}mNI"><rect width="960" height="540" fill="white"/><g clip-path="url(#${id}a)">${circ(B,'fill="black"')}</g></mask></defs>`;
    const F=`fill="${SC.acc}" fill-opacity=".55"`, FW=`fill="${SC.warm}" fill-opacity=".5"`;
    const hl=m=>({none:"",a:circ(A,F),b:circ(B,F),union:circ(A,F)+circ(B,F),inter:`<g clip-path="url(#${id}a)">${circ(B,F)}</g>`,
      aonly:circ(A,`${F} mask="url(#${id}mA)"`),bonly:circ(B,`${F} mask="url(#${id}mB)"`),
      comp:rect(`${FW} mask="url(#${id}mNA)"`),compB:rect(`${FW} mask="url(#${id}mNB)"`),compUnion:rect(`${FW} mask="url(#${id}mNAB)"`),compInter:rect(`${FW} mask="url(#${id}mNI)"`)})[m]||"";
    const outline=circ(A,`fill="none" stroke="${SC.fg}" stroke-width="3"`)+circ(B,`fill="none" stroke="${SC.fg}" stroke-width="3"`);
    const labels=tx(A.cx-(dj?0:80),A.cy+12,v.a||"A",{fs:36,w:700,anchor:"middle"})+tx(B.cx+(dj?0:80),B.cy+12,v.b||"B",{fs:36,w:700,anchor:"middle"})+tx(82,82,"S",{fs:26,fill:SC.mut,w:600});
    const steps=(v.steps||[]).map((s,i)=>`<g data-only data-s="${i}">${hl(s.mode)}${s.label?tx(480,522,s.label,{fs:26,anchor:"middle",fill:SC.warm,mono:true,w:600}):""}</g>`).join("");
    return svgo(defs+rect(`fill="${SC.pane}" stroke="${SC.line}" stroke-width="2"`)+steps+outline+labels); },
  grid(v){ const Rn=v.rows||6,C=v.cols||6, cs=Math.min(66, 410/Math.max(Rn,C)); const ox=80, oy=40;
    const lab=(r,c)=> v.cell==="sum"?String(r+c): v.cell==="none"?"":`${r},${c}`;
    let base=""; for(let r=1;r<=Rn;r++)for(let c=1;c<=C;c++){ const x=ox+(c-1)*cs,y=oy+(r-1)*cs; base+=`<rect x="${x}" y="${y}" width="${cs-4}" height="${cs-4}" rx="6" fill="${SC.pane}" stroke="${SC.line}"/>`+tx(x+(cs-4)/2,y+cs/2+5,lab(r,c),{fs:cs*0.3,anchor:"middle",fill:SC.mut,mono:true}); }
    const axes=(v.rlabel?tx(ox-22,oy+Rn*cs/2,v.rlabel,{fs:18,anchor:"middle",fill:SC.mut,attrs:`transform="rotate(-90 ${ox-22} ${oy+Rn*cs/2})"`}):"")+(v.clabel?tx(ox+C*cs/2,oy+Rn*cs+22,v.clabel,{fs:18,anchor:"middle",fill:SC.mut}):"");
    const fx=ox+C*cs+30, fw=960-fx-10;
    const steps=(v.steps||[]).map((s,i)=>{ const cells=s.cells||cellsOf(s.rule,Rn,C); const col=COL[s.col||"acc"];
      return `<g data-only data-s="${i}">${cells.map(([r,c])=>`<rect x="${ox+(c-1)*cs}" y="${oy+(r-1)*cs}" width="${cs-4}" height="${cs-4}" rx="6" fill="${col}" fill-opacity=".5" stroke="${col}" stroke-width="2.5"/>`).join("")}${s.label?`<foreignObject x="${fx}" y="50" width="${fw}" height="440"><div xmlns="http://www.w3.org/1999/xhtml" class="fo"><div class="fo-h" style="color:${col}">${mi(s.label)}</div>${s.sub?`<div class="fo-s">${mi(s.sub)}</div>`:""}</div></foreignObject>`:""}</g>`}).join("");
    return svgo(base+axes+steps); },
  bar(v){ const x=v.x, frames=v.frames||[v.y]; const dec=v.dec??3; const ymax=(v.ymax||Math.max(...frames.flat()))*1.18; const px0=120,px1=900,py0=430,py1=80; const n=x.length, bw=(px1-px0)/n, w=bw*0.62;
    const Y=val=>py0-(val/ymax)*(py0-py1);
    let axes=`<line x1="${px0}" y1="${py0}" x2="${px1}" y2="${py0}" stroke="${SC.line}" stroke-width="2"/><line x1="${px0}" y1="${py0}" x2="${px0}" y2="${py1}" stroke="${SC.line}" stroke-width="2"/>`;
    axes+=x.map((l,i)=>tx(px0+bw*i+bw/2,py0+32,String(l),{fs:22,anchor:"middle",fill:SC.mut,mono:true})).join("");
    if(v.xlabel) axes+=tx((px0+px1)/2,py0+66,v.xlabel,{fs:20,anchor:"middle",fill:SC.mut});
    if(v.ylabel) axes+=tx(px0-16,py1-18,v.ylabel,{fs:20,anchor:"end",fill:SC.mut});
    const top=ymax/1.18; [0.25,0.5,0.75,1].forEach(f=>{const yv=top*f, yy=Y(yv); axes+=`<line x1="${px0}" y1="${yy}" x2="${px1}" y2="${yy}" stroke="${SC.line}" stroke-dasharray="4 6"/>`+tx(px0-10,yy+7,fmt(yv,2),{fs:18,anchor:"end",fill:SC.mut,mono:true});});
    const bars=(ys,only)=>ys.map((val,i)=>{const col=COL[(v.col&&v.col[i])||"acc"]; const bx=px0+bw*i+(bw-w)/2; return `<g${only?' class="gbar on"':` data-s="${i}" class="gbar"`}><rect class="gb" x="${bx}" y="${Y(val)}" width="${w}" height="${py0-Y(val)}" rx="5" fill="${col}" fill-opacity=".85" style="transform-box:fill-box;transform-origin:50% 100%"/>${tx(bx+w/2,Y(val)-10,fmt(val,dec),{fs:19,anchor:"middle",mono:true})}</g>`}).join("");
    let body = v.frames ? frames.map((ys,k)=>`<g data-only data-s="${k}">${bars(ys,true)}${v.flabels?tx(510,42,v.flabels[k],{fs:24,anchor:"middle",fill:SC.warm,w:600}):""}</g>`).join("") : bars(frames[0],false);
    if(v.h && !v.flabels) body+=tx(510,42,v.h,{fs:24,anchor:"middle",fill:SC.fg,w:600});
    if(v.marker){ const mx=px0+bw*v.marker.x+bw/2; body+=`<g data-s="${v.marker.s??n}"><polygon points="${mx-12},${py0+4} ${mx+12},${py0+4} ${mx},${py0-12}" fill="${SC.warm}"/>${tx(mx,py0+96,v.marker.label,{fs:22,anchor:"middle",fill:SC.warm,mono:true,w:600})}</g>`; }
    return svgo(axes+body); },
  stair(v){ const xs=v.x,F=v.F; const px0=120,px1=880,py0=430,py1=80; const xmin=xs[0]-1,xmax=xs[xs.length-1]+1; const X=x=>px0+(x-xmin)/(xmax-xmin)*(px1-px0); const Y=f=>py0-f*(py0-py1);
    let s=`<line x1="${px0}" y1="${py0}" x2="${px1}" y2="${py0}" stroke="${SC.line}" stroke-width="2"/><line x1="${px0}" y1="${py0}" x2="${px0}" y2="${py1}" stroke="${SC.line}" stroke-width="2"/>`;
    [0.25,0.5,0.75,1].forEach(f=>{s+=`<line x1="${px0}" y1="${Y(f)}" x2="${px1}" y2="${Y(f)}" stroke="${SC.line}" stroke-dasharray="4 6"/>`+tx(px0-10,Y(f)+7,String(f),{fs:18,anchor:"end",fill:SC.mut,mono:true});});
    xs.forEach(x=>{s+=tx(X(x),py0+32,String(x),{fs:22,anchor:"middle",fill:SC.mut,mono:true});});
    s+=tx(px1,py0+32,"x",{fs:22,anchor:"middle",fill:SC.mut})+tx(px0-16,py1-18,"F(x)",{fs:20,anchor:"end",fill:SC.mut,mono:true});
    s+=`<line x1="${px0}" y1="${py0}" x2="${X(xs[0])}" y2="${py0}" stroke="${SC.acc}" stroke-width="4"/>`;
    xs.forEach((x,k)=>{ const x2 = k<xs.length-1 ? X(xs[k+1]) : px1; const prev = k? F[k-1]:0;
      s+=`<g data-s="${k}"><line x1="${X(x)}" y1="${Y(prev)}" x2="${X(x)}" y2="${Y(F[k])}" stroke="${SC.warm}" stroke-dasharray="5 5" stroke-width="2"/><line x1="${X(x)}" y1="${Y(F[k])}" x2="${x2}" y2="${Y(F[k])}" stroke="${SC.acc}" stroke-width="4"/><circle cx="${X(x)}" cy="${Y(F[k])}" r="8" fill="${SC.acc}"/>${k<xs.length-1?`<circle cx="${x2}" cy="${Y(F[k])}" r="8" fill="${SC.bg}" stroke="${SC.acc}" stroke-width="3"/>`:""}${tx(X(x)+14,Y(F[k])-14,"F = "+F[k],{fs:20,fill:SC.warm,mono:true})}</g>`; });
    return svgo(s); },
  tree(v){ const b=v.b, m=b.length; const x0=90,x1=360,x2=640,x3=770; const ys=spread(m,120,420); let L1="",L2="",L3="";
    const node=(x,y,l,s)=>`<g data-s="${s}"><rect x="${x-46}" y="${y-22}" width="92" height="44" rx="9" fill="${SC.pane}" stroke="${SC.line}"/>${tx(x,y+8,l,{fs:24,anchor:"middle",w:600})}</g>`;
    const ln=(xa,ya,xb,yb,p,s)=>`<g data-s="${s}"><line x1="${xa}" y1="${ya}" x2="${xb}" y2="${yb}" stroke="${SC.mut}" stroke-width="2.5"/>${tx((xa+xb)/2,(ya+yb)/2-12,p,{fs:21,anchor:"middle",fill:SC.acc,mono:true})}</g>`;
    const pos={};
    b.forEach((n,i)=>{ const y=ys[i]; pos[i]=[x1,y]; L1+=ln(x0+46,270,x1-46,y,n.p,0)+node(x1,y,n.l,0);
      const ch=n.c||[]; const cys= ch.length? spread(ch.length, y-45*(ch.length-1), y+45*(ch.length-1)) : [];
      ch.forEach((c,j)=>{ const cy=cys[j]; pos[i+"-"+j]=[x2,cy]; L2+=ln(x1+46,y,x2-46,cy,c.p,1)+node(x2,cy,c.l,1); if(c.r) L3+=tx(x3,cy+8,c.r,{fs:24,fill:SC.warm,mono:true,w:600,s:2}); }); });
    const root=node(x0,270,v.root||"",0);
    const hls=(v.steps||[]).map((s,k)=>{ let g=""; (s.hl||[]).forEach(path=>{ const [i,j]=path; const [xa,ya]=pos[i]; g+=`<line x1="${x0+46}" y1="270" x2="${xa-46}" y2="${ya}" stroke="${SC.warm}" stroke-width="7" stroke-linecap="round" opacity=".9"/>`; if(j!=null){ const [xb,yb]=pos[i+"-"+j]; g+=`<line x1="${xa+46}" y1="${ya}" x2="${xb-46}" y2="${yb}" stroke="${SC.warm}" stroke-width="7" stroke-linecap="round" opacity=".9"/>`; } });
      return `<g data-only data-s="${3+k}">${g}${s.label?tx(480,522,s.label,{fs:26,anchor:"middle",fill:SC.warm,mono:true,w:600}):""}</g>`; }).join("");
    return svgo(hls+L1+L2+root+L3); },
  urn(v){ const cmap={R:SC.red,B:SC.acc,G:SC.good,Y:SC.warm,W:SC.fg,K:SC.mut}; const balls=[...v.balls];
    const steps=v.steps||[{drawn:[],label:""}];
    const draw=(drawn)=>{ let s=`<rect x="70" y="80" width="420" height="380" rx="18" fill="${SC.pane}" stroke="${SC.line}" stroke-width="2"/>`; let k=0;
      balls.forEach((b,i)=>{ if(drawn.includes(i)) return; const col=k%5,row=Math.floor(k/5); s+=`<circle cx="${120+col*80}" cy="${140+row*80}" r="28" fill="${cmap[b]||SC.fg}"/>`; k++; });
      drawn.forEach((i,j)=>{ s+=`<circle cx="${600+j*100}" cy="200" r="28" fill="${cmap[balls[i]]||SC.fg}"/>`+tx(600+j*100,260,(j+1)+".",{fs:22,anchor:"middle",fill:SC.mut,mono:true}); });
      if(drawn.length) s+=tx(560,120,"Çekilenler",{fs:22,fill:SC.mut}); return s; };
    return svgo(steps.map((s,i)=>`<g data-only data-s="${i}">${draw(s.drawn||[])}${s.label?tx(480,522,s.label,{fs:26,anchor:"middle",fill:SC.warm,mono:true,w:600}):""}</g>`).join("")); },
  slots(v){ const n=v.vals.length, w=130, gap=90; const tot=n*w+(n-1)*gap; const x0=(960-tot)/2; let s=v.h?tx(480,70,v.h,{fs:26,anchor:"middle",w:600}):"";
    v.vals.forEach((val,i)=>{ const x=x0+i*(w+gap); s+=`<rect x="${x}" y="190" width="${w}" height="110" rx="12" fill="${SC.pane}" stroke="${SC.line}" stroke-width="2"/>`;
      s+=`<g data-s="${i}">${tx(x+w/2,262,String(val),{fs:48,anchor:"middle",fill:SC.warm,mono:true,w:600})}</g>`;
      if(v.labels&&v.labels[i]) s+=tx(x+w/2,335,v.labels[i],{fs:20,anchor:"middle",fill:SC.mut});
      if(i>0) s+=`<g data-s="${i}">${tx(x-gap/2,262,v.op||"×",{fs:44,anchor:"middle",fill:SC.mut})}</g>`; });
    if(v.total) s+=`<g data-s="${n}">${tx(480,440,"= "+v.total,{fs:40,anchor:"middle",fill:SC.good,mono:true,w:600})}${v.totalLabel?tx(480,485,v.totalLabel,{fs:22,anchor:"middle",fill:SC.mut}):""}</g>`;
    return svgo(s); },
  system(v){ const blocks=v.blocks; const bwid=150, gap=70; const tot=blocks.length*bwid+(blocks.length-1)*gap; let x=(960-tot)/2; const cy=230; let s=`<line x1="${x-60}" y1="${cy}" x2="${x}" y2="${cy}" stroke="${SC.fg}" stroke-width="3"/>`+tx(x-70,cy+8,"●",{fs:20,anchor:"end",fill:SC.fg});
    const comp=(cx,cyy,c)=>`<rect x="${cx-55}" y="${cyy-30}" width="110" height="60" rx="10" fill="${SC.pane}" stroke="${SC.acc}" stroke-width="2.5"/>`+tx(cx,cyy-2,c.l,{fs:24,anchor:"middle",w:700})+tx(cx,cyy+22,"p = "+c.p,{fs:17,anchor:"middle",fill:SC.mut,mono:true});
    blocks.forEach((bl,k)=>{ const comps=bl.c; const cx=x+bwid/2;
      if(comps.length===1){ s+=`<line x1="${x}" y1="${cy}" x2="${cx-55}" y2="${cy}" stroke="${SC.fg}" stroke-width="3"/>`+comp(cx,cy,comps[0])+`<line x1="${cx+55}" y1="${cy}" x2="${x+bwid}" y2="${cy}" stroke="${SC.fg}" stroke-width="3"/>`; }
      else { const ys=spread(comps.length, cy-45*(comps.length-1), cy+45*(comps.length-1)); const xl=x+20, xr=x+bwid-20;
        s+=`<line x1="${x}" y1="${cy}" x2="${xl}" y2="${cy}" stroke="${SC.fg}" stroke-width="3"/><line x1="${xl}" y1="${ys[0]}" x2="${xl}" y2="${ys[ys.length-1]}" stroke="${SC.fg}" stroke-width="3"/><line x1="${xr}" y1="${ys[0]}" x2="${xr}" y2="${ys[ys.length-1]}" stroke="${SC.fg}" stroke-width="3"/><line x1="${xr}" y1="${cy}" x2="${x+bwid}" y2="${cy}" stroke="${SC.fg}" stroke-width="3"/>`;
        comps.forEach((c,j)=>{ s+=`<line x1="${xl}" y1="${ys[j]}" x2="${cx-55}" y2="${ys[j]}" stroke="${SC.fg}" stroke-width="3"/>`+comp(cx,ys[j],c)+`<line x1="${cx+55}" y1="${ys[j]}" x2="${xr}" y2="${ys[j]}" stroke="${SC.fg}" stroke-width="3"/>`; }); }
      x+=bwid+gap; });
    s+=`<line x1="${x-gap}" y1="${cy}" x2="${x-gap+60}" y2="${cy}" stroke="${SC.fg}" stroke-width="3"/>`+tx(x-gap+70,cy+8,"●",{fs:20,fill:SC.fg});
    (v.steps||[]).forEach((l,k)=>{ s+=tx(480,400+k*40,l,{fs:24,anchor:"middle",fill:k===(v.steps.length-1)?SC.good:SC.warm,mono:true,w:600,s:1+k}); });
    return svgo(s); },
  trials(v){ const seq=[...v.seq], n=seq.length; const w=78, gap=16; const x0=(960-(n*w+(n-1)*gap))/2; let s=v.h?tx(480,60,v.h,{fs:26,anchor:"middle",w:600}):"";
    seq.forEach((c,i)=>{ const x=x0+i*(w+gap); const col=c==="S"?SC.good:SC.red; s+=`<g data-s="${i}"><rect x="${x}" y="120" width="${w}" height="${w}" rx="12" fill="${col}" fill-opacity=".25" stroke="${col}" stroke-width="3"/>${tx(x+w/2,120+w/2+14,c,{fs:40,anchor:"middle",fill:col,w:700})}${tx(x+w/2,235,String(i+1),{fs:18,anchor:"middle",fill:SC.mut,mono:true})}</g>`; });
    (v.steps||[]).forEach((l,k)=>{ s+=tx(480,310+k*48,l,{fs:26,anchor:"middle",fill:k===v.steps.length-1?SC.good:SC.warm,mono:true,w:600,s:n+k}); });
    return svgo(s); },
  curve(v){ const [xa,xb]=v.xr; const f=fnOf(v); const N=400; const pts=[]; let ymax=0; for(let i=0;i<=N;i++){const x=xa+(xb-xa)*i/N; const y=f(x); pts.push([x,y]); if(y>ymax) ymax=y;} ymax=(v.ymax||ymax)*1.15||1;
    const px0=100,px1=900,py0=420,py1=70; const X=x=>px0+(x-xa)/(xb-xa)*(px1-px0); const Y=y=>py0-(y/ymax)*(py0-py1);
    let s=`<line x1="${px0}" y1="${py0}" x2="${px1}" y2="${py0}" stroke="${SC.line}" stroke-width="2"/><line x1="${px0}" y1="${py0}" x2="${px0}" y2="${py1}" stroke="${SC.line}" stroke-width="2"/>`;
    const ticks=v.ticks||spread(5,xa,xb); ticks.forEach(t=>{ s+=`<line x1="${X(t)}" y1="${py0}" x2="${X(t)}" y2="${py0+8}" stroke="${SC.mut}"/>`+tx(X(t),py0+34,fmt(t,2),{fs:20,anchor:"middle",fill:SC.mut,mono:true}); });
    s+=tx(px1,py0+34,v.xlabel||"x",{fs:22,anchor:"end",fill:SC.mut,mono:true})+tx(px0-14,py1-14,v.ylabel||"f(x)",{fs:22,anchor:"end",fill:SC.mut,mono:true});
    const path="M"+pts.map(([x,y])=>`${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" L");
    (v.steps||[]).forEach((st,k)=>{ let g=""; if(st.shade){ const [a,b]=st.shade; const sub=pts.filter(([x])=>x>=a-1e-9&&x<=b+1e-9); if(sub.length){ const col=COL[st.col||"acc"]; g+=`<polygon points="${X(sub[0][0])},${py0} ${sub.map(([x,y])=>`${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ")} ${X(sub[sub.length-1][0])},${py0}" fill="${col}" fill-opacity=".45"/>`; } }
      (st.marks||[]).forEach(mk=>{ g+=`<line x1="${X(mk.x)}" y1="${py0}" x2="${X(mk.x)}" y2="${py1+10}" stroke="${SC.warm}" stroke-dasharray="6 6" stroke-width="2"/>`+tx(X(mk.x),py1,mk.label,{fs:22,anchor:"middle",fill:SC.warm,mono:true}); });
      s+=`<g data-only data-s="${k}">${g}${st.label?tx(480,500,st.label,{fs:26,anchor:"middle",fill:SC.warm,mono:true,w:600}):""}</g>`; });
    s+=`<path d="${path}" fill="none" stroke="${SC.fg}" stroke-width="3.5"/>`;
    if(v.h) s+=tx(480,40,v.h,{fs:24,anchor:"middle",w:600});
    return svgo(s); },
  think(v){ return `<div class="v-think"><div class="th-k">Düşünme zamanı · ${v.secs||10} saniye</div><div class="th-q">${mi(v.q)}</div>${v.parts?`<ol class="th-p">${v.parts.map(p=>`<li>${mi(p)}</li>`).join("")}</ol>`:""}<div class="th-cd"><svg viewBox="0 0 100 100"><circle class="bgc" cx="50" cy="50" r="44"/><circle class="fgc" cx="50" cy="50" r="44"/></svg><span class="th-n">${v.secs||10}</span></div></div>`; },
  events(v){ const px0=100,px1=860,cy=200; let s=`<line x1="${px0}" y1="${cy}" x2="${px1}" y2="${cy}" stroke="${SC.fg}" stroke-width="3"/>`;
    [0,0.25,0.5,0.75,1].forEach(f=>{const x=px0+f*(px1-px0); s+=`<line x1="${x}" y1="${cy-10}" x2="${x}" y2="${cy+10}" stroke="${SC.mut}" stroke-width="2"/>`;});
    s+=tx(px0,cy+42,v.t0||"0",{fs:20,anchor:"middle",fill:SC.mut,mono:true})+tx(px1,cy+42,v.t1||"T",{fs:20,anchor:"middle",fill:SC.mut,mono:true});
    if(v.h) s+=tx(480,60,v.h,{fs:26,anchor:"middle",w:600});
    s+=`<g data-s="0">${v.times.map((t,i)=>`<circle cx="${px0+t*(px1-px0)}" cy="${cy}" r="11" fill="${SC.warm}"><animate attributeName="r" from="0" to="11" dur=".4s" begin="${i*0.15}s" fill="freeze"/></circle>`).join("")}</g>`;
    (v.steps||[]).forEach((l,k)=>{ s+=tx(480,310+k*46,l,{fs:25,anchor:"middle",fill:k===v.steps.length-1?SC.good:SC.warm,mono:true,w:600,s:1+k}); });
    return svgo(s); },
  scatter(v){ const px0=120,px1=880,py0=430,py1=80; const xs=v.pts.map(p=>p[0]), ys=v.pts.map(p=>p[1]); const xa=Math.min(...xs)-1,xb=Math.max(...xs)+1,ya=Math.min(...ys)-1,yb=Math.max(...ys)+1; const X=x=>px0+(x-xa)/(xb-xa)*(px1-px0), Y=y=>py0-(y-ya)/(yb-ya)*(py0-py1);
    let s=`<line x1="${px0}" y1="${py0}" x2="${px1}" y2="${py0}" stroke="${SC.line}" stroke-width="2"/><line x1="${px0}" y1="${py0}" x2="${px0}" y2="${py1}" stroke="${SC.line}" stroke-width="2"/>`+tx(px1,py0+34,v.xlabel||"x",{fs:22,anchor:"end",fill:SC.mut,mono:true})+tx(px0-14,py1-14,v.ylabel||"y",{fs:22,anchor:"end",fill:SC.mut,mono:true});
    s+=`<g data-s="0">${v.pts.map(([x,y])=>`<circle cx="${X(x)}" cy="${Y(y)}" r="10" fill="${SC.acc}" fill-opacity=".85"/>`).join("")}</g>`;
    if(v.trend){ const [x1,y1,x2,y2]=v.trend; s+=`<line data-s="1" x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${SC.warm}" stroke-width="4" stroke-dasharray="10 8"/>`; }
    if(v.h) s+=tx(480,42,v.h,{fs:24,anchor:"middle",w:600});
    (v.steps||[]).forEach((l,k)=>{ s+=tx(480,500,l,{fs:26,anchor:"middle",fill:SC.warm,mono:true,w:600,s:2+k,only:true}); });
    return svgo(s); },
  end(v){ return `<div class="v-end"><div class="vt-k" style="font-size:1.6cqw;color:var(--stage-acc);letter-spacing:.14em;text-transform:uppercase;font-weight:600">Video tamamlandı</div><h2>${esc(v.title)}</h2><div class="row"><button type="button" data-end="replay">↻ Baştan izle</button>${v.next?`<button type="button" class="g" data-end="next">Sonraki konu: ${esc(v.next)} →</button>`:""}</div></div>`; }
};

/* ---------- Player ---------- */
const P = { tid:null, i:0, step:-1, playing:false, gen:0, voice:true, rate:1, tts:null, cd:null, waiters:new Set(), sc:null, lineCb:false };
const est = t => Math.max(2.2, t.length/13.5);
const wait = ms => new Promise(res=>{ const id=setTimeout(()=>{P.waiters.delete(res); res();}, ms); res._id=id; P.waiters.add(res); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ const pl=document.getElementById("vplayer"); if(pl&&pl.classList.contains("full")){ pl.classList.remove("full"); document.body.style.overflow=""; const f=document.getElementById("vFull"); if(f) f.textContent="⛶"; } } });
function stopAll(){ document.body.style.overflow=""; if(P.audio){ try{ P.audio.pause(); }catch(e){} } P.gen++; P.playing=false; if(P.tts){ try{ P.tts.stop(); }catch(e){} } if(P.cd){ clearInterval(P.cd); P.cd=null; } P.waiters.forEach(r=>{ clearTimeout(r._id); r(); }); P.waiters.clear(); updateControls(); }
function secOf(spec,i){ let s=""; for(let k=0;k<=i;k++) if(spec.sc[k].h) s=spec.sc[k].h; return s; }
function defaultHold(sc){ return ({cards:4.5,formula:4,compare:3.5,table:3,title:1.5,think:0.3})[sc.v.type] ?? 2.6; }
var openVideo_=0;
function openVideo(tid){ stopAll(); P.tid=tid; P.i=0; P.step=-1; renderPbar(); loadScene(0); bindPlayer(); }
function loadScene(i){ const spec=V[P.tid]; P.i=i; P.step=-1; const sc=spec.sc[i]; P.sc=sc;
  const stage=$("#stage"); if(!stage) return;
  stage.innerHTML=`<div class="sc-head"><span>${esc(secOf(spec,i))}</span><span>${i+1}/${spec.sc.length} · ${esc(sc.t)}</span></div><div class="v">${(R[sc.v.type]||R.text)(sc.v)}</div>`;
  setStep(-1); renderCap(sc,-1); updateControls(); }
function setStep(n){ const st=$("#stage"); if(!st) return; const groups=new Map();
  st.querySelectorAll("[data-s]").forEach(el=>{ const k=+el.dataset.s; if(el.hasAttribute("data-only")){ const key=el.parentNode; if(!groups.has(key)) groups.set(key,[]); groups.get(key).push([k,el]); } else el.classList.toggle("on", k<=n); });
  groups.forEach(list=>{ const max=Math.max(...list.map(x=>x[0])); list.forEach(([k,el])=>el.classList.toggle("on", n>=99 ? k===max : k===n)); }); }
function reveal(k){ P.step=k; setStep(k); renderCap(P.sc,k); }
function renderCap(sc,k){ const c=$("#cap"); if(!c) return; const b=sc.b||[]; c.innerHTML=b.map((t,i)=>`<p class="${i<k?"past":i===k?"now":"next"}">${esc(t)}</p>`).join("")||"<p class='next'>—</p>"; }
function renderPbar(){ const spec=V[P.tid]; const pb=$("#pbar"); if(!pb) return; pb.innerHTML=spec.sc.map((s,i)=>`<button class="seg${s.h&&i?" secstart":""}" data-i="${i}" type="button" title="${esc((i+1)+". "+s.t)}"></button>`).join(""); }
function updateControls(){ const spec=V[P.tid]; if(!spec) return; const pb=$("#pbar"); if(pb) pb.querySelectorAll(".seg").forEach(el=>{ const i=+el.dataset.i; el.classList.toggle("done",i<P.i); el.classList.toggle("cur",i===P.i); });
  const pl=$("#vPlay"); if(pl) pl.textContent = P.playing ? "⏸ Duraklat" : (P.i===0&&P.step<0 ? "▶ Oynat" : "▶ Devam");
  const si=$("#scInfo"); if(si) si.textContent=`Sahne ${P.i+1}/${spec.sc.length}${P.tts?"":" · sessiz mod"}`;
  const vb=$("#vVoice"); if(vb){ vb.hidden=!P.tts; vb.classList.toggle("on",P.voice); vb.textContent=P.voice?"🔊 Sesli":"🔇 Sessiz"; } }
function note(t){ const n=$("#vnote"); if(n) n.textContent=t; }
async function play(){ if(P.playing) return; const spec=V[P.tid]; if(!spec) return; P.playing=true; const gen=++P.gen; updateControls(); note("");
  while(P.playing && gen===P.gen){
    const sc=spec.sc[P.i]; const ok=await runScene(sc,gen); if(!ok) return;
    if(P.i<spec.sc.length-1){ loadScene(P.i+1); } else { P.playing=false; showEnd(); updateControls(); return; }
  } }
function playAudio(sc,gen,from){ const a=(AUD[P.tid]||[])[P.i]; if(!a) return Promise.resolve(null);
  return new Promise(res=>{ const el=P.audio||(P.audio=new Audio()); el.preload="auto"; const src="audio/"+P.tid+"/"+String(P.i).padStart(2,"0")+".mp3";
    let settled=false; const fin=v=>{ if(settled) return; settled=true; el.ontimeupdate=el.onended=el.onerror=null; res(v); };
    if(!el.src.endsWith(src)) el.src=src; el.playbackRate=P.rate;
    const go=()=>{ try{ el.currentTime=a.s[from]||0; }catch(e){} el.play().then(()=>{}).catch(()=>fin(null)); };
    el.ontimeupdate=()=>{ if(gen!==P.gen){ el.pause(); return fin(false); } let k=0; for(let j=0;j<a.s.length;j++) if(el.currentTime+0.05>=a.s[j]) k=j; if(k!==P.step && k>=from) reveal(k); };
    el.onended=()=>fin(gen===P.gen); el.onerror=()=>fin(null);
    if(el.readyState>=1) go(); else el.onloadedmetadata=()=>{ el.onloadedmetadata=null; go(); };
    P.audioGen=gen; });
}
async function runScene(sc,gen){ const beats=sc.b||[]; let from=P.step+1;
  if(from<beats.length && P.voice){ const r=await playAudio(sc,gen,from); if(r===false||gen!==P.gen) return false; if(r===true){ from=beats.length; } }
  if(from<beats.length){
    if(P.voice && P.tts){
      const lines=beats.slice(from).map((t,k)=>({text:t,id:String(from+k),language:"tr"}));
      try{ await P.tts.speak(lines,{rate:P.rate,voice:"rounded"}); }
      catch(e){ if(gen!==P.gen) return false; const code=e&&e.code; if(code==="not_granted"){ P.voice=false; note("Sesli anlatım kapalı; sessiz modda devam ediliyor."); } else if(code!=="viewer_stopped"&&code!=="cancelled"){ note("Ses şu an kullanılamıyor ("+(code||"hata")+"); sessiz modda devam ediliyor."); P.voice=false; } updateControls(); if(!(await runTimed(beats,gen,Math.max(0,P.step+1)))) return false; }
    } else if(!(await runTimed(beats,gen,from))) return false;
  }
  if(gen!==P.gen) return false;
  setStep(99); renderCap(sc,99); P.step=beats.length;
  if(sc.v.type==="think"){ if(!(await countdown(sc.v.secs||10,gen))) return false; }
  await wait((sc.hold??defaultHold(sc))*1000); return gen===P.gen; }
async function runTimed(beats,gen,from){ for(let k=from;k<beats.length;k++){ if(gen!==P.gen) return false; reveal(k); await wait(est(beats[k])/P.rate*1000); } return gen===P.gen; }
function countdown(secs,gen){ return new Promise(res=>{ let left=secs; const n=$("#stage .th-n"), c=$("#stage .fgc"); const circ=2*Math.PI*44; if(c){ c.style.strokeDasharray=circ; c.style.strokeDashoffset=0; }
  const tick=()=>{ if(gen!==P.gen){ clearInterval(P.cd); P.cd=null; return res(false); } if(n) n.textContent=left; if(c) c.style.strokeDashoffset=circ*(1-left/secs); if(left<=0){ clearInterval(P.cd); P.cd=null; return res(true); } left--; };
  tick(); P.cd=setInterval(tick,1000); }); }
function pause(){ const wasBeats = P.step < (P.sc?.b||[]).length; stopAll(); if(wasBeats) P.step=Math.max(-1,P.step-1); updateControls(); }
function showEnd(){ const spec=V[P.tid]; const st=$("#stage"); if(!st) return; const next=T[cur+1]; st.innerHTML=`<div class="v">${R.end({title:T[cur].title,next:next?next.title:null})}</div>`; renderCap({b:[]},99); P.step=99; }
function bindPlayer(){ const pl=$("#vplayer"); if(!pl||pl.dataset.bound) return; pl.dataset.bound="1";
  $("#vPlay").addEventListener("click",()=>{ if(P.playing) pause(); else { if(P.step===99||!$("#stage .v")) loadScene(0); play(); } });
  $("#vPrev").addEventListener("click",()=>{ const wasP=P.playing; stopAll(); loadScene(Math.max(0,P.i-1)); if(wasP) play(); });
  $("#vNext").addEventListener("click",()=>{ const spec=V[P.tid]; const wasP=P.playing; stopAll(); if(P.i<spec.sc.length-1){ loadScene(P.i+1); if(wasP) play(); } else { showEnd(); updateControls(); } });
  $("#pbar").addEventListener("click",e=>{ const s=e.target.closest(".seg"); if(!s) return; const wasP=P.playing; stopAll(); loadScene(+s.dataset.i); if(wasP) play(); });
  $("#vVoice").addEventListener("click",()=>{ P.voice=!P.voice; LS.set("voice",P.voice); if(!P.voice && P.tts){ try{P.tts.stop();}catch(e){} } updateControls(); if(P.playing){ const st=P.step; stopAll(); P.step=st; play(); } });
  const toggleFull=()=>{ const pl=$("#vplayer"); if(!pl) return; const on=!pl.classList.contains("full"); pl.classList.toggle("full",on); document.body.style.overflow=on?"hidden":""; $("#vFull").textContent=on?"⤡":"⛶"; };
  $("#vFull").addEventListener("click",toggleFull); $("#vClose").addEventListener("click",toggleFull);
  $("#vRate").addEventListener("change",e=>{ P.rate=+e.target.value; if(P.audio) P.audio.playbackRate=P.rate; if(P.tts){ try{ P.tts.setRate(P.rate); }catch(err){} } });
  $("#stage").addEventListener("click",e=>{ const b=e.target.closest("[data-end]"); if(!b) return; const a=b.dataset.end; if(a==="replay"){ loadScene(0); play(); } else if(a==="script"){ tab="senaryo"; LS.set("tab",tab); renderLesson(); } else if(a==="next"){ go(cur+1); } });
  $("#stage").addEventListener("keydown",e=>{ if(e.key===" "){ e.preventDefault(); $("#vPlay").click(); } else if(e.key==="ArrowRight"){ $("#vNext").click(); } else if(e.key==="ArrowLeft"){ $("#vPrev").click(); } });
  P.voice = LS.get("voice", true); $("#vRate").value=String(P.rate); updateControls(); }

/* ---------- Script / lecture-note view ---------- */
const TYPE_TR = {title:"Başlık kartı",text:"Madde kartı",formula:"Formül kartları",cards:"Özet kartı",steps:"Adım adım çözüm",compare:"Karşılaştırma tablosu (yanlış / doğru)",table:"Tablo",list:"Sonuç listesi (kutucuklar)",venn:"Venn diyagramı",grid:"6×6 sonuç ızgarası (iki zar)",bar:"Çubuk grafik",stair:"Merdiven grafik (CDF)",tree:"Ağaç diyagramı",urn:"Kutu ve toplar",slots:"Sayma kutuları (çarpma kuralı)",system:"Sistem güvenilirlik şeması",trials:"Deneme dizisi",curve:"Yoğunluk eğrisi ve alan",think:"Soru kartı + geri sayım",events:"Zaman çizelgesi",scatter:"Saçılım grafiği"};
function sceneSec(sc){ const b=sc.b||[]; return b.reduce((a,t)=>a+est(t),0)+(sc.hold??defaultHold(sc))+(sc.v.type==="think"?(sc.v.secs||10):0); }
function strings(v){ const out=[]; const skip=new Set(["type","mode","rule","fn","col","layout","cell","kind","balls","seq","k","xr","dom","coef","p","ticks","hl","cells","drawn","times","pts","trend","x","y","frames","F","ymax","dec","marker","shade","marks","secs","bad","all","col","rlabel","clabel","xlabel","ylabel","t0","t1","op"]);
  (function walk(o,key){ if(typeof o==="string"){ if(o.trim()) out.push(o); } else if(Array.isArray(o)) o.forEach(x=>walk(x,key)); else if(o&&typeof o==="object") Object.entries(o).forEach(([k,x])=>{ if(!skip.has(k)) walk(x,k); }); })(v);
  return [...new Set(out)].slice(0,16); }
function animNotes(sc){ const v=sc.v, n=(sc.b||[]).length; const g=(i,what)=>`Seslendirme ${i+1} ile: ${what}`; const list=[];
  const add=(arr,fmtf)=>arr.forEach((x,i)=>list.push(g(i,fmtf(x,i))));
  switch(v.type){
    case "title": list.push(g(0,"başlık belirir"), g(1,"alt başlık ve etiketler belirir")); break;
    case "text": add(v.items,(x,i)=>`${i+1}. madde soldan kayarak belirir`); break;
    case "formula": add(v.lines,(l)=>`“${l[0]}” kartı belirir, altında açıklaması`); break;
    case "cards": add(v.items,(x,i)=>`özet maddesi ${i+1} belirir`); break;
    case "steps": add(v.lines,(x,i)=>`çözüm adımı ${i+1} belirir`); break;
    case "compare": list.push(g(0,"sol sütun belirir"),g(1,"sağ sütun belirir"),g(2,"alt kural cümlesi belirir")); break;
    case "table": add(v.rows,(r,i)=>`tablo satırı ${i+1} (${r[0]}) belirir`); break;
    case "list": (v.steps||[{label:v.label}]).forEach((s,i)=>list.push(g(i,i===0&&!v.steps?"kutucuklar belirir":`${(s.hl||[]).length?"vurgulanan kutucuklar değişir, ":""}etiket: “${s.label||""}”`))); break;
    case "venn": add(v.steps,(s)=>`boyalı bölge: ${s.mode} — “${s.label}”`); break;
    case "grid": add(v.steps,(s)=>`vurgulanan hücreler: ${s.rule||"liste"} — “${s.label}”`); break;
    case "bar": if(v.frames) add(v.frames,(f,i)=>`grafik ${i+1}. duruma geçer${v.flabels?" ("+v.flabels[i]+")":""}`); else add(v.y,(y,i)=>`“${v.x[i]}” çubuğu aşağıdan yukarı büyür (${y})`); break;
    case "stair": add(v.x,(x,i)=>`x = ${x} noktasında sıçrama ve yatay basamak çizilir (F = ${v.F[i]})`); break;
    case "tree": list.push(g(0,"kök ve 1. seviye dallar"),g(1,"2. seviye dallar"),g(2,"uçlardaki çarpım sonuçları")); (v.steps||[]).forEach((s,i)=>list.push(g(3+i,`yol vurgulanır — “${s.label}”`))); break;
    case "urn": add(v.steps,(s)=>`${(s.drawn||[]).length} top çekilmiş görünür — “${s.label}”`); break;
    case "slots": add(v.vals,(x,i)=>`${i+1}. kutuya ${x} yazılır`); list.push(g(v.vals.length,`çarpım sonucu “${v.total}”`)); break;
    case "system": list.push(g(0,"blok şeması çizilir")); add(v.steps||[],(l,i)=>`formül satırı: ${l}`); break;
    case "trials": add([...v.seq],(c,i)=>`${i+1}. deneme kutusu (${c}) belirir`); (v.steps||[]).forEach((l,i)=>list.push(g(v.seq.length+i,`satır: ${l}`))); break;
    case "curve": add(v.steps,(s)=>`${s.shade?`[${s.shade[0]}, ${s.shade[1]}] aralığı boyanır`:"işaretler belirir"} — “${s.label||""}”`); break;
    case "think": list.push("Soru ve şıklar ekranda; seslendirme bitince 10 saniyelik geri sayım halkası çalışır."); break;
    case "events": list.push(g(0,"olay noktaları zaman çizgisine sırayla düşer")); add(v.steps||[],(l)=>`satır: ${l}`); break;
    case "scatter": list.push(g(0,"noktalar belirir"),g(1,"eğilim çizgisi")); add(v.steps||[],(l)=>`etiket: ${l}`); break;
  }
  return list.slice(0,Math.max(n,1)+2); }
function renderScript(spec,t){ const total=spec.sc.reduce((a,s)=>a+sceneSec(s),0); const mins=Math.round(total/60);
  let h=`<div class="hed"><h3 style="margin:0">Video senaryosu ve sahne planı</h3><span class="pill en">${mins} dk</span></div>`;
  h+=`<section><h3>1. Video künyesi</h3><dl class="kunye"><dt>Konu</dt><dd>${esc(spec.k.konu||t.title)} (${esc(t.en)})</dd><dt>Ders</dt><dd>END252E Olasılık (İTÜ Endüstri Mühendisliği)</dd><dt>Ön bilgi</dt><dd>${esc(spec.k.on)}</dd><dt>Tahmini süre</dt><dd>≈ ${mins} dakika (bilgi amaçlı; ${spec.sc.length} sahne)</dd></dl></section>`;
  h+=`<section><h3>2. Öğrenme hedefleri</h3><p style="margin:0 0 6px;font-size:.9rem;color:var(--muted)">Video sonunda şunları yapabilmelisin:</p><ol style="margin:0;padding-left:20px">${spec.h.map(x=>`<li>${mi(x)}</li>`).join("")}</ol></section>`;
  h+=`<section><h3>3. Sahne planı</h3><div style="display:grid;gap:10px">`;
  spec.sc.forEach((sc,i)=>{ if(sc.h) h+=`<div class="sec-h">${esc(sc.h)}</div>`; const secs=Math.round(sceneSec(sc));
    h+=`<div class="scene"><div class="sh"><b>Sahne ${i+1}</b><span>${esc(sc.t)}</span><span class="dur">~${secs} sn</span>${sc.v.type==="cards"?`<span class="pill done">Özet kartı</span>`:""}${sc.v.type==="think"?`<span class="pill done">10 sn düşünme</span>`:""}</div>
      <div><div class="lab">Ekranda görünecek görsel</div><p><b>${esc(TYPE_TR[sc.v.type]||sc.v.type)}.</b> ${esc(sc.d||"")}</p></div>
      <div><div class="lab">Animasyon hareketleri</div><ul>${animNotes(sc).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
      <div><div class="lab">Seslendirme metni</div>${(sc.b||[]).map(x=>`<p>${esc(x)}</p>`).join("")}</div>
      <div><div class="lab">Ekrandaki metin, formül ve etiketler</div><div class="os">${strings(sc.v).map(x=>`<span>${esc(x)}</span>`).join("")}</div></div></div>`; });
  h+=`</div></section>`;
  const cards=spec.sc.filter(s=>s.v.type==="cards");
  h+=`<section><h3>4. Ara özet kartları</h3><div style="display:grid;gap:10px">${cards.map((s,i)=>`<div class="scene"><div class="sh"><b>${esc(s.v.h||"Özet kartı")}</b><span class="dur">${esc(s.h||"")}</span></div><ul>${s.v.items.map(x=>`<li>${mi(x)}</li>`).join("")}</ul></div>`).join("")}</div></section>`;
  const sonuc=spec.sc.find(s=>s.h==="Sonuç ve tekrar"); if(sonuc) h+=`<section><h3>5. Sonuç ve tekrar</h3><ul style="margin:0;padding-left:20px">${sonuc.v.items.map(x=>`<li>${mi(x)}</li>`).join("")}</ul></section>`;
  const exs=spec.sc.filter(s=>s.h==="Örnekler"||/örnek/i.test(s.t));
  h+=`<section><h3>6. Örnekler</h3><p style="margin:0;font-size:.9rem;color:var(--muted)">Basit örnek adım adım, zor örnek soru → 10 sn düşünme → yaygın yanlış yol → doğru çözüm sırasıyla sahne planının “Örnekler” bölümünde yer alır (Sahne ${exs.length?spec.sc.indexOf(exs[0])+1:"-"}–${exs.length?spec.sc.indexOf(exs[exs.length-1])+1:"-"}).</p></section>`;
  h+=`<section><div class="hed"><h3 style="margin:0">7. Ders notu şablonu</h3><button class="icon-btn" id="blankToggle" data-state="hidden" type="button">Cevapları göster</button></div><p style="margin:6px 0 8px;font-size:.9rem;color:var(--muted)">Videoyu izlerken boşlukları doldur. Boşluğa tıklamadan önce kendin yazmayı dene.</p><ol class="notes-t">${spec.not.map(l=>`<li>${esc(l).replace(/\{([^}]+)\}/g,(m,a)=>`<span class="blank hide">${a}</span>`)}</li>`).join("")}</ol></section>`;
  const kap=spec.sc.find(s=>s.h==="Kapanış"); if(kap) h+=`<section><h3>8. Kapanış</h3>${(kap.b||[]).map(x=>`<p style="margin:0 0 6px">${esc(x)}</p>`).join("")}</section>`;
  return h; }
