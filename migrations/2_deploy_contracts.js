// Please fix this file in order to properly deploy your smart contract.
var UniSuperLedger = artifacts.require("./UniSuperLedger.sol");

module.exports = function(deployer) {
  deployer.deploy(UniSuperLedger);
};
