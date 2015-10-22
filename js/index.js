(function($){
  var ns, updateFrequency=2000, interval, hostName = 'http://localhost:3000/';

  ns = {
    services: {
      presCount: hostName + 'api/v1/prescount'
    },
    utils: {
      getPresCount: function(){
        var deferred = $.Deferred();
        $.ajax({
          url: ns.services.presCount,
          type:"get",
          dataType: 'json',
          success: function (resp, status) {
            if(status === 'success' && resp.success){
              deferred.resolve(resp.data.count || 0);
            }else{
              deferred.reject( resp );
            }
          },
          error : deferred.reject
        });
        return deferred.promise();
      }
    },
    updateCounter: function(){
      ns.utils.getPresCount().then( function(resp){
        $('#counter').html(resp);
      }, console.log );
    }
  };

  interval = setInterval(ns.updateCounter, updateFrequency);
})(jQuery);