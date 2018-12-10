import { getAddresses } from '../addresses';
import { getBranch, getABI } from '../helpers';

var _ = require('underscore');

class AchievementManager {

  async init({ web3, netid }) {
    this.addresses = getAddresses(netid);
    const { ACHIEVEMENT_MANAGER_ADDRESS } = this.addresses;
    this.achievementManagerAbi = await getABI(getBranch(netid), 'AchievementManager');
    this.achievementManagerInstance = new web3.eth.Contract(this.achievementManagerAbi.abi, ACHIEVEMENT_MANAGER_ADDRESS);
  }

  async getAchievementById(achievementID) {
    // Validate ABI
    if (! this.achievementManagerInstance || ! this.achievementManagerInstance.methods.getAchievementById) return;

    // Call
    return this.achievementManagerInstance.methods.getAchievementById(achievementID).call();
  }

  async getReserved(achievementID) {
    // Validate ABI
    if (! this.achievementManagerInstance || ! this.achievementManagerInstance.methods.balance) return;

    // Call
    return this.achievementManagerInstance.methods.balance(achievementID).call();
  }

  async getLengthOfAchievements() {
    // Validate ABI
    if (! this.achievementManagerInstance || ! this.achievementManagerInstance.methods.getLengthOfAchievements) return;

    // Call
    return this.achievementManagerInstance.methods.getLengthOfAchievements().call();
  }

  async getAllAchievements({ handler, cb }) {
    if (! handler || ! cb) return;

    // Validate ABI
    if (! this.achievementManagerInstance || ! this.achievementManagerInstance.methods.getAllAchievementList) return;

    // Get achievement IDs
    var achievementIDs = await this.achievementManagerInstance.methods.getAllAchievementList().call();
    
    // Get achievement list by iterating IDs
    Promise.all(achievementIDs.map(async (id) => {
      await this.getAchievementById(id).then(achievement => handler(achievement));
    })).then(() => cb());
  }

  async getAllAchievementsByLength({ handler, cb }) {
    if (! handler || ! cb) return;

    // Validate ABI
    if (! this.achievementManagerInstance || ! this.achievementManagerInstance.methods.allAchievements) return;

    // Get achievement list length
    let length = await this.getLengthOfAchievements();

    // Get achievement list by iterating list indexes
    Promise.all(_.range(length).map(async (idx) => {
      let achievementID = await this.achievementManagerInstance.methods.allAchievements(idx).call();
      await this.getAchievementById(achievementID).then(achievement => handler(achievement));
    })).then(() => cb());
  }

  /**
   * 
   * @param {uint256[]} topics 
   * @param {address[]} issuers 
   * @param {bytes32} title 
   * @param {bytes32} explanation 
   * @param {uint256} reward 
   * @param {string} uri 
   */
  createAchievement(topics, issuers, title, explanation, reward, uri) {
    // Validate ABI
    if (! this.achievementManagerInstance || ! this.achievementManagerInstance.methods.createAchievement) return;

    // Return transaction param
    return {
      request: this.achievementManagerInstance.methods.createAchievement(topics, issuers, title, explanation, reward, uri).send.request(),
      to: this.addresses.ACHIEVEMENT_MANAGER_ADDRESS,
      value: reward,
      data: this.achievementManagerInstance.methods.createAchievement(topics, issuers, title, explanation, reward, uri).encodeABI(),
    };
  }

  /**
   * 
   * @param {bytes32} id
   * @param {uint256} reward
   */
  updateAchievement(id, reward) {
    // Validate ABI
    if (! this.achievementManagerInstance || ! this.achievementManagerInstance.methods.updateAchievement) return;

    // Return transaction param
    return {
      request: this.achievementManagerInstance.methods.updateAchievement(id, reward).send.request(),
      to: this.addresses.ACHIEVEMENT_MANAGER_ADDRESS,
      value: reward,
      data: this.achievementManagerInstance.methods.updateAchievement(id, reward).encodeABI(),
    };
  }

  /**
   * 
   * @param {bytes32} id 
   * @param {uint256} reserve 
   */
  fundAchievement(id, reserve) {
    // Validate ABI
    if (! this.achievementManagerInstance || ! this.achievementManagerInstance.methods.fundAchievement) return;

    // Return transaction param
    return {
      request: this.achievementManagerInstance.methods.fundAchievement(id).send.request(),
      to: this.addresses.ACHIEVEMENT_MANAGER_ADDRESS,
      value: reserve,
      data: this.achievementManagerInstance.methods.fundAchievement(id).encodeABI(),
    };
  }
}

export {AchievementManager}