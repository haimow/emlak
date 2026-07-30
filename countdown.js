
(function(){
  function two(x){return (x<10?'0':'')+x;}
  function pd(s){ if(!s) return null; var d=new Date(s); return isNaN(d)?null:d; }
  function fmt(d){ return two(d.getDate())+'.'+two(d.getMonth()+1)+'.'+d.getFullYear()+' '+two(d.getHours())+':'+two(d.getMinutes()); }
  function dayDiff(t, today0){ var d0=new Date(t); d0.setHours(0,0,0,0); return Math.round((d0-today0)/86400000); }
  var TIERS=['cd-past','cd-today','cd-1','cd-2','cd-3','cd-4','cd-5','cd-live'];
  function tier(days){
    if(days<=0)  return {cls:'cd-today',col:'#7E2A18'};
    if(days===1) return {cls:'cd-1',col:'#A4462F'};
    if(days<=3)  return {cls:'cd-2',col:'#C15B22'};
    if(days<=7)  return {cls:'cd-3',col:'#9E7A15'};
    if(days<=14) return {cls:'cd-4',col:'#3F6F80'};
    return            {cls:'cd-5',col:'#4B7355'};
  }
  // Ziyaret anına göre aktif artırmayı belirle
  function active(el, now){
    var d1s=pd(el.getAttribute('data-d1s')), d1e=pd(el.getAttribute('data-d1e')),
        d2s=pd(el.getAttribute('data-d2s')), d2e=pd(el.getAttribute('data-d2e'));
    if(!d1s){ var dl=pd(el.getAttribute('data-deadline')); if(dl){ d1s=dl; d1e=dl; } }
    if(!d1s) return null;
    if(!d1e) d1e=d1s;
    if(now <= d1e)      return {which:'1', start:d1s, end:d1e, second:false};
    if(d2s)             return {which:'2', start:d2s, end:(d2e||d2s), second:true};
    return                     {which:'ended', start:d1s, end:d1e, second:false};
  }
  function run(){
    var now=new Date(), today0=new Date(); today0.setHours(0,0,0,0);
    var min=null, minCol=null;
    // 1) Geri sayım rozetleri / metinleri
    var list=document.querySelectorAll('.cd-wrap');
    for(var i=0;i<list.length;i++){
      var w=list[i], a=active(w, now); if(!a) continue;
      var cls, col, label, ended=(a.which==='ended') || (now>a.end);
      if(ended){ cls='cd-past'; col='#96A099'; label='sona erdi'; }
      else if(now < a.start){
        var ds=dayDiff(a.start, today0), t=tier(ds); cls=t.cls; col=t.col;
        label = ds<=0 ? ('bugün '+two(a.start.getHours())+':'+two(a.start.getMinutes()))
              : (ds===1 ? '1 gün (yarın)' : ds+' gün');
      } else { // artırma sürüyor
        var de=dayDiff(a.end, today0), t2=tier(de<=0?0:de); cls='cd-live'; col=t2.col;
        label = de<=0 ? ('bugün '+two(a.end.getHours())+':'+two(a.end.getMinutes())+' bitiyor')
              : ('sürüyor · bitişe '+de+' gün');
      }
      for(var k=0;k<TIERS.length;k++) w.classList.remove(TIERS[k]);
      w.classList.add(cls);
      var cd=w.querySelector('.cd'); if(cd) cd.textContent=label;
      var cdd=w.querySelector('.cd-date'); if(cdd) cdd.textContent=fmt(a.start);
      // 2. artırmaya geçiş notu (fiyat bloğu / kart içindeki .cd-note)
      var host = w.closest ? (w.closest('.card')||w.closest('.dprice')||w.parentNode) : w.parentNode;
      if(host && host.querySelector){
        var note=host.querySelector('.cd-note');
        if(note){
          if(a.second && !ended){
            note.textContent = '\u21bb ' + (note.getAttribute('data-note') || 'İlk açık artırmaya teklif gelmediğinden 2. açık artırma tarihine geçilmiştir.');
            note.style.display='';
          } else { note.style.display='none'; }
        }
      }
      if(!ended){
        var ref = (now<a.start)?dayDiff(a.start,today0):dayDiff(a.end,today0);
        if(min===null || ref<min){ min=ref; minCol=col; }
      }
    }
    // 2) Artırma takvimi: aktif satırı vurgula
    var tabs=document.querySelectorAll('.wtable[data-d1s]');
    for(var q=0;q<tabs.length;q++){
      var tb=tabs[q], a2=active(tb, now); if(!a2) continue;
      var rows=tb.querySelectorAll('.wk');
      for(var r=0;r<rows.length;r++){
        var on = (!( (a2.which==='ended')||(now>a2.end) )) && (rows[r].getAttribute('data-win')===a2.which);
        rows[r].classList.toggle('wk-on', on);
      }
    }
    var n=document.getElementById('nearest');
    if(n){ n.textContent=(min===null?'—':(min<=0?'bugün':min)); if(minCol) n.style.color=minCol; }
  }
  if(document.readyState!=='loading') run();
  else document.addEventListener('DOMContentLoaded',run);
  setInterval(run, 60000);
})();
