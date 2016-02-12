var React = require('react');
var Button = require('./button');
var sounds = require('../constants/sounds');
var InstrumentPanelItem = require('./instrument_panel_item');
var ApiUtil = require('../util/api_util');

var Drummachine = React.createClass({

  getInitialState: function(){

    var pattern = [];
    for (var i = 0; i < 17; i++) {
      pattern.push([]);
    }

    return {playing: false, currentStep: 0, instrument: "Kick",
    tempo: 150, clear: false, pattern: pattern, title: ""};
  },

  play: function(){
    if (this.state.playing) {
      window.clearInterval(this.interval);
      this.setState({playing: false, currentStep: 0});
    } else {
      this.setState({playing: true, clear: false, currentStep: 0});
      this.interval = window.setInterval(this.advance, this.state.tempo);
    }
  },

  advance: function() {
    if (this.state.currentStep < 15) {
      this.setState({currentStep: this.state.currentStep + 1});
    } else {
      this.setState({currentStep: 0});
    }
  },

  clear: function() {
    this.setState({clear: true});
    if (this.state.playing) {
      this.play();
    }
  },

  saveStep: function(step, idx) {
    newPattern = this.state.pattern;
    newPattern[idx] = step;
    this.setState({pattern: newPattern});
  },

  save: function() {
    ApiUtil.savePattern({pattern: JSON.stringify(this.state.pattern), title: this.state.title});
  },

  changeTitle: function(e){
    this.setState({title: e.currentTarget.value});
  },

  setInstrument: function(e) {
    this.setState({instrument: e.currentTarget.id});
  },

  setTempo: function(e) {
    this.setState({tempo: e.currentTarget.value});
    window.clearInterval(this.interval);
    this.interval = window.setInterval(this.advance, e.currentTarget.value);
  },

  render: function() {
    var buttons = [];

    for (var i = 0; i < 16; i++) {
      if (i === this.state.currentStep && this.state.playing) {
        buttons.push(<Button key={i} active="true"
          playing={this.state.playing} instrument={this.state.instrument}
          clear={this.state.clear} saveStep={this.saveStep} idx={i}/>);
      } else {
        buttons.push(<Button key={i}
          playing={this.state.playing} instrument={this.state.instrument}
          clear={this.state.clear} saveStep={this.saveStep} idx={i}/>);
      }
    }

    var instrumentPanel = [];
    for (var instrument in sounds) {
      if (instrument === this.state.instrument) {
        instrumentPanel.push(
          <InstrumentPanelItem key={instrument + "button"}
          instrument={instrument} setInstrument={this.setInstrument} on="true"/>
        );
      } else {
        instrumentPanel.push(
          <InstrumentPanelItem key={instrument + "button"}
          instrument={instrument}
          setInstrument={this.setInstrument} save/>
        );
      }
    }

    var playingClass;
    if (this.state.playing) {
      playingClass = "big-button playing";
    } else {
      playingClass = "big-button";
    }

    return(
      <div className="drum-machine group">
        <div className={playingClass} onClick={this.play}>PLAY</div>
        <div className="big-button" onClick={this.clear}>Clear</div>
        <div className="big-button" onClick={this.save}>Save</div>
        <input type="text" placeholder="Pattern Name" onChange={this.changeTitle}/>
        <div className="tempo-slider-group">
          <span className="panel-label">Tempo</span>
          <input onChange={this.setTempo} className="tempo-slider"
            type="range" min="50" max="500"
            value={this.state.tempo}/>
        </div>
        <div className="instrument-panel">
          {instrumentPanel}
        </div>

        <div className="buttons">
          {buttons}
        </div>
      </div>
    );
  }
});

module.exports = Drummachine;
