import { getBranch, getABI } from '../helpers';

class Identity {

  async init({web3, netid, identity}) {
    this.identityAbi = await getABI(getBranch(netid), 'Identity');
    this.identityInstance = new web3.eth.Contract(this.identityAbi.abi, identity);
  }
}

export {Identity}