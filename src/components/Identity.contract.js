import { getBranch, getABI } from '../helpers';

const eutil = require('ethereumjs-util');

class Identity {

  async init({ web3, netid, identity, privkey }) {
    this.identity = identity;
    this.privkey = privkey;
    this.identityAbi = await getABI(getBranch(netid), 'Identity');
    this.identityInstance = new web3.eth.Contract(this.identityAbi.abi, this.identity);
  }

  /**
   * @param {addr} string
   * @param {topic} uint256
   * @param {scheme} uint256 // 1: ECDSA_SCHEME, 2: RSA_SCHEME
   * @param {data} string
   * @param {uri} string
   * @param {signature} bytes
   */
  addClaim({ addr, topic, scheme, data, uri }) {
    // Validate ABI
    if (! this.identityInstance.methods.addClaim) return;

    const bData = Buffer.from(data);
    const bIssued = Buffer.from(addr.substr(2), 'hex');
    const bTopic = eutil.setLengthLeft(topic, 32);

    const packed = Buffer.concat([bIssued, bTopic, bData]);
    const packed32 = eutil.keccak256(packed);
    const claim = eutil.hashPersonalMessage(packed32);
    
    const { r, s, v } =  eutil.ecsign(claim, Buffer.from(this.privkey, 'hex'));
    const bV = new Buffer(1);
    bV[0] = v;
    const signature = Buffer.concat([r, s, bV]);

    // Return transaction param
    return {
      request: this.identityInstance.methods.addClaim(topic, scheme, this.identity, signature, bData, uri).send.request(),
      to: addr,
      data: this.identityInstance.methods.addClaim(topic, scheme, this.identity, signature, bData, uri).encodeABI(),
    };
  }

  /**
   * @param {addr} string target contract address started with 0x
   * @param {cb} func callback(error, response)
   * @param {web3ws} Object web3 websocket
   * @param {from} string from block
   * @param {to} string to block
   */
  filterClaimRequested({ addr, web3ws, cb, from, to }) {
    if (! web3ws || ! web3ws.eth) return;

    const targetIdentityInstance = new web3ws.eth.Contract(this.identityAbi.abi, addr);
    targetIdentityInstance.events.ClaimRequested({
      filter: { issuer: this.identity },
      fromBlock: from ? from : 'latest',
      toBlock: to ? to : 'latest',
    }, cb);
  }
}

export {Identity}