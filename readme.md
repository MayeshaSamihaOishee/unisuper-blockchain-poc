# UniSuper Blockchain Project

Blockchain provides a censorship resistant platform so that users can enter a system, knowing ahead of time how that system will behave. The rules of the game are immutable and this provides users who are seeking critical assurance with necessary peace of mind.

## Contents
1. [Prerequisites]()
2. [How To's]()
3. [Adding changes]()

## Prerequisites
1. Node.js, this is available here
2. install truffle using: `npm -install -g truffle`,
3. Install [Ganache](https://www.trufflesuite.com/ganache)

## How to: Compile and interact with the ledger
#### STEP 1: Check your truffle-config
Your truffle config file should look similiar to the below:
```
module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // This port needs to match the one you set in Ganache
     network_id: "*",       // Any network (default: none)
    },
  },
  mocha: {
  },
  compilers: {
    solc: {
    }
  }
}
```

#### STEP 2: Launch Ganache GUI
[x] Insure you use set the port and IP to the same address destination as the truffle-config file
[x] Insure you add the `truffle-config.js` to your projects so that you can see the deployed contracts

#### STEP 3: Compile contract source code
sNavigate to your project root directory and run: `truffle compile`

#### STEP 4: Open truffle console
When in the root directory of the project, please use `truffle console` to launch the truffle console which you will use to interact with your deployed contracts

#### STEP 5: Migrate (run deployment scripts)
run the 'migrate' command inside your truffle console.
`truffle(development) > migrate`

#### STEP 6: Store an instance of your employee contract
During migration an instance of the Employee contract was deployed, you can interact with the instance by storing it and refering to this variable
`truffle(development) > let instance = await Employee.deployed()`

#### STEP 7: Deploy Account contract using newContract() method
You can then use Contract methods by interacting with the instance object as follows:
`truffle(development) > instance.setPayoutAddress("0x26e94F868f9D48B2A7De634cC2BcE297BE1Cdb15")`

   - NOTE: You should be able to view the state of the contract by accessing the Ganache 'Contracts' tab and selecting the 'Employee' contract, which should now reflect a payoutAddress that is equivalent to the one above!

#### STEP 8: Deploy Account contract using createAccount() method
Now that you have an instance stored you can create a new Account as follows
`truffle(development) > instance.createAccount()`

   - Checking the Ganache instance, you should be able to view the address of the created smart contract and therefore you should be able to use methods that rely on the account contract's address (such as deleteAccount())

`truffle(development) > instance.deleteAccount("<address>")`

   - NOTE: Running this method twice will result in an error, which you can see is due to the contract having changed the state of the AccountStatus variable to closed. The function closeAccount() require's that the account is still open.

## How to: Write tests for contracts in Solidity
Truffle has two great articles on writing tests.
1. [Writing Tests in Solidity](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-solidity)
2. [Writing Tests in JavaScript](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript)

Unfortunately there is a known [GIT issue](https://github.com/trufflesuite/truffle/issues/1630) which prevents users from being able to write tests directly in Solidity if they are using Windows 10. As several of our team members use Windows 10 we need to account for this, therefore we will use method (2) and write tests directly in Javascript.

## How to: Interface with the contracts using web3.eth
// To be completed next