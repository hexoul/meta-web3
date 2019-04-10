import { getAddresses } from '../addresses'
import { getABI } from '../helpers'

class BallotStorage {
  async init ({ web3, branch }) {
    this.addresses = getAddresses()
    const { BALLOT_STORAGE_ADDRESS } = this.addresses
    this.ballotStorageAbi = await getABI(branch, 'BallotStorage')
    this.ballotStorageInstance = new web3.eth.Contract(this.ballotStorageAbi.abi, BALLOT_STORAGE_ADDRESS)
  }

  async getBallotBasic (id) {
    if (!this.ballotStorageInstance || !this.ballotStorageInstance.methods) return
    return this.ballotStorageInstance.methods.getBallotBasic(id).call()
  }

  async getBallotMember (id) {
    if (!this.ballotStorageInstance || !this.ballotStorageInstance.methods) return
    return this.ballotStorageInstance.methods.getBallotMember(id).call()
  }

  async getMinVotingDuration () {
    if (!this.ballotStorageInstance || !this.ballotStorageInstance.methods) return
    return this.ballotStorageInstance.methods.getMinVotingDuration().call()
  }

  async getMaxVotingDuration () {
    if (!this.ballotStorageInstance || !this.ballotStorageInstance.methods) return
    return this.ballotStorageInstance.methods.getMaxVotingDuration().call()
  }

  async getVote () {
    if (!this.ballotStorageInstance || !this.ballotStorageInstance.methods) return
    return this.ballotStorageInstance.methods.getVote(this.data.voteLength).call()
  }

  /**
     * @param {uint256} id
     * @param {uint256} duration
     */
  updateBallotDuration (id, duration) {
    if (!this.ballotStorageInstance || !this.ballotStorageInstance.methods) return

    return {
      to: this.addresses.BALLOT_STORAGE_ADDRESS,
      data: this.ballotStorageInstance.methods.updateBallotDuration(id, duration).encodeABI()
    }
  }

  /**
     * @param {unit256} id
     * @param {bytes} memo
     */
  updateBallotMemo (id, memo) {
    if (!this.ballotStorageInstance || !this.ballotStorageInstance.methods) return
    return {
      to: this.addresses.BALLOT_STORAGE_ADDRESS,
      data: this.ballotStorageInstance.methods.updateBallotMemo(id, memo).encodeABI()
    }
  }

  finalizeBallot (id, ballotState) {
    if (!this.ballotStorageInstance || !this.ballotStorageInstance.methods) return
    return {
      to: this.addresses.BALLOT_STORAGE_ADDRESS,
      data: this.ballotStorageInstance.methods.finalizeBallot(id, ballotState).encodeABI()
    }
  }

  cancelBallot (id) {
    if (!this.ballotStorageInstance || !this.ballotStorageInstance.methods) return
    return {
      to: this.addresses.BALLOT_STORAGE_ADDRESS,
      data: this.ballotStorageInstance.methods.cancelBallot(id).encodeABI()
    }
  }
}

export { BallotStorage }
