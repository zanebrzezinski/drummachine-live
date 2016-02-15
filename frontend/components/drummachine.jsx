var React = require('react');
var Button = require('./button');
var sounds = require('../constants/sounds');
var InstrumentPanelItem = require('./instrument_panel_item');
var ApiUtil = require('../util/api_util');
var PatternStore = require('../stores/pattern_store');

var Drummachine = React.createClass({

  getInitialState: function(){

    var pattern = [];
    for (var i = 0; i < 16; i++) {
      pattern.push([]);
    }

    return {playing: false, currentStep: 0, instrument: "Kick",
    tempo: 150, clear: false, pattern: pattern, title: "New Pattern", allPatterns: {},
    dropdown: false};
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
    newPattern = this.state.pattern || [];
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
        <i className="fa fa-caret-down dropdown-arrow open" onClick={this.displayDropdown}></i>
      );
      open = "open";
    } else {
      dropdownIcon = (
        <i className="fa fa-caret-left dropdown-arrow" onClick={this.displayDropdown}></i>
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
        <div className="tempo-slider-group">
          <span className="panel-label">Tempo</span>
          <input onChange={this.setTempo} className="tempo-slider"
            type="range" min="50" max="500"
            value={this.state.tempo}/>
        </div>
        <div className="save-load-panel">
          <input type="text" className={"title-input " + open} onChange={this.changeTitle} value={this.state.title}/>
          {dropdownIcon}
          <ul className="dropdown">
          {dropdown}
          </ul>
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
