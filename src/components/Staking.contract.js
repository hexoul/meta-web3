import { getAddresses } from '../addresses'
import { getABI } from '../helpers'

class Staking {
  async init ({ web3, branch }) {
    this.addresses = getAddresses()
    const { STAKING_ADDRESS } = this.addresses
    this.stakingAbi = await getABI(branch, 'Staking')
    this.stakingInstance = new web3.eth.Contract(this.stakingAbi.abi, STAKING_ADDRESS)
  }
}

export { Staking }
