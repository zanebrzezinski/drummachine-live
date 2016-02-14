var AppDispatcher = require('../dispatcher/dispatcher');
var CONSTANTS = require('../constants/api_constants');
var PatternStore = require('../stores/pattern_store');

var ApiActions = {

  receivePattern: function(pattern) {
    AppDispatcher.dispatch({
      actionType: CONSTANTS.PATTERN_RECEIVED,
      pattern: pattern
    });
  }

};

module.exports = ApiActions;
