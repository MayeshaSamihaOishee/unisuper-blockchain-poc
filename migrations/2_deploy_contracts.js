// Please fix this file in order to properly deploy your smart contract.
// var Employee = artifacts.require("./Employee.sol");
var UniSuperLedger = artifacts.require("./UniSuperLedger.sol")
module.exports = function(deployer) {
  deployer.deploy(UniSuperLedger)
  // deployer.deploy(Employee, '30-09-1983');
};
