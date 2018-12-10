import { getAddresses } from '../addresses';
import { getBranch, getABI } from '../helpers';

class IdentityManager {

  async init({ web3, netid }) {
    this.addresses = getAddresses(netid);
    const { IDENTITY_MANAGER_ADDRESS } = this.addresses;
    this.identityManagerAbi = await getABI(getBranch(netid), 'IdentityManager');
    this.identityManagerInstance = new web3.eth.Contract(this.identityManagerAbi.abi, IDENTITY_MANAGER_ADDRESS);
  }
}

export {IdentityManager}