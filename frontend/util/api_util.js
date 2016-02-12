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
  }
};

module.exports = ApiUtil;
