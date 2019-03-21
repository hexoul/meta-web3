import { getAddresses } from '../addresses'
import { getABI } from '../helpers'

class Governance {
  async init ({ web3, branch }) {
    this.addresses = getAddresses()
    const { GOV_ADDRESS } = this.addresses
    this.govAbi = await getABI(branch, 'GovImp')
    this.govInstance = new web3.eth.Contract(this.govAbi.abi, GOV_ADDRESS)
  }
}

export { Governance }
