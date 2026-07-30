
(function(){
  var cards=[].slice.call(document.querySelectorAll('.card'));
  var empty=document.getElementById('empty');
  var tipBtns=[].slice.call(document.querySelectorAll('.fbtn'));
  var drops=[].slice.call(document.querySelectorAll('.fdrop'));
  var sortSel=document.querySelector('.fsort');
  var searchInput=document.getElementById('ilanSearch');
  var grid=cards.length?cards[0].parentNode:null;
  var original=cards.slice();
  var state={tip:'all', search:''};
  drops.forEach(function(d){ state[d.getAttribute('data-key')]=d.value||'all'; });
  function apply(){
    var k=0;
    cards.forEach(function(c){
      var ok=true;
      if(state.tip!=='all' && c.getAttribute('data-tip')!==state.tip) ok=false;
      if(ok && state.city && state.city!=='all' && c.getAttribute('data-city')!==state.city) ok=false;
      if(ok && state.method && state.method!=='all' && c.getAttribute('data-method')!==state.method) ok=false;
      if(ok && state.search && (c.getAttribute('data-search')||'').indexOf(state.search)===-1) ok=false;
      c.style.display=ok?'':'none'; if(ok) k++;
    });
    if(empty) empty.style.display=k?'none':'block';
  }
  function sortCards(mode){
    if(!grid) return;
    var arr;
    if(mode==='price-asc') arr=cards.slice().sort(function(a,b){return (+a.getAttribute('data-price'))-(+b.getAttribute('data-price'));});
    else if(mode==='price-desc') arr=cards.slice().sort(function(a,b){return (+b.getAttribute('data-price'))-(+a.getAttribute('data-price'));});
    else arr=original.slice();
    arr.forEach(function(c){ grid.appendChild(c); });
  }
  tipBtns.forEach(function(b){ b.addEventListener('click',function(){
    tipBtns.forEach(function(x){x.classList.remove('active')});
    b.classList.add('active'); state.tip=b.getAttribute('data-filter'); apply();
  });});
  drops.forEach(function(d){ d.addEventListener('change',function(){ state[d.getAttribute('data-key')]=d.value; apply(); });});
  if(sortSel) sortSel.addEventListener('change',function(){ sortCards(sortSel.value); });
  if(searchInput) searchInput.addEventListener('input',function(){
    state.search=searchInput.value.trim().toLowerCase(); apply();
  });
})();
