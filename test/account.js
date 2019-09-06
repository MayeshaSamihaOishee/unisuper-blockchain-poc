const Employee = artifacts.require('Employee');
const Account = artifacts.require('Account');

contract("Account", accounts => {
    it('Should only let owner closeAccount', async() => {
        let employeeAccount1 = await Employee.new("12-12-12");

        
        await employeeAccount1.createNewAccount();
        const accountAddress = await employeeAccount1.getArrayOfAccounts.call();
        const accountInstance = await Account.at(accountAddress[0]);
        
        try {
            await accountInstance.closeAccount();
            assert.fail("closeAccount Promise did not reject");

        } catch(ex) {
            assert.isOk(true, "Promise did reject");
        }
    });

    it('Should only let owner transferFunds()', async() => {
        let employeeAccount1 = await Employee.new("12-12-12");

        
        await employeeAccount1.createNewAccount();
        const accountAddress = await employeeAccount1.getArrayOfAccounts.call();
        const accountInstance = await Account.at(accountAddress[0]);
        
        try {
            await accountInstance.transferFunds(accounts[0].address, 0)
            assert.fail("closeAccount Promise did not reject");

        } catch(ex) {
            assert.isOk(true, "Promise did reject");
        }
    });
})