(function($) {
  var updateFrequency=2000, interval, url = 'https://autolotto-backend-production.herokuapp.com/api/v1/pres/count', inProgress = false;

  Number.prototype.addCommas = function() {
    var parts = this.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

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
    if (inProgress) return false;
    inProgress = true;
    getPresCount().then(function(resp) {
      $('#counter').text(resp.addCommas());
      inProgress = false;
    }, console.log);
  }

  updateCounter();
  interval = setInterval(updateCounter, updateFrequency);
}) (jQuery);
