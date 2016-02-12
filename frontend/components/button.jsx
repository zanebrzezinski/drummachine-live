var React = require('react');

var Button = React.createClass({

  getInitialState: function() {
    return(
      {sounds: [], instruments: []}
    );
  },

  addInstrument: function(){
    var idx = this.state.sounds.indexOf(this.props.instrument);
    var oldSounds = this.state.sounds;
    var oldInstruments = this.state.instruments;
    if (idx === -1) {
      oldSounds.push(this.props.instrument);
      oldInstruments.push(document.getElementById(this.props.instrument + " instrument"));
      this.props.saveStep(this.state.sounds, this.props.idx);
      this.setState({on: true, sounds: oldSounds});
    } else {
      oldSounds.splice(idx, 1);
      oldInstruments.splice(idx, 1);
      this.props.saveStep(this.state.sounds, this.props.idx);
      this.setState({on: false, sounds: oldSounds, instruments: oldInstruments});
    }
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.clear) {
      this.setState({sounds: []});
    } else if (newProps.active && this.props.instrument === newProps.instrument) {
      this.state.instruments.forEach(function(instrument){
        instrument.currentTime = 0;
        instrument.play();
      });
    }
  },

  render: function(){
    var instruments;

    var light;
    if (this.state.sounds.indexOf(this.props.instrument) !== -1) {
      light = (
        <div className="light on"></div>
      );
    } else {
      light = (
        <div className="light"></div>
      );
    }

    var classname;
    if (this.props.active) {
      classname = "active";
    } else {
      classname = "";
    }

    return(
      <div onClick={this.addInstrument} className={"button " + classname}>
        {light}
      </div>
    );
  }
});

module.exports = Button;
