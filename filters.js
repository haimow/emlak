
(function(){
  var cards=[].slice.call(document.querySelectorAll('.card'));
  var empty=document.getElementById('empty');
  var tipBtns=[].slice.call(document.querySelectorAll('.fbtn'));
  var drops=[].slice.call(document.querySelectorAll('.fdrop'));
  var state={tip:'all'};
  drops.forEach(function(d){ state[d.getAttribute('data-key')]=d.value||'all'; });
  function priceOk(v,r){
    if(r==='all') return true;
    var p=r.split('-'), min=+p[0], max=(p[1]===''?Infinity:+p[1]);
    return v>=min && v<max;
  }
  function apply(){
    var n=0;
    cards.forEach(function(c){
      var ok=true;
      if(state.tip!=='all' && c.getAttribute('data-tip')!==state.tip) ok=false;
      if(ok && state.city && state.city!=='all' && c.getAttribute('data-city')!==state.city) ok=false;
      if(ok && state.method && state.method!=='all' && c.getAttribute('data-method')!==state.method) ok=false;
      if(ok && state.price && state.price!=='all' && !priceOk(+c.getAttribute('data-price'),state.price)) ok=false;
      c.style.display=ok?'':'none'; if(ok) n++;
    });
    if(empty) empty.style.display=n?'none':'block';
  }
  tipBtns.forEach(function(b){ b.addEventListener('click',function(){
    tipBtns.forEach(function(x){x.classList.remove('active')});
    b.classList.add('active'); state.tip=b.getAttribute('data-filter'); apply();
  });});
  drops.forEach(function(d){ d.addEventListener('change',function(){
    state[d.getAttribute('data-key')]=d.value; apply();
  });});
})();
