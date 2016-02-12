var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var PatternStore = new Store(AppDispatcher);

var _patterns = [];

var addPattern = function(pattern) {
  _patterns.push(pattern);
};

PatternStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "RECEIVE PATTERN":
      debugger
      addPattern(payload.pattern);
      PatternStore.__emitChange();
  }
};

PatternStore.patterns = function() {
  return _patterns.slice(0);
};

module.exports = PatternStore;
