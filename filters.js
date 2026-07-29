
(function(){
  var cards=[].slice.call(document.querySelectorAll('.card'));
  var empty=document.getElementById('empty');
  var tipBtns=[].slice.call(document.querySelectorAll('.fbtn'));
  var drops=[].slice.call(document.querySelectorAll('.fdrop'));
  var nums=[].slice.call(document.querySelectorAll('.fnum'));
  var state={tip:'all'};
  drops.forEach(function(d){ state[d.getAttribute('data-key')]=d.value||'all'; });
  nums.forEach(function(n){ state[n.getAttribute('data-key')]=n.value; });
  function priceOk(v){
    var mn=(state.pmin==null||state.pmin==='')?0:parseFloat(state.pmin)*1e6;
    var mx=(state.pmax==null||state.pmax==='')?Infinity:parseFloat(state.pmax)*1e6;
    if(isNaN(mn)) mn=0; if(isNaN(mx)) mx=Infinity;
    return v>=mn && v<=mx;
  }
  function apply(){
    var k=0;
    cards.forEach(function(c){
      var ok=true;
      if(state.tip!=='all' && c.getAttribute('data-tip')!==state.tip) ok=false;
      if(ok && state.city && state.city!=='all' && c.getAttribute('data-city')!==state.city) ok=false;
      if(ok && state.method && state.method!=='all' && c.getAttribute('data-method')!==state.method) ok=false;
      if(ok && !priceOk(+c.getAttribute('data-price'))) ok=false;
      c.style.display=ok?'':'none'; if(ok) k++;
    });
    if(empty) empty.style.display=k?'none':'block';
  }
  tipBtns.forEach(function(b){ b.addEventListener('click',function(){
    tipBtns.forEach(function(x){x.classList.remove('active')});
    b.classList.add('active'); state.tip=b.getAttribute('data-filter'); apply();
  });});
  drops.forEach(function(d){ d.addEventListener('change',function(){ state[d.getAttribute('data-key')]=d.value; apply(); });});
  nums.forEach(function(n){ n.addEventListener('input',function(){ state[n.getAttribute('data-key')]=n.value; apply(); });});
})();
