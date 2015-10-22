(function($) {
  var updateFrequency=2000, interval, url = 'https://autolotto-backend-production.herokuapp.com/api/v1/pres/count';

  function getPresCount() {
    var deferred = $.Deferred();
    $.ajax({ url: url, type: "get", dataType: 'json', error: deferred.reject, success: function(resp, status) {
      if (status === 'success' && resp.success) {
        deferred.resolve(resp.data.count || 0);
      } else {
        deferred.reject(resp);
      }
    }});
    return deferred.promise();
  }

  function updateCounter() {
    getPresCount().then(function(resp) {
      $('#counter').text(resp);
    }, console.log);
  }

  interval = setInterval(updateCounter, updateFrequency);
}) (jQuery);
