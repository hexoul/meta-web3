import { getAddresses } from '../addresses';
import { getBranch, getABI } from '../helpers';

var _ = require('underscore');

class AttestationAgencyRegistry {

  async init({ web3, netid }) {
    this.addresses = getAddresses(netid);
    const { ATTESTATION_AGENCY_REGISTRY_ADDRESS } = this.addresses;
    this.aaRegistryAbi = await getABI(getBranch(netid), 'AttestationAgencyRegistry');
    this.aaRegistryInstance = new web3.eth.Contract(this.aaRegistryAbi.abi, ATTESTATION_AGENCY_REGISTRY_ADDRESS);
  }

  async isRegistered(addr) {
    // Validate ABI
    if (! this.aaRegistryInstance || ! this.aaRegistryInstance.methods.isRegistered) return;

    // Call
    return this.aaRegistryInstance.methods.isRegistered(addr).call();
  }

  async getAttestationAgencyNum() {
    // Validate ABI
    if (! this.aaRegistryInstance || ! this.aaRegistryInstance.methods.attestationAgencyNum) return;

    // Call
    return this.aaRegistryInstance.methods.attestationAgencyNum().call();
  }

  async getAttestationAgencySingle(idx) {
    // Validate ABI
    if (! this.aaRegistryInstance || ! this.aaRegistryInstance.methods.getAttestationAgencySingle) return;

    // Call
    return this.aaRegistryInstance.methods.getAttestationAgencySingle(idx).call();
  }

  async getAllAttestationAgencies({ handler, cb }) {
    if (! handler || ! cb) return;
    if (! this.aaRegistryInstance) return;

    // Search AAs with the range from zero to total
    let total = await this.getAttestationAgencyNum();
    Promise.all(_.range(total).map(async (idx) => {
      // Execute handler from getAttestationAgencySingle() when an AA was registered
      await this.getAttestationAgencySingle(idx).then(ret => handler(ret));
    })).then(() => cb());
  }

  /**
   * 
   * @param {address} addr 
   * @param {bytes32} title 
   * @param {bytes32} explanation 
   */
  registerAttestationAgency(addr, title, explanation) {
    // Validate ABI
    if (! this.aaRegistryInstance || ! this.aaRegistryInstance.methods.registerAttestationAgency) return;

    // Return transaction param
    return {
      request: this.aaRegistryInstance.methods.registerAttestationAgency(addr, title, explanation).send.request(),
      to: this.addresses.ATTESTATION_AGENCY_REGISTRY_ADDRESS,
      data: this.aaRegistryInstance.methods.registerAttestationAgency(addr, title, explanation).encodeABI(),
    };
  }
}

export {AttestationAgencyRegistry}