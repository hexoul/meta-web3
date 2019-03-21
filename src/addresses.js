import { addressesURL } from './helpers'

const fetch = require('node-fetch')

let ADDRESSES = {}

async function getContractsAddresses (branch) {
  let addr = addressesURL(branch)
  let response
  try {
    response = await fetch(addr)
  } catch (e) {
    return
  }

  const contracts = await response.json()
  console.log('contracts', contracts)
  ADDRESSES = contracts
  return contracts
}

function getAddresses () {
  return ADDRESSES
}

export {
  getContractsAddresses,
  getAddresses
}
