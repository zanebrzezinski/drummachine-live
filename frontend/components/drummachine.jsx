var React = require('react');
var Button = require('./button');
var sounds = require('../constants/sounds');
var InstrumentPanelItem = require('./instrument_panel_item');
var ApiUtil = require('../util/api_util');
var PatternStore = require('../stores/pattern_store');

var Drummachine = React.createClass({

  getInitialState: function(){

    var pattern = [["Kick"],[],["Hat"],[],["Kick","Clap"],[],["Hat"],["Snare"],["Kick"],["Kick"],["Hat","Open Hat"],[],["Kick","Hat","Clap"],["Hat"],["Hat"],["Hat"]];

    return {playing: false, currentStep: 0, instrument: "Kick",
    tempo: 150, clear: false, pattern: pattern, title: "", allPatterns: {},
    dropdown: false, errors: null};
  },

  componentDidMount: function() {
    ApiUtil.loadPatterns();
    this.token = PatternStore.addListener(this._onChange);
    this.setState({allPatterns: PatternStore.patterns()});
  },

  componentWillUnmount: function() {
    this.token.remove();
  },

  _onChange: function() {
    this.setState({allPatterns: PatternStore.patterns()});
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
    pattern = this.state.pattern;
    pattern[this.state.currentStep].forEach(function(sound){
      var instrument = document.getElementById(sound + " instrument");
      instrument.currentTime = 0;
      instrument.play();
    });
    if (this.state.currentStep < 15) {
      this.setState({currentStep: this.state.currentStep + 1});
    } else {
      this.setState({currentStep: 0});
    }
  },

  clear: function() {
    var pattern = [];
    for (var i = 0; i < 16; i++) {
      pattern.push([]);
    }
    this.setState({pattern: pattern});
    if (this.state.playing) {
      this.play();
    }
  },

  saveStep: function(step, idx) {
    newPattern = this.state.pattern || [];
    newPattern[idx] = step;
    this.setState({pattern: newPattern});
  },

  save: function() {
    if (this.state.title === "") {
      this.setState({errors: "Please enter a track title to save"});
      return;
    }
    ApiUtil.savePattern({pattern: JSON.stringify(this.state.pattern), title: this.state.title});
    this.setState({title: ""});
    console.log(JSON.stringify(this.state.pattern));
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

  loadPattern: function(e) {

    this.setState({pattern: JSON.parse(this.state.allPatterns[e.currentTarget.id]),
      title: e.currentTarget.id, dropdown: false});
  },

  displayDropdown: function() {
    if (this.state.dropdown) {
      this.setState({dropdown: false});
    } else {
      this.setState({dropdown: true});
    }
  },

  render: function() {
    var buttons = [];

    for (var i = 0; i < 16; i++) {
      if (i === this.state.currentStep && this.state.playing) {
        buttons.push(<Button key={i} active="true"
          playing={this.state.playing} instrument={this.state.instrument}
          clear={this.state.clear} saveStep={this.saveStep} sounds={this.state.pattern[i]} idx={i}/>);
      } else {
        buttons.push(<Button key={i}
          playing={this.state.playing} instrument={this.state.instrument}
          clear={this.state.clear} saveStep={this.saveStep} idx={i} sounds={this.state.pattern[i]} />);
      }
    }

    var dropdownIcon;
    var open;
    if (this.state.dropdown){
      dropdownIcon = (
        <span><i className="fa fa-caret-down dropdown-arrow open" onClick={this.displayDropdown}></i></span>
      );
      open = "open";
    } else {
      dropdownIcon = (
        <span><i className="fa fa-caret-left dropdown-arrow" onClick={this.displayDropdown}></i></span>
      );
      open = "";
    }

    var dropdown;
    if (this.state.dropdown) {
      if (Object.keys(this.state.allPatterns).length === 0) {
        dropdown = <li className="dropdown-item">No Saved Patterns</li>;
      }
      else {
        dropdown = Object.keys(this.state.allPatterns).map(function(title){
          return( <li key={title} id={title}  className="dropdown-item"
            onClick={this.loadPattern}>{title}</li>);
        }.bind(this));
      }
    }

    var instrumentPanel = [];
    for (var instrument in sounds) {
      var playingButton;
      if (this.state.pattern[this.state.currentStep].indexOf(instrument) !== -1 && this.state.playing) {
        playingButton = "true";
      } else {
        playingButton = "false";
      }
      if (instrument === this.state.instrument) {
        instrumentPanel.push(
          <InstrumentPanelItem key={instrument + "button"}
          instrument={instrument} setInstrument={this.setInstrument} on="true" playing={playingButton}/>
        );
      } else {
        if (this.state.pattern[this.state.currentStep].indexOf(instrument) !== -1) {
          instrumentPanel.push(
            <InstrumentPanelItem key={instrument + "button"}
            instrument={instrument}
            setInstrument={this.setInstrument} playing={playingButton}/>
          );
        } else {
          instrumentPanel.push(
            <InstrumentPanelItem key={instrument + "button"}
            instrument={instrument}
            setInstrument={this.setInstrument} playing={playingButton}/>
          );
        }
      }
    }

    var playingClass;
    if (this.state.playing) {
      playingClass = "big-button play playing";
    } else {
      playingClass = "big-button play";
    }

    return(
      <div>
      <div className="drum-machine group">
        <div className={playingClass} onClick={this.play}>PLAY</div>
        <div className="big-button clear" onClick={this.clear}>Clear</div>
        <div className="big-button save" onClick={this.save}>Save</div>
        <div className="save-load-panel">
          <input type="text" className={"title-input " + open} placeholder="Name your pattern"
          onChange={this.changeTitle} value={this.state.title}/>
          {dropdownIcon}
          <ul className="dropdown">
          {dropdown}
          </ul>
        </div>
        <div className="instrument-panel">
          <div className="tempo-slider-group">
            <span className="panel-label">Tempo</span>
            <input onChange={this.setTempo} className="tempo-slider"
            type="range" min="50" max="500"
            value={this.state.tempo}/>
          </div>
          {instrumentPanel}
        </div>

        <div className="buttons">
          {buttons}
        </div>
      </div>
      <div className="errors">{this.state.errors}</div>
      </div>
    );
  }
});

module.exports = Drummachine;
