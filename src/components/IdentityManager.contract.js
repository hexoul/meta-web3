import { getAddresses } from '../addresses'
import { getABI } from '../helpers'

class IdentityManager {
  async init ({ web3, branch }) {
    this.addresses = getAddresses()
    const { IDENTITY_MANAGER_ADDRESS } = this.addresses
    this.identityManagerAbi = await getABI(branch, 'IdentityManager')
    this.identityManagerInstance = new web3.eth.Contract(this.identityManagerAbi.abi, IDENTITY_MANAGER_ADDRESS)
  }
}

export { IdentityManager }
