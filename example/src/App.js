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
      web3: new Web3(new Web3.providers.HttpProvider(web3config.url)),
      branch: constants.branch.TESTNET,
      identity: web3config.identity,
      privkey: web3config.privkey
    }).then(async () => {
      const testProposal = {
        addr: '0xC03B19F95D409c26b64B44292827a26989D2E8d0',
        textToHex: '0x54657374',
        node: '0x6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0',
        ip: '0x31302e332e35382e36',
        port: 30303,
        amount: '1',
      }
      // All contracts are initialized
      this.result = {
        // getLengthOfAchievements: await contracts.achievementManager.getLengthOfAchievements(),
        // getAttestationAgencyNum: await contracts.aaRegistry.getAttestationAgencyNum(),
        // getTotal: await contracts.topicRegistry.getTotal()\
        getBallotBasic_creator: (await contracts.ballotStorage.getBallotBasic(1)).creator,
        getBallotMember_newMemberAddress: (await contracts.ballotStorage.getBallotMember(1)).newMemberAddress,
        getMinVotingDuration: await contracts.ballotStorage.getMinVotingDuration(),
        getMaxVotingDuration: await contracts.ballotStorage.getMaxVotingDuration(),
        updateBallotDuration_to: (await contracts.ballotStorage.updateBallotDuration(1, 86400)).to,
        updateBallotMemo_to: (await contracts.ballotStorage.updateBallotMemo(1, '0x54657374')).to,
        cancelBallot_to: (await contracts.ballotStorage.cancelBallot(1)).to,

        getStakingMin: await contracts.envStorage.getStakingMin(),
        getStakingMax: await contracts.envStorage.getStakingMax(),

        getBallotLength: await contracts.governance.getBallotLength(),
        isMember: await contracts.governance.isMember('0xC03B19F95D409c26b64B44292827a26989D2E8d0'),
        vote_to: (await contracts.governance.vote(1, true)).to,
        addProposalToAddMember_to: (await contracts.governance.addProposalToAddMember(
          testProposal.addr,
          testProposal.textToHex,
          testProposal.node,
          testProposal.ip,
          [testProposal.port, testProposal.amount],
          testProposal.textToHex
        )).to,
        addProposalToChangeMember_to: (await contracts.governance.addProposalToChangeMember(
          [testProposal.addr, testProposal.addr],
          testProposal.textToHex,
          testProposal.node,
          testProposal.ip,
          [testProposal.port, testProposal.amount],
          testProposal.textToHex
        )).to,
        addProposalToRemoveMember_to: (await contracts.governance.addProposalToRemoveMember(
          testProposal.addr,
          testProposal.amount,
          testProposal.textToHex
        )).to,

        lockedBalanceOf: await contracts.staking.lockedBalanceOf('0xC03B19F95D409c26b64B44292827a26989D2E8d0'),
        balanceOf: await contracts.staking.balanceOf('0xC03B19F95D409c26b64B44292827a26989D2E8d0'),
        availableBalanceOf: await contracts.staking.availableBalanceOf('0xC03B19F95D409c26b64B44292827a26989D2E8d0'),
        deposit_to: (await contracts.staking.deposit()).to,
        withdraw_to: (await contracts.staking.withdraw('1')).to
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
