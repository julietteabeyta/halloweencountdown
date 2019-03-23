import React, { Component } from 'react';
import './style.css';

class App extends Component {

  state = {
    timeUntil: 0,
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
      const seconds = Math.round(timeBetween % 60);
      timeUntil =  `There are ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until Halloween!`;
      this.setState({timeUntil})
    }, 1000);
  }

  render() {
    return (
      <div className="container">
        <header className="header">
          <p>
            {this.state.timeUntil}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
