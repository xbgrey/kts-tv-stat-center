import React, { Component } from 'react';
import background from './background.png';
import './index.css';

export default class Title extends Component {
  render() {
    return (
      <div className='app-title' >
        <p>迅联业务平台统计中心</p>
        <img alt='' src={background} width="1100" />
      </div>
    );
  }
}