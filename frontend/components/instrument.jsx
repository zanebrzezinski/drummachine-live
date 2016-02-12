var React = require('react');
var sounds = require('../constants/sounds');

var Instrument = React.createClass({

  play: function(){
    var sound = document.getElementById(this.props.instrument + " instrument");
    sound.currentTime = 0;
    sound.play();
  },

  render: function(){
    if (this.props.active && document.getElementById(this.props.instrument) !== null) {
      this.play();
    }

    return(
      <div/>
    );
  }
});

module.exports = Instrument;
