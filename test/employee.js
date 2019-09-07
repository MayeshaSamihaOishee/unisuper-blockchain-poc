const Employee = artifacts.require('Employee');
const Account = artifacts.require('Account');
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

contract("Employee", accounts => {
    
    
    it("Should have valid date of birth", async() => {
        const employee = await Employee.new("12-12-12");
        const dob = await employee.DOB.call();
        assert.equal(dob,
            "12-12-12",
        "Employee has incorrect date of birth")
    })
        
    it('Should have null payoutAddress when initialised', async() =>{
        const employee = await Employee.new("14-10-19");
        const initialPayOutAddress = await employee.PayoutAddress.call();
        assert.equal(initialPayOutAddress, NULL_ADDRESS, "Employees initial payout is incorrect")

    });

    it('Should have null spouseId when initialised', async() =>{
        const employee = await Employee.new("10-10-10");
        const initialSpouseId = await employee.SpouseId.call();
        assert.equal(initialSpouseId, NULL_ADDRESS, "Employees initialised spouseId is incorrect")

    });

    it('Should have 0 counter (no accounts) when initialised', async() =>{
        const employee = await Employee.new("10-10-10");
        const initialCounter = await employee.Counter.call();
        assert.equal(initialCounter, 0, "Counter is null when initialised")
    });

    it("Should increment account with createNewAccount() method", async() => {
        // Known bug: getArrayOfAccounts always returns empty array
        const employee = await Employee.new("12-12-12");
        await employee.createNewAccount();
        let arrayOfAccounts = await employee.getArrayOfAccounts();
        assert.equal(arrayOfAccounts.length, 1, "Account was not created");
    });
    
    it('Should create multiple accounts', async() => {
        // Known bug: getArrayOfAccounts always returns empty array
        const employee = await Employee.new("12-12-12");
        await employee.createNewAccount();
        let arrayOfAccounts = await employee.getArrayOfAccounts();
        assert.equal(arrayOfAccounts.length, 1, "Account was not created")

        await employee.createNewAccount();
        arrayOfAccounts = await employee.getArrayOfAccounts();
        assert.equal(arrayOfAccounts.length, 2, "Account was not incremented");
    });

    it('Should have valid EmployeeId', async() => {
        const employee = await Employee.new("12-12-12");
        const employeeID = await employee.EmployeeId.call();

        assert.equal(employee.address, employeeID, "INVALID Employee ID");
    });



    it('Should set payout address correctly' , async() =>{
        const employee = await Employee.new("01-01-15");
        const inputPayoutAddress = "0x74eB2DD8A9fb621d0B35ECa29149152c2431E1CE"
        await employee.setPayoutAddress(inputPayoutAddress);
        const actualPayoutAddress = await employee.PayoutAddress.call();
        assert.equal(actualPayoutAddress, inputPayoutAddress, "INVALID payment address" )

    });

    it('should add valid spouseID', async() =>{
        const employee = await Employee.new("02-03-04");
        const inputSpouseId = "0x91cC32D5380Cc549fd4f3349671Ec4b792d457A4"
        await employee.addSpouse(inputSpouseId);
        const actualSpouseId = await employee.SpouseId.call();
        assert.equal(actualSpouseId, inputSpouseId, 'INVALID spouseId')
    });

    it('Should delete account' , async() =>{
        const employee = await Employee.new('10-11-12');

        await employee.createNewAccount();

        const inputAccountAddress = await employee.getArrayOfAccounts();
        await employee.deleteAccount(inputAccountAddress[0]);
        const isAccountClosed = await employee.checkAccountClosed(inputAccountAddress[0]);
        assert.isTrue(isAccountClosed, ' Account is not deleted')
    });

   it('should not delete spouseID, if spouse has not been added', async() =>{
        const employee = await Employee.new("02-03-04");
        const inputSpouseId = "0x4D0687f460800954675cD115c04eBc7eb8fA28A8";

        try{
            await employee.removeSpouse(inputSpouseId);
            assert.isOk(false, "Promise does not reject")
        } catch(ex) {
            assert.isOk(true, "Promise correctly rejects due to no spouse");
        }
    });

    it('should delete spouseID', async() =>{
        const employee = await Employee.new("02-03-04");
        const inputSpouseId = "0x4D0687f460800954675cD115c04eBc7eb8fA28A8";
        await employee.addSpouse(inputSpouseId);
        await employee.removeSpouse(inputSpouseId);
        const actualSpouseId = await employee.SpouseId.call();
        assert.equal(actualSpouseId, NULL_ADDRESS, 'spouseId not Deleted')
    });

})