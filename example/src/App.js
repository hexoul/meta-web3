import 'babel-polyfill';

import React, { Component } from 'react';

// Web3
import Web3 from 'web3';
import web3config from './web3-config.json';

// Contracts
import { initContracts } from 'meta-web3';

export default class App extends Component {

  async init() {
    const web3 = new Web3(new Web3.providers.HttpProvider(web3config.url));
    await initContracts({
      web3: web3,
      identity: web3config.identity,
    });
  }

  componentWillMount() {
    this.init();
  }

  render () {
    return (
      <div>
        Not implemented
      </div>
    )
  }
}
