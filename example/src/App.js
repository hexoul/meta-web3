import 'babel-polyfill'

import React, { Component } from 'react'

// Web3
import Web3 from 'web3'
import web3config from './web3-config.json'

// Contracts
import { constants, contracts, getContractsAddresses, initContracts, TopicRegistry } from 'meta-web3'

export default class App extends Component {
  state = {
    initDone: false
  };

  async init () {
    initContracts({
      //web3: new Web3(new Web3.providers.HttpProvider(web3config.url)),
      web3: new Web3(window.ethereum),
      branch: constants.branch.TESTNET,
      identity: web3config.identity,
      privkey: web3config.privkey
    }).then(async () => {
      let ballotStorageTest, envStorageTest, governanceTest, stakingTest
      await contracts.ballotStorage.getBallotMember(1).then(ret => ballotStorageTest = ret.newMemberAddress)
      envStorageTest = await contracts.envStorage.getStakingMin()
      governanceTest = await contracts.governance.getBallotLength()
      stakingTest = await contracts.staking.balanceOf(ballotStorageTest)
      // All contracts are initialized
      this.result = {
        // getLengthOfAchievements: await contracts.achievementManager.getLengthOfAchievements(),
        // getAttestationAgencyNum: await contracts.aaRegistry.getAttestationAgencyNum(),
        // getTotal: await contracts.topicRegistry.getTotal()\
        ballotStorage: ballotStorageTest,
        envStarge: envStorageTest,
        governance: governanceTest,
        stakging: stakingTest
      }
      this.setState({ initDone: true })
    })
  }

  async initDirectly () {
    // If you want to initialize each contract directly
    getContractsAddresses().then(async () => {
      let topicRegistry = new TopicRegistry()
      topicRegistry.init({
        web3: new Web3(new Web3.providers.HttpProvider(web3config.url))
      }).then(async () => {
        let total = await topicRegistry.getTotal()
        console.log('total', total)
      })
    })
  }

  componentWillMount () {
    this.init()
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
