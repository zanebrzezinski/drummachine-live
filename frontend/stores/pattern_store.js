var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var CONSTANTS = require('../constants/api_constants');

var PatternStore = new Store(AppDispatcher);

var _patterns = {};

var addPattern = function(pattern) {
  _patterns[pattern.title] = pattern.pattern;
};

PatternStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case CONSTANTS.PATTERN_RECEIVED:
      addPattern(payload.pattern);
      PatternStore.__emitChange();
  }
};

PatternStore.patterns = function() {
  return _patterns;
};

module.exports = PatternStore;
