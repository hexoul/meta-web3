import { getBranch, getABI } from '../helpers';

class Identity {
  async init({web3, identity}) {
    const branch = getBranch();

    this.identityAbi = await getABI(branch, 'Identity');
    this.identityInstance = new web3.eth.Contract(this.identityAbi.abi, identity);
  }
}

export {Identity}