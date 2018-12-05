# meta-web3

> Web3 wrapper for ERC721, 725 and 735

[![NPM](https://img.shields.io/npm/v/meta-web3.svg)](https://www.npmjs.com/package/meta-web3) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i meta-web3
```

## Components

1. Identity
2. TopicRegistry
3. AchievementManager

## Usage

```jsx
import React, { Component } from 'react';

// Web3
import Web3 from 'web3';
import web3config from './web3-config.json';

// Contracts
import { contracts, initContracts } from 'meta-web3';

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
        getTotal: await contracts.topicRegistry.getTotal(),
      };
      this.setState({ initDone: true });
    });
  }

  componentWillMount() {
    this.init();
  }

  render () {
    return (
      <div>
        {this.state.initDone &&
          Object.keys(this.result).map(k => k + ': ' + this.result[k])
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

## Thanks to
[create-react-library](https://www.npmjs.com/package/create-react-library)

## License

MIT © [hexoul](https://github.com/hexoul)
