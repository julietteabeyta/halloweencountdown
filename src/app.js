import React, { Component } from 'react';
import './style.scss';
import mmyers from './mmyers.jpg'

class App extends Component {

  state = {
    timeUntil: '',
  }

  componentDidMount() {
    setInterval(() => {
      let {timeUntil} = this.state;
      const countDownDate = new Date("Oct 31, 2019 00:00:00").getTime();
      const currentDate = new Date().getTime();
      let timeBetween = Math.abs(countDownDate-currentDate)/1000;
      const days = Math.floor(timeBetween / 86400);
      timeBetween -= days * 86400;
      const hours = Math.floor(timeBetween / 3600) % 24;
      timeBetween -= hours * 3600;
      const minutes = Math.floor(timeBetween / 60) % 60;
      timeBetween -= minutes * 60;
      const seconds = Math.round(timeBetween % 60)-1;
      if(seconds === -1){
        seconds = 59;
      }
      if(seconds === 1){
        timeUntil =  `${days} days ${hours} hours ${minutes} minutes ${seconds} second`;
      } else{
        timeUntil =  `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
      }
      this.setState({timeUntil})
    }, 1000);
  }

  render() {
    return (
      <div className="container">
        <div className="countdown-content">
          <div className="glitch header" data-text="HALLOWEEN">
            HALLOWEEN
          </div>
          <div className="date-text">{this.state.timeUntil}&nbsp;</div>
        </div>
        <div className="countdown-text">countdown</div>
        <img src={mmyers} alt="Michael Myers" />
      </div>
    );
  }
}

export default App;
