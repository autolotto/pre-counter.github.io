(function($){
  var ns, updateFrequency=2000, interval, hostName = '';

  ns = {
    services: {
      presCount: hostName + '/api/v1/prescount'
    },
    utils: {
      getPresCount: function(){
        var deferred = $.Deferred();
        $.ajax({
          url: this.services.presCount,
          type:"get",
          dataType: 'json',
          success: function (resp, status) {
            if(status === 'success'){
              deferred.resolve(resp );
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
      this.utils.getPresCount().then( function(resp){
        $('#counter').html(resp);
      }, console.log );
    }
  };

  interval = setInterval($.proxy( ns.updateCounter, ns), updateFrequency);
})(jQuery);