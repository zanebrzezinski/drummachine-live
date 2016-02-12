var ReactDOM = require('react-dom');
var React = require('react');
var Drummachine = require('./components/drummachine');
var sounds = require('./constants/sounds');

var App = React.createClass({

  getInitialState: function() {
    this.interval = window.setInterval(this.checkForLoaded, 10);
    return {loaded: false};
  },

  checkForLoaded: function() {
    instruments = document.getElementsByClassName('instrument');
    for (var i = 0; i < instruments.length; i++) {
      if (instruments[i].readyState !== 4) {
        return false;
      }
    }
    window.clearInterval(this.interval);
    this.setState({loaded: true});
  },

  render: function() {
    var content;
    if (this.state.loaded) {
      content = <Drummachine />;
    } else {
      content = <div className="loading">LOADING</div>;
    }

    return (
      <div>{content}</div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});
