# meta-web3

> Web3 wrapper for ERC721, 725 and 735

[![NPM](https://img.shields.io/npm/v/meta-web3.svg)](https://www.npmjs.com/package/meta-web3) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save meta-web3
```

## Components

1. User
2. Topic
2. Achievement

## Usage

```jsx
import React, { Component } from 'react';

// Web3
import Web3 from 'web3';
import web3config from './web3-config.json';

// Contracts
import { initContracts } from 'meta-web3';

class Example extends Component {

  state = {
    initDone: false,
  };

  async init() {
    const web3 = new Web3(new Web3.providers.HttpProvider(web3config.url));
    initContracts({
      web3: web3,
      identity: web3config.identity,
    }).then(async () => {
      // All contracts are initialized
      this.topicTotal = await contracts.topicRegistry.getTotal();
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
          this.topicTotal
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
