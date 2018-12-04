import 'babel-polyfill';

import React, { Component } from 'react';

// Web3
import Web3 from 'web3';
import web3config from './web3-config.json';

// Contracts
import { contracts, initContracts } from 'meta-web3';

export default class App extends Component {

  state = {
    initDone: false,
  };

  async init() {
    const web3 = new Web3(new Web3.providers.HttpProvider(web3config.url));
    initContracts({
      web3: web3,
      identity: web3config.identity,
    }).then(async () => {
      // All contracts are initialized
      this.topicTotal = await contracts.topicRegistry.getTotal();
      this.setState({ initDone: true });
    });
  }

  componentWillMount() {
    this.init();
  }

  render () {
    return (
      <div>
        {this.state.initDone &&
          this.topicTotal
        }
      </div>
    )
  }
}
