import { getAddresses } from '../addresses'
import { getABI } from '../helpers'

class Staking {
  async init ({ web3, branch }) {
    this.addresses = getAddresses()
    const { STAKING_ADDRESS } = this.addresses
    this.stakingAbi = await getABI(branch, 'Staking')
    this.stakingInstance = new web3.eth.Contract(this.stakingAbi.abi, STAKING_ADDRESS)
  }

  async lockedBalanceOf (address) {
    if (!this.stakingInstance || !this.stakingInstance.methods) return
    return this.stakingInstance.methods.lockedBalanceOf(address).call()
  }

  async balanceOf (address) {
    if (!this.stakingInstance || !this.stakingInstance.methods) return
    return this.stakingInstance.methods.balanceOf(address).call()
  }

  async availableBalanceOf (address) {
    if (!this.stakingInstance || !this.stakingInstance.methods) return
    return this.stakingInstance.methods.availableBalanceOf(address).call()
  }

  async deposit () {
    if (!this.stakingInstance || !this.stakingInstance.methods) return
    return {
      to: this.addresses.STAKING_ADDRESS,
      data: this.stakingInstance.methods.deposit().encodeABI()
    }
  }

  async withdraw (amount) {
    if (!this.stakingInstance || !this.stakingInstance.methods) return
    return {
      to: this.addresses.STAKING_ADDRESS,
      data: this.stakingInstance.methods.withdraw(amount).encodeABI()
    }
  }
}

export { Staking }
