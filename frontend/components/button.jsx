var React = require('react');
var Instrument = require('./instrument.jsx');

var Button = React.createClass({

  getInitialState: function() {
    return(
      {sounds: []}
    );
  },

  addInstrument: function(){
    var idx = this.state.sounds.indexOf(this.props.instrument);
    var oldSounds = this.state.sounds;
    if (idx === -1) {
      oldSounds.push(this.props.instrument);
      this.setState({on: true, sounds: oldSounds});
    } else {
      oldSounds.splice(idx, 1);
      this.setState({on: false, sounds: oldSounds});
    }
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.clear) {
      this.setState({sounds: []});
    }
  },

  render: function(){
    var instruments = this.state.sounds.map(function(sound){
      return (
        <Instrument instrument={sound}
        active={this.props.active} key={sound}/>
      );
    }.bind(this));

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
        {instruments}
      </div>
    );
  }
});

module.exports = Button;
