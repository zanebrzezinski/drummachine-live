var React = require('react');

var InstrumentPanelItem = React.createClass({

  getInitialState: function() {
    var sound = document.getElementById(this.props.instrument + " instrument");
    return {volume: 1, sound: sound};
  },

  changeVolume: function(e) {
    var volume = (e.currentTarget.value / 100);
    this.state.sound.volume = volume;
    this.setState({volume: volume});
  },

  render: function() {
    var light;

    if (this.props.on) {
      light = "light on";
    } else if (this.props.playing){
      light = "light playing-light";
    } else {
      light = "light";
    }

    return (

      <ul className="instrument-select">
        <li className="panel-item">
          <span className="panel-label">{this.props.instrument}</span>
          <div className="button small"
          onClick={this.props.setInstrument} id={this.props.instrument}><div className={light}/></div>
          <span className="panel-label">Volume</span>
          <input className="volume-slider" type="range" onChange={this.changeVolume} value={this.state.volume * 100} min="0" max="100" />
        </li>
      </ul>
    );
  }

});

module.exports = InstrumentPanelItem;
