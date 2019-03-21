import { getAddresses } from '../addresses'
import { getABI } from '../helpers'

class Registry {
  async init ({ web3, branch }) {
    this.addresses = getAddresses()
    const { REGISTRY_ADDRESS } = this.addresses
    this.registryAbi = await getABI(branch, 'Registry')
    this.registryInstance = new web3.eth.Contract(this.registryAbi.abi, REGISTRY_ADDRESS)
  }
}

export { Registry }
