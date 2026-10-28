/* Neve caindo — leve, não atrapalha cliques e respeita "reduzir movimento" */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const cv=document.createElement('canvas');cv.id='neve';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);
  const x=cv.getContext('2d');let W,H,D,flocos=[],raf;
  const N=()=>Math.round(Math.min(90,Math.max(35,innerWidth/16)));
  function ajusta(){D=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;x.setTransform(D,0,0,D,0,0)}
  function novo(topo){return{x:Math.random()*W,y:topo?-10:Math.random()*H,r:1+Math.random()*2.6,v:.5+Math.random()*1.1,a:Math.random()*6.28,s:.008+Math.random()*.02,o:.55+Math.random()*.4}}
  function inicia(){ajusta();flocos=Array.from({length:N()},()=>novo(false))}
  function anima(){
    x.clearRect(0,0,W,H);
    for(const f of flocos){
      f.y+=f.v;f.a+=f.s;f.x+=Math.sin(f.a)*.6;
      if(f.y>H+10){Object.assign(f,novo(true))}
      if(f.x>W+10)f.x=-10;else if(f.x<-10)f.x=W+10;
      x.beginPath();x.fillStyle='rgba(255,255,255,'+f.o+')';x.strokeStyle='rgba(120,150,190,'+(f.o*.7)+')';x.lineWidth=.8;
      x.arc(f.x,f.y,f.r,0,6.283);x.fill();x.stroke();
    }
    raf=requestAnimationFrame(anima);
  }
  addEventListener('resize',()=>{ajusta();const n=N();while(flocos.length<n)flocos.push(novo(false));flocos.length=n});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else raf=requestAnimationFrame(anima)});
  inicia();anima();
})();
