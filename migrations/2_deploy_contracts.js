// Please fix this file in order to properly deploy your smart contract.
var Employee = artifacts.require("./Employee.sol");
var Account = artifacts.require("./Account.sol");

module.exports = function(deployer) {
  deployer.then(async () => {
    deployer.deploy(Employee, '30-09-1983');
    await deployer.deploy(Account, 'add','dont add');
    
    })
  
};

