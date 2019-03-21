import { getAddresses } from '../addresses'
import { getABI } from '../helpers'

class BallotStorage {
  async init ({ web3, branch }) {
    this.addresses = getAddresses()
    const { BALLOT_STORAGE_ADDRESS } = this.addresses
    this.ballotStorageAbi = await getABI(branch, 'BallotStorage')
    this.ballotStorageInstance = new web3.eth.Contract(this.ballotStorageAbi.abi, BALLOT_STORAGE_ADDRESS)
  }
}

export { BallotStorage }
