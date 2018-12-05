import { Identity } from './Identity.contract';
import { IdentityManager } from './IdentityManager.contract';
import { TopicRegistry } from './TopicRegistry.contract';
import { getContractsAddresses } from '../addresses';

const contracts = {
    identity: new Identity(),
    identityManager: new IdentityManager(),
    topicRegistry: new TopicRegistry(),
    // achievementManager: new AchievementManager(),
    // aaRegistry: new AttestationAgencyRegistry(),
};

async function initContracts(arg) {
    const { web3 } = arg
    if (! web3 || ! web3.eth) {
        console.log('web3 NEEDED');
        return;
    }

    return getContractsAddresses().then(() => Promise.all(Object.values(contracts).map(async (contract) => { await contract.init(arg) })));
}

export {
    contracts,
    initContracts,
    Identity,
    IdentityManager,
    TopicRegistry
}
