# meta-web3

> Web3 wrapper for ERC721, 725 and 735

[![NPM](https://img.shields.io/npm/v/meta-web3.svg)](https://www.npmjs.com/package/meta-web3) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i meta-web3
```

## Components

1. AttestationAgencyRegistry
1. Identity
1. IdentityManager
1. TopicRegistry
1. AchievementManager

## Usage

```jsx
import React, { Component } from 'react';

// Web3
import Web3 from 'web3';
import web3config from './web3-config.json';

// Contracts
import { contracts, getContractsAddresses, initContracts, TopicRegistry } from 'meta-web3';

class Example extends Component {

  state = {
    initDone: false,
  };

  async init() {
    initContracts({
      web3: new Web3(new Web3.providers.HttpProvider(web3config.url)),
      identity: web3config.identity,
    }).then(async () => {
      // All contracts are initialized
      this.result = {
        getLengthOfAchievements: await contracts.achievementManager.getLengthOfAchievements(),
        getAttestationAgencyNum: await contracts.aaRegistry.getAttestationAgencyNum(),
        getTotal: await contracts.topicRegistry.getTotal(),
      };
      this.setState({ initDone: true });
    });
  }

  async initDirectly() {
    // If you want to initialize each contract directly
    getContractsAddresses().then(async () => {
      let topicRegistry = new TopicRegistry();
      topicRegistry.init({
        web3: new Web3(new Web3.providers.HttpProvider(web3config.url)),
      }).then(async () => {
        let total = await topicRegistry.getTotal();
        console.log('total', total);
      });
    });
  }

  componentWillMount() {
    this.init();
  }

  render () {
    return (
      <div>
        {this.state.initDone &&
          Object.keys(this.result).map(k => <p key={k}>{k + ': ' + this.result[k]}</p>)
        }
      </div>
    )
  }
}
```

## Test
```
cd meta-web3
npm start
[Ctrl+C]
cd example
npm start
```

## Reference
- [ERC721 spec.](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md)
- [ERC725 spec.](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md)
- [ERC735 spec.](https://github.com/ethereum/EIPs/issues/735)
- [ERC725-735 imp.](https://github.com/mirceapasoi/erc725-735)
- [OpenZeppelin imp.](https://github.com/OpenZeppelin/openzeppelin-solidity)

## Thanks to
[create-react-library](https://www.npmjs.com/package/create-react-library)

## License

MIT © [hexoul](https://github.com/hexoul)
