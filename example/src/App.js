import 'babel-polyfill'

import React, { Component } from 'react'

// Web3
import Web3 from 'web3'
import web3config from './web3-config.json'

// Contracts
import { constants, contracts, getContractsAddresses,
  initContracts, initContractsByNames, TopicRegistry } from 'meta-web3'

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
        amount: '1'
      }
      // All contracts are initialized
      this.result = {
        // getLengthOfAchievements: await contracts.achievementManager.getLengthOfAchievements(),
        // getAttestationAgencyNum: await contracts.aaRegistry.getAttestationAgencyNum(),
        // getTotal: await contracts.topicRegistry.getTotal()\
        getBallotBasicCreator: (await contracts.ballotStorage.getBallotBasic(1)).creator,
        getBallotMemberNewMemberAddress: (await contracts.ballotStorage.getBallotMember(1)).newMemberAddress,
        getMinVotingDuration: await contracts.ballotStorage.getMinVotingDuration(),
        getMaxVotingDuration: await contracts.ballotStorage.getMaxVotingDuration(),
        getVote: (await contracts.ballotStorage.getVote(1)).ballotId,
        updateBallotDurationData: contracts.ballotStorage.updateBallotDuration(1, 86400).data,
        updateBallotMemoData: contracts.ballotStorage.updateBallotMemo(1, '0x54657374').data,
        cancelBallotData: contracts.ballotStorage.cancelBallot(1).data,
        getStakingMin: await contracts.envStorage.getStakingMin(),
        getStakingMax: await contracts.envStorage.getStakingMax(),
        getBallotLength: await contracts.governance.getBallotLength(),
        getModifiedBlock: await contracts.governance.getModifiedBlock(),
        getVoteLength: await contracts.governance.getVoteLength(),
        isMember: await contracts.governance.isMember('0xC03B19F95D409c26b64B44292827a26989D2E8d0'),
        voteData: contracts.governance.vote(1, true).data,
        addProposalToAddMemberData: contracts.governance.addProposalToAddMember(
          testProposal.addr,
          testProposal.textToHex,
          testProposal.node,
          testProposal.ip,
          [testProposal.port, testProposal.amount],
          testProposal.textToHex
        ).data,
        addProposalToChangeMemberData: contracts.governance.addProposalToChangeMember(
          [testProposal.addr, testProposal.addr],
          testProposal.textToHex,
          testProposal.node,
          testProposal.ip,
          [testProposal.port, testProposal.amount],
          testProposal.textToHex
        ).data,
        addProposalToRemoveMemberData: contracts.governance.addProposalToRemoveMember(
          testProposal.addr,
          testProposal.amount,
          testProposal.textToHex
        ).data,
        lockedBalanceOf: await contracts.staking.lockedBalanceOf('0xC03B19F95D409c26b64B44292827a26989D2E8d0'),
        balanceOf: await contracts.staking.balanceOf('0xC03B19F95D409c26b64B44292827a26989D2E8d0'),
        availableBalanceOf: await contracts.staking.availableBalanceOf('0xC03B19F95D409c26b64B44292827a26989D2E8d0'),
        depositData: contracts.staking.deposit().data,
        withdrawData: contracts.staking.withdraw('1').data
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

  async initByNames () {
    initContractsByNames({
      web3: new Web3(new Web3.providers.HttpProvider(web3config.url)),
      branch: constants.branch.TESTNET,
      names: ['staking']
    }).then(() => console.log(contracts))
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
