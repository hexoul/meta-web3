import 'babel-polyfill';

import React, { Component } from 'react';

// Web3
import Web3 from 'web3';
import web3config from './web3-config.json';

// Contracts
import { contracts, getContractsAddresses, initContracts, TopicRegistry } from 'meta-web3';

export default class App extends Component {

  state = {
    initDone: false,
  };

  async init() {
    initContracts({
      web3: new Web3(new Web3.providers.HttpProvider(web3config.url)),
      identity: web3config.identity,
    }).then(async () => {
      // All contracts are initialized
      this.result = {
        getLengthOfAchievements: await contracts.achievementManager.getLengthOfAchievements(),
        getAttestationAgencyNum: await contracts.aaRegistry.getAttestationAgencyNum(),
        getTotal: await contracts.topicRegistry.getTotal(),
      };
      this.setState({ initDone: true });
    });
  }

  async initDirectly() {
    // If you want to initialize each contract directly
    getContractsAddresses().then(async () => {
      let topicRegistry = new TopicRegistry();
      topicRegistry.init({
        web3: new Web3(new Web3.providers.HttpProvider(web3config.url)),
      }).then(async () => {
        let total = await topicRegistry.getTotal();
        console.log('total', total);
      });
    });
  }

  componentWillMount() {
    this.init();
  }

  render () {
    return (
      <div>
        {this.state.initDone &&
          Object.keys(this.result).map(k => <p key={k}>{k + ': ' + this.result[k]}</p>)
        }
      </div>
    )
  }
}
