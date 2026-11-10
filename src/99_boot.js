/* boot */
renderCut();
const hm = location.hash.match(/^#konu-(\d+)$/);
if(location.hash==="#test") go("test"); else go(hm ? +hm[1]-1 : 0);
renderLog();
(async()=>{
  try{ sample = window.claude ? await window.claude.use("sample") : null; }catch(e){ sample=null; }
  if(!sample) addSys("Not: Asistan sadece sayfa claude.ai içinde açıkken çalışır.");
})();

/* Browser speech fallback (GitHub Pages, Safari, etc.): Turkish voice via speechSynthesis */
function makeBrowserTTS(){
  const ss = window.speechSynthesis; if(!ss || typeof SpeechSynthesisUtterance==="undefined") return null;
  let lineCb=null, stateCb=null, rate=1, token=0;
  const FEM=/yelda|emel|filiz|seda|ayşe|ayse|zeynep|google türkçe|google turkish|female|kadın/i, MAL=/\bcem\b|tolga|ahmet|male|erkek/i;
  const trVoices=()=>ss.getVoices().filter(v=>/^tr(-|_|$)/i.test(v.lang));
  const score=v=>(/natural|neural|online|premium|enhanced|siri/i.test(v.name)?5:0)+(FEM.test(v.name)?3:0)-(MAL.test(v.name)?6:0)+(v.localService?0:1);
  const pickVoice=()=>{ let want=LS.get("voiceName",null); const vs=trVoices(); return vs.find(v=>v.name===want) || vs.sort((a,b)=>score(b)-score(a))[0] || null; };
  return {
    onLine(f){ lineCb=f; }, onState(f){ stateCb=f; },
    setRate(r){ rate=r; },
    stop(){ token++; try{ ss.cancel(); }catch(e){} stateCb&&stateCb({state:"idle",reason:"viewer_stopped"}); },
    speak(lines,opts){
      const my=++token; try{ ss.cancel(); }catch(e){}
      if(opts&&opts.rate) rate=opts.rate;
      return new Promise((resolve,reject)=>{
        let i=0;
        const next=()=>{
          if(my!==token) return reject({code:"viewer_stopped"});
          if(i>=lines.length){ stateCb&&stateCb({state:"idle",reason:"completed"}); return resolve(); }
          const ln=lines[i++]; const u=new SpeechSynthesisUtterance(ln.text);
          u.lang="tr-TR"; const v=pickVoice(); if(v) u.voice=v; u.rate=rate;
          u.onstart=()=>{ lineCb&&lineCb({line:ln,id:ln.id}); };
          u.onend=()=>next();
          u.onerror=ev=>{ if(my!==token) return reject({code:"viewer_stopped"}); reject({code:(ev&&ev.error==="not-allowed")?"not_granted":"error"}); };
          stateCb&&stateCb({state:"speaking"});
          try{ ss.speak(u); }catch(e){ reject({code:"error"}); }
        };
        next();
      });
    }
  };
}
(async()=>{
  let t=null;
  try{ t = window.claude ? await window.claude.use("tts") : null; }catch(e){ t=null; }
  if(!t){ t = makeBrowserTTS(); if(t){ try{ speechSynthesis.getVoices(); }catch(e){} P.browserTTS=true; } }
  P.tts = t;
  if(P.tts){
    try{ P.tts.onLine(({id})=>{ const k=+id; if(P.playing && !isNaN(k) && P.sc) reveal(k); }); }catch(e){}
    try{ P.tts.onState(({state,reason})=>{ if(state==="idle" && reason==="time_limit") note("Ses zaman sınırına takıldı; devam etmek için Oynat'a bas."); }); }catch(e){}
  } else { note("Bu tarayıcıda sesli anlatım yok; video altyazılı ve zamanlı olarak oynar."); }
  updateControls();
})();

