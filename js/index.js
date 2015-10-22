(function($){
  var updateFrequency=2000, interval, url = 'http://localhost:3000/api/v1/prescount';

  function getPresCount(){
    var deferred = $.Deferred();

    function success(resp, status){
      if(status === 'success' && resp.success){
        deferred.resolve(resp.data.count || 0);
      }else{
        deferred.reject( resp );
      }
    }

    $.ajax({ url: url, type:"get", dataType: 'json', success: success, error : deferred.reject });
    return deferred.promise();
  }

  function updateCounter(){
    getPresCount().then( function(resp){
      $('#counter').html(resp);
    }, console.log );
  }

  interval = setInterval(updateCounter, updateFrequency);
})(jQuery);