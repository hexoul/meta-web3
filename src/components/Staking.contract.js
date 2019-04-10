import { getAddresses } from '../addresses'
import { getABI } from '../helpers'

class Staking {
  async init ({ web3, branch }) {
    this.web3 = web3
    this.addresses = getAddresses()
    const { STAKING_ADDRESS } = this.addresses
    this.stakingAbi = await getABI(branch, 'Staking')
    this.stakingInstance = new web3.eth.Contract(this.stakingAbi.abi, STAKING_ADDRESS)
  }

  async lockedBalanceOf (address) {
    if (!this.stakingInstance || !this.stakingInstance.methods.lockedBalanceOf) return
    return this.stakingInstance.methods.lockedBalanceOf(address).call()
  }

  async balanceOf (address) {
    if (!this.stakingInstance || !this.stakingInstance.methods.balanceOf) return
    return this.stakingInstance.methods.balanceOf(address).call()
  }

  async availableBalanceOf (address) {
    if (!this.stakingInstance || !this.stakingInstance.methods.availableBalanceOf) return
    return this.stakingInstance.methods.availableBalanceOf(address).call()
  }

  deposit (amount) {
    if (!this.stakingInstance || !this.stakingInstance.methods.deposit) return

    if (typeof amount === 'string') amount = this.web3.utils.toWei(amount, 'ether')
    return {
      to: this.addresses.STAKING_ADDRESS,
      value: amount,
      data: this.stakingInstance.methods.deposit().encodeABI()
    }
  }

  withdraw (amount) {
    if (!this.stakingInstance || !this.stakingInstance.methods.withdraw) return

    if (typeof amount === 'string') amount = this.web3.utils.toWei(amount, 'ether')
    return {
      to: this.addresses.STAKING_ADDRESS,
      data: this.stakingInstance.methods.withdraw(amount).encodeABI()
    }
  }
}

export { Staking }
