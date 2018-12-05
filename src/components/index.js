import { AttestationAgencyRegistry } from './AttestationAgencyRegistry.contract';
import { Identity } from './Identity.contract';
import { IdentityManager } from './IdentityManager.contract';
import { TopicRegistry } from './TopicRegistry.contract';
import { getContractsAddresses } from '../addresses';

const contracts = {
    aaRegistry: new AttestationAgencyRegistry(),
    identity: new Identity(),
    identityManager: new IdentityManager(),
    topicRegistry: new TopicRegistry(),
    // achievementManager: new AchievementManager(),
};

async function initContracts(arg) {
    const { web3, netid } = arg
    if (! web3 || ! web3.eth) {
        console.log('web3 NEEDED');
        return;
    }

    return getContractsAddresses(netid).then(() => Promise.all(Object.values(contracts).map(async (contract) => { await contract.init(arg) })));
}

export {
    contracts,
    getContractsAddresses,
    initContracts,
    AttestationAgencyRegistry,
    Identity,
    IdentityManager,
    TopicRegistry
}
