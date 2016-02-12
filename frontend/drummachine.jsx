var ReactDOM = require('react-dom');
var React = require('react');
var Drummachine = require('./components/drummachine');

var App = React.createClass({
  render: function() {
    return (<Drummachine />);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});
