import { constants } from './constants'

const fetch = require('node-fetch')

function addressesURL (branch) {
  const URL = `https://raw.githubusercontent.com/${constants.organization}/${constants.repoName}/${branch}/${
    constants.addressesSourceFile
  }`
  return URL
}

function ABIURL (branch, contract) {
  const URL = `https://raw.githubusercontent.com/${constants.organization}/${constants.repoName}/${branch}/abis/${
    constants.ABIsSources[contract]
  }`
  return URL
}

function getABI (branch, contract) {
  let addr = ABIURL(branch, contract)
  return fetch(addr).then(response => response.json())
}

export {
  addressesURL,
  ABIURL,
  getABI
}
