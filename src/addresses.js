import { constants } from './constants'
import { addressesURL, getBranch } from './helpers'

const fetch = require('node-fetch')

let TESTNET_ADDRESSES = {}

async function getContractsAddresses (netId) {
  let branch = getBranch(netId)
  let addr = addressesURL(branch)
  let response
  try {
    response = await fetch(addr)
  } catch (e) {
    return
  }

  let contracts = await response.json()
  console.log('contracts', contracts)

  switch (branch) {
    case 'testnet':
      TESTNET_ADDRESSES = contracts
      break
    default:
      TESTNET_ADDRESSES = contracts
      break
  }
}

function getAddresses (netId) {
  switch (netId) {
    case constants.NETID_TESTNET:
      return TESTNET_ADDRESSES
    default:
      return TESTNET_ADDRESSES
  }
}

export {
  getContractsAddresses,
  getAddresses
}
