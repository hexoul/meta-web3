import { getContractsAddresses } from '../addresses'

import { Registry } from './Registry.contract'
import { AchievementManager } from './AchievementManager.contract'
import { AttestationAgencyRegistry } from './AttestationAgencyRegistry.contract'
import { Identity } from './Identity.contract'
import { IdentityManager } from './IdentityManager.contract'
import { TopicRegistry } from './TopicRegistry.contract'
import { BallotStorage } from './BallotStorage.contract'
import { EnvStorage } from './EnvStorage.contract'
import { Governance } from './Governance.contract'
import { Staking } from './Staking.contract'

const contracts = {
  registry: new Registry(),
  achievementManager: new AchievementManager(),
  aaRegistry: new AttestationAgencyRegistry(),
  identity: new Identity(),
  identityManager: new IdentityManager(),
  topicRegistry: new TopicRegistry(),
  ballotStorage: new BallotStorage(),
  envStorage: new EnvStorage(),
  governance: new Governance(),
  staking: new Staking()
}

async function initContracts (arg) {
  const { web3, branch } = arg
  if (!web3 || !web3.eth) {
    console.log('web3 NOT FOUND')
    return
  }

  return getContractsAddresses(branch).then(() =>
    Promise.all(Object.values(contracts).map(async (contract) => {
      await contract.init(arg)
    })))
}

async function initContractsByNames (arg) {
  const { web3, branch, names } = arg
  if (!web3 || !web3.eth) {
    console.log('web3 NOT FOUND')
    return
  } else if (!(names instanceof Array)) {
    console.log('names is not array')
    return
  }

  return getContractsAddresses(branch).then(() =>
    Promise.all(Object.keys(contracts).map(async (name) => {
      if (names.includes(name)) await contracts[name].init(arg)
    })))
}

export {
  contracts,
  initContracts,
  initContractsByNames,
  AchievementManager,
  AttestationAgencyRegistry,
  Identity,
  IdentityManager,
  TopicRegistry,
  BallotStorage,
  EnvStorage,
  Governance,
  Staking
}
