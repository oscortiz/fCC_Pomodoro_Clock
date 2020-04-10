import React, { Component } from 'react';
import ClockLength from './ClockLength';
import Clock from './Clock';

const BREAK = 'Break';
const SESSION = 'Session';
const BREAK_LENGTH = 'breakLength';
const SESSION_LENGTH = 'sessionLength';

class PomodoroClock extends Component {

  constructor() {
    super();

    this.state = {
      type: SESSION,
      breakLength: 5,
      sessionLength: 25,
      time: '',
      running: false,
      paused: false
    }

    this.interval = null;
    this.beep = null;
  } 

  componentDidMount() {
    this.setTime();
    this.beep = document.getElementById('beep');
  } 

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sessionLength !== this.state.sessionLength) {
      this.setTime();
    }
  }

  setTime = () => {
    let time;

    if (this.state.type === SESSION) {
      time = window.moment.duration(this.state.sessionLength * 60 * 1000, 'milliseconds');
    } else {
      time = window.moment.duration(this.state.breakLength * 60 * 1000, 'milliseconds');
    }
        
    this.setState({time: window.moment(time.asMilliseconds()).format('mm:ss')});
  }

  setBreakLength = e => {
    this.setLength(this.state.running, e.currentTarget.value, this.state.breakLength, BREAK_LENGTH);
  }

  setSessionLength = e => {
    this.setLength(this.state.running, e.currentTarget.value, this.state.sessionLength, SESSION_LENGTH);
  }

  setLength = (running, action, length, typeLength) => {
    if (!running && action === '+' && length < 60){
      this.setState({[typeLength]: length + 1});
    } else if (!running && action === '-' && length > 1) {
      this.setState({[typeLength]: length - 1});
    }
  }

  startStop = () => {
    if (!this.state.running) { 
      this.setState({running: true, paused: false});
      this.interval = setInterval(() => this.decrement(), 1000);      
    } else {
      this.setState({running: false, paused: true});
      clearInterval(this.interval);      
    }
  }

  decrement = () => {
    let duration = window.moment.duration('00:' + this.state.time).asMilliseconds();

    if ((duration - 1000) < 0) {
      this.setTime();
      return;
    }

    let time = window.moment.duration(duration - 1000, 'milliseconds');

    this.setState({
      time: window.moment(time.asMilliseconds()).format('mm:ss')
    });

    if ((duration - 1000) === 0) {
      this.beep.play();
      if (this.state.type === BREAK) {
        this.setState({type: SESSION});
      } else {
        this.setState({type: BREAK});
      }
    }
  }

  reset = () => {
    this.beep.pause();
    this.beep.currentTime = 0;
    const time = window.moment.duration(this.state.sessionLength * 60 * 1000, 'milliseconds');

    this.setState({
      type: SESSION,
      breakLength: 5,
      sessionLength: 25,
      clockLabel: SESSION,
      time: window.moment(time.asMilliseconds()).format('mm:ss'),
      running: false,
      paused: false
    });

    clearInterval(this.interval);
  }

  render() {    
    return (
      <div className="container-fluid" id="wrapper">
        <div className="mt-5 col-md-6 offset-md-3 pomodoro-clock">
          <div className="row justify-content-center">
            <h1 className="col-md-8 text-center mt-3 mt-md-5">Pomodoro Clock</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="row justify-content-center">
                <Clock 
                  clockLabel={this.state.type}
                  time={this.state.time}
                  running={this.state.running}
                  paused={this.state.paused}
                  onClickStartStop={this.startStop}
                  onClickReset={this.reset}
                />
              </div>
              <div className="row justify-content-center mb-md-4">
                <ClockLength 
                  type={BREAK}
                  length={this.state.breakLength}  
                  onClick={this.setBreakLength}           
                />
                <ClockLength 
                  type={SESSION}
                  length={this.state.sessionLength}  
                  onClick={this.setSessionLength}  
                />
              </div>            
            </div>
          </div>      
        </div>
      </div>
    );
  }
}

export default PomodoroClock;
