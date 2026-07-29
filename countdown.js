
(function(){
  function two(x){return (x<10?'0':'')+x;}
  var TIERS=['cd-past','cd-today','cd-1','cd-2','cd-3','cd-4','cd-5'];
  function tier(dl,now,days){
    if(dl<now)      return {cls:'cd-past', txt:'sona erdi', col:'#96A099'};
    if(days<=0)     return {cls:'cd-today',txt:'bugün '+two(dl.getHours())+':'+two(dl.getMinutes()), col:'#7E2A18'};
    if(days===1)    return {cls:'cd-1',    txt:'1 gün (yarın)', col:'#A4462F'};
    if(days<=3)     return {cls:'cd-2',    txt:days+' gün', col:'#C15B22'};
    if(days<=7)     return {cls:'cd-3',    txt:days+' gün', col:'#9E7A15'};
    if(days<=14)    return {cls:'cd-4',    txt:days+' gün', col:'#3F6F80'};
    return                 {cls:'cd-5',    txt:days+' gün', col:'#4B7355'};
  }
  function run(){
    var now=new Date(), today0=new Date(); today0.setHours(0,0,0,0);
    var min=null, minCol=null;
    var list=document.querySelectorAll('.cd-wrap[data-deadline]');
    for(var i=0;i<list.length;i++){
      var w=list[i], dl=new Date(w.getAttribute('data-deadline'));
      if(isNaN(dl)) continue;
      var d0=new Date(dl); d0.setHours(0,0,0,0);
      var days=Math.round((d0-today0)/86400000);
      var t=tier(dl,now,days);
      for(var k=0;k<TIERS.length;k++) w.classList.remove(TIERS[k]);
      w.classList.add(t.cls);
      var cd=w.querySelector('.cd'); if(cd) cd.textContent=t.txt;
      if(dl>=now && (min===null || days<min)){ min=days; minCol=t.col; }
    }
    var n=document.getElementById('nearest');
    if(n){ n.textContent=(min===null?'—':(min<=0?'bugün':min)); if(minCol) n.style.color=minCol; }
  }
  if(document.readyState!=='loading') run();
  else document.addEventListener('DOMContentLoaded',run);
  setInterval(run, 60000); // dakikada bir tazele (sayfa açık kalırsa)
})();
