import { getAddresses } from '../addresses'
import { getABI } from '../helpers'

class Governance {
  async init ({ web3, branch }) {
    this.addresses = getAddresses()
    const { GOV_ADDRESS } = this.addresses
    this.govAbi = await getABI(branch, 'GovImp')
    this.govInstance = new web3.eth.Contract(this.govAbi.abi, GOV_ADDRESS)
  }

  async getBallotLength () {
    if (!this.govInstance || !this.govInstance.methods) return
    return this.govInstance.methods.ballotLength().call()
  }

  /**
   *
   * @param {address} addr
   */
  async isMember (addr) {
    if (!this.govInstance || !this.govInstance.methods) return
    return this.govInstance.methods.isMember(addr).call()
  }

  /**
   *
   * @param {uint256} idx
   * @param {boolean} approval
   */
  async vote (idx, approval) {
    if (!this.govInstance || !this.govInstance.methods) return
    return {
      to: this.addresses.GOV_ADDRESS,
      data: this.govInstance.methods.vote(idx, approval).encodeABI()
    }
  }

  /**
   *
   * @param {address} member
   * @param {bytes} name
   * @param {bytes} enode
   * @param {bytes} ip
   * @param {uint256[2]} [port, lockAmount]
   * @param {bytes} memo
   */
  async addProposalToAddMember (member, name, enode, ip, [port, lockAmount], memo) {
    if (!this.govInstance || !this.govInstance.methods) return
    return {
      to: this.addresses.GOV_ADDRESS,
      data: this.govInstance.methods.addProposalToAddMember(member, name, enode, ip, [port, lockAmount], memo).encodeABI()
    }
  }

  /**
   *
   * @param {address} [target, nMember]
   * @param {bytes} nName
   * @param {bytes} nEnode
   * @param {bytes} nIp
   * @param {uint} [nPort, ockAmount]
   * @param {bytes} memo
   */
  async addProposalToChangeMember ([target, nMember], nName, nEnode, nIp, [nPort, lockAmount], memo) {
    if (!this.govInstance || !this.govInstance.methods) return
    return {
      to: this.addresses.GOV_ADDRESS,
      data: this.govInstance.methods.addProposalToChangeMember([target, nMember], nName, nEnode, nIp, [nPort, lockAmount], memo).encodeABI()
    }
  }

  /**
   *
   * @param {address} member
   * @param {uint256} lockAmount
   * @param {bytes} memo
   */
  async addProposalToRemoveMember (member, lockAmount, memo) {
    if (!this.govInstance || !this.govInstance.methods) return
    return {
      to: this.addresses.GOV_ADDRESS,
      data: this.govInstance.methods.addProposalToRemoveMember(member, lockAmount, memo).encodeABI()
    }
  }

  // test
  async getMinVotingDuration () {
    if (!this.govInstance || !this.govInstance.methods) return
    return this.govInstance.methods.getMinVotingDuration().call()
  }
}

export { Governance }
