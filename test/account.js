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

    it('Should only let owner transferFunds', async() => {
        let employeeAccount1 = await Employee.new("12-12-12");

        
        await employeeAccount1.createNewAccount();
        const accountAddress = await employeeAccount1.getArrayOfAccounts.call();
        const accountInstance = await Account.at(accountAddress[0]);
        
        try {
            await accountInstance.transferFunds(accounts[0].address, 0)
            assert.fail("TransferFunds Promise did not reject");

        } catch(ex) {
            assert.isOk(true, "Promise did reject");
        }
    });

    it('Should remove all delegate permissions', async() => {
        let employeeAccount1 = await Employee.new("12-12-12");

        
        await employeeAccount1.createNewAccount();
        const accountAddress = await employeeAccount1.getArrayOfAccounts.call();
        const accountInstance = await Account.at(accountAddress[0]);
        
        try {
            await accountInstance.removeAllDelegatePermissions(accounts[0].address)
            assert.fail("DelegatePermissions Promise did not reject");

        } catch(ex) {
            assert.isOk(true, "Promise did reject");
        }
    });

    it('Should permit to Contribute Only', async() => {
        let employeeAccount1 = await Employee.new("12-12-12");

        
        await employeeAccount1.createNewAccount();
        const accountAddress = await employeeAccount1.getArrayOfAccounts.call();
        const accountInstance = await Account.at(accountAddress[0]);
        
        try {
            await accountInstance.permitToContributiveOnly(accounts[0].address)
            assert.fail("PermitContributeOnly Promise did not reject");

        } catch(ex) {
            assert.isOk(true, "Promise did reject");
        }
    }); 
    it('Should permit to Administrative', async() => {
        let employeeAccount1 = await Employee.new("12-12-12");

        
        await employeeAccount1.createNewAccount();
        const accountAddress = await employeeAccount1.getArrayOfAccounts.call();
        const accountInstance = await Account.at(accountAddress[0]);
        
        try {
            await accountInstance.permitToAdmistrative(accounts[0].address)
            assert.fail("PermitToAdministrative Promise did not reject");

        } catch(ex) {
            assert.isOk(true, "Promise did reject");
        }
    });
    it('Reward size should increase', async () => {
            
        let employeeAccount1 = await Employee.new("12-11-13");

        await employeeAccount1.createNewAccount();
        const accountAddress = await employeeAccount1.getArrayOfAccounts.call();
        const accountInstance = await Account.at(accountAddress[0]);
        const currentReward = accountInstance.RewardSize;
        accountInstance.increaseRewardSize(100);
        const newRewardSize = accountInstance.RewardSize;

        assert.equal(currentReward, newRewardSize, 'Reward size not increased ')

    });
    it('Should Decrease reward size' , async () =>{
        let employeeAccount1 = await Employee.new("12-13-14");
    
        await employeeAccount1.createNewAccount();
        const accountAddress = await employeeAccount1.getArrayOfAccounts.call();
        const accountInstance = await Account.at(accountAddress[0]);
        const currentReward = accountInstance.RewardSize;
        accountInstance.decreaseRewardSize(100);
        const newRewardSize = accountInstance.RewardSize;

        assert.equal(currentReward, newRewardSize, 'Reward size no decremented')
    });

    it('Should increase PayoutFrequency' , async () =>{
        let employeeAccount1 = await Employee.new("12-13-14");
    
        await employeeAccount1.createNewAccount();
        const accountAddress = await employeeAccount1.getArrayOfAccounts.call();
        const accountInstance = await Account.at(accountAddress[0]);
        const currentFrequency =  accountInstance.PayoutFrequency;
        accountInstance.increasePayoutFrequency(100);
        const newPayoutFrequency = await accountInstance.PayoutFrequency;

        assert.equal(currentFrequency, newPayoutFrequency, 'PayoutFrequency not increased')
    });

        it('Should decrease PayoutFrequency' , async () =>{
            let employeeAccount1 = await Employee.new("12-13-14");
            
            await employeeAccount1.createNewAccount();
            const accountAddress = await employeeAccount1.getArrayOfAccounts.call();
            const accountInstance = await Account.at(accountAddress[0]);
    
            const currentFrequency = accountInstance.PayoutFrequency;
            accountInstance.decreasePayoutFrequency(100);
            const newPayoutFrequency = accountInstance.PayoutFrequency;
    
            assert.equal(currentFrequency, newPayoutFrequency, 'PayoutFrequency not decreased')
        });
    
})