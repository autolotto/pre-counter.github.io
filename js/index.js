(function(){
  function includeJquery(){
    var jqScript = document.createElement('script');
    jqScript.setAttribute('src','//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js');
    document.head.appendChild(jqScript);
  }

  if (typeof window.parent.getJquery === 'function'){
    var $ = window.parent.getJquery();
  }else{
    includeJquery();
  }
})();