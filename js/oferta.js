/* Contador da oferta — diário (até a meia-noite de Brasília) ou até a data de js/config.js (ofertaFim) */
(function(){
  const box=document.getElementById('oferta');if(!box)return;
  const fixo=Date.parse(window.CONFIG&&window.CONFIG.ofertaFim||'');
  const els={};box.querySelectorAll('[data-u]').forEach(e=>els[e.dataset.u]=e);
  const p=n=>String(n).padStart(2,'0');
  // fim do dia atual em Brasília (UTC-3)
  const fimDia=()=>{const b=new Date(Date.now()-3*36e5);return Date.UTC(b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()+1)+3*36e5-1000};
  let t;
  function tick(){
    const fim=fixo||fimDia(),ms=fim-Date.now();
    if(ms<=0){box.hidden=true;clearInterval(t);return}
    const s=Math.floor(ms/1000);
    els.h.textContent=p(Math.floor(s/3600));els.m.textContent=p(Math.floor(s%3600/60));els.s.textContent=p(s%60);
  }
  box.hidden=false;tick();t=setInterval(tick,1000);
})();
