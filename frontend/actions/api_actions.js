var AppDispatcher = require('../dispatcher/dispatcher');

var ApiActions = {

  receivePattern: function(pattern) {
    AppDispatcher.dispatch({
      actionType: "RECEIVE PATTERN",
      pattern: pattern
    });
  }

};

module.exports = ApiActions;
