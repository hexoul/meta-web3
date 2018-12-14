import { getContractsAddresses } from '../addresses'

import { AchievementManager } from './AchievementManager.contract'
import { AttestationAgencyRegistry } from './AttestationAgencyRegistry.contract'
import { Identity } from './Identity.contract'
import { IdentityManager } from './IdentityManager.contract'
import { TopicRegistry } from './TopicRegistry.contract'

const contracts = {
  achievementManager: new AchievementManager(),
  aaRegistry: new AttestationAgencyRegistry(),
  identity: new Identity(),
  identityManager: new IdentityManager(),
  topicRegistry: new TopicRegistry()
}

async function initContracts (arg) {
  const { web3, netid } = arg
  if (!web3 || !web3.eth) {
    console.log('web3 NEEDED')
    return
  }

  return getContractsAddresses(netid).then(() => Promise.all(Object.values(contracts).map(async (contract) => { await contract.init(arg) })))
}

export {
  contracts,
  getContractsAddresses,
  initContracts,
  AchievementManager,
  AttestationAgencyRegistry,
  Identity,
  IdentityManager,
  TopicRegistry
}
