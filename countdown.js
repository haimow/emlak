
(function(){
  function two(x){return (x<10?'0':'')+x;}
  function run(){
    var now=new Date(), today0=new Date(); today0.setHours(0,0,0,0);
    var min=null;
    var list=document.querySelectorAll('.cd-wrap[data-deadline]');
    for(var i=0;i<list.length;i++){
      var w=list[i], dl=new Date(w.getAttribute('data-deadline'));
      if(isNaN(dl)) continue;
      var d0=new Date(dl); d0.setHours(0,0,0,0);
      var days=Math.round((d0-today0)/86400000);
      var cd=w.querySelector('.cd'); var txt;
      w.classList.remove('is-urgent','is-past');
      if(dl<now){ txt='sona erdi'; w.classList.add('is-past'); }
      else if(days<=0){ txt='bugün '+two(dl.getHours())+':'+two(dl.getMinutes()); w.classList.add('is-urgent'); }
      else if(days===1){ txt='1 gün (yarın)'; w.classList.add('is-urgent'); }
      else { txt=days+' gün'; if(days<=7) w.classList.add('is-urgent'); }
      if(cd) cd.textContent=txt;
      if(dl>=now && (min===null || days<min)) min=days;
    }
    var n=document.getElementById('nearest');
    if(n) n.textContent=(min===null?'—':(min<=0?'bugün':min));
  }
  if(document.readyState!=='loading') run();
  else document.addEventListener('DOMContentLoaded',run);
  setInterval(run, 60000); // dakikada bir tazele (sayfa açık kalırsa)
})();
