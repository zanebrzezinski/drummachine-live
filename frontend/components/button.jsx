var React = require('react');

var Button = React.createClass({

  addInstrument: function(){
    var idx = this.props.sounds.indexOf(this.props.instrument);
    var oldSounds = this.props.sounds;
    if (idx === -1) {
      oldSounds.push(this.props.instrument);
      this.props.saveStep(oldSounds, this.props.idx);
    } else {
      oldSounds.splice(idx, 1);
      this.props.saveStep(oldSounds, this.props.idx);
    }
  },

  render: function(){
    var instruments;
    var light;
    if (this.props.sounds.indexOf(this.props.instrument) !== -1) {
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
