var ApiActions = require('../actions/api_actions');

ApiUtil = {
  savePattern: function(pattern) {
    $.ajax({
      type: "POST",
      url: "patterns",
      dataType: "json",
      data: {pattern: pattern},
      success: function(data){
        ApiActions.receivePattern(data);
      }
    });
  },

  loadPatterns: function() {
    $.ajax({
      type: "get",
      url: "patterns",
      dataType: "json",
      success: function(data){
        ApiActions.loadPatterns(JSON.parse(data.patterns));
      }
    });
  }
};

module.exports = ApiUtil;
