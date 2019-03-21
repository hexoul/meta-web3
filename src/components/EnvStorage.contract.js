import { getAddresses } from '../addresses'
import { getABI } from '../helpers'

class EnvStorage {
  async init ({ web3, branch }) {
    this.addresses = getAddresses()
    const { ENV_STORAGE_ADDRESS } = this.addresses
    this.envStorageAbi = await getABI(branch, 'EnvStorage')
    this.envStorageInstance = new web3.eth.Contract(this.envStorageAbi.abi, ENV_STORAGE_ADDRESS)
  }
}

export { EnvStorage }
