/* boot */
renderCut();
const hm = location.hash.match(/^#konu-(\d+)$/);
go(hm ? +hm[1]-1 : 0);
renderLog();
(async()=>{
  try{ sample = window.claude ? await window.claude.use("sample") : null; }catch(e){ sample=null; }
  if(!sample) addSys("Not: Asistan sadece sayfa claude.ai içinde açıkken çalışır.");
})();
(async()=>{
  try{ P.tts = window.claude ? await window.claude.use("tts") : null; }catch(e){ P.tts=null; }
  if(P.tts){
    try{ P.tts.onLine(({id})=>{ const k=+id; if(P.playing && !isNaN(k) && P.sc) reveal(k); }); }catch(e){}
    try{ P.tts.onState(({state,reason})=>{ if(state==="idle" && reason==="time_limit") note("Ses zaman sınırına takıldı; devam etmek için Oynat'a bas."); }); }catch(e){}
  } else { note("Sesli anlatım bu tarayıcıda yok; video altyazılı ve zamanlı olarak oynar."); }
  updateControls();
})();
