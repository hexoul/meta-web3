let constants = {}
constants.organization = 'hexoul'
constants.repoName = 'poa-chain-spec'
constants.addressesSourceFile = 'contracts.json'
constants.ABIsSources = {
  Registry: 'Registry.json',
  Identity: 'Identity.json',
  IdentityManager: 'IdentityManager.json',
  AttestationAgencyRegistry: 'AttestationAgencyRegistry.json',
  TopicRegistry: 'TopicRegistry.json',
  Achievement: 'Achievement.json',
  AchievementManager: 'AchievementManager.json',
  Staking: 'Staking.json',
  EnvStorage: 'EnvStorageImp.json',
  BallotStorage: 'BallotStorage.json',
  Gov: 'Gov.json',
  GovImp: 'GovImp.json'
}

constants.branch = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet'
}

constants.NETWORK = {
  '11': {
    NAME: 'MAINNET',
    RPC: 'https://api.metadium.com/dev',
    BRANCH: constants.branch.MAINNET,
    TESTNET: false,
    EXPLORER: 'https://explorer.metadium.com'
  },
  '12': {
    NAME: 'TESTNET',
    RPC: 'https://api.metadium.com/prod',
    BRANCH: constants.branch.TESTNET,
    TESTNET: true,
    EXPLORER: 'https://testnetexplorer.metadium.com'
  }
}

export { constants }
