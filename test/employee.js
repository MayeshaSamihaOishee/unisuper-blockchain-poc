const Employee = artifacts.require('Employee');

contract("Employee", accounts => {
    it("Should have valid date of birth", async() => {
        const employee = await Employee.new("12-12-12");
        const dob = await employee.DOB.call();
        assert.equal(dob,
            "12-12-12",
            "Employee has incorrect date of birth")
    })

    it("Should increment account with createNewAccount() method", async() => {
        const employee = await Employee.new("12-12-12");
        await employee.createNewAccount();


        const arrayOfAccounts = await employee.getArrayOfAccounts.call();
        assert.equal(arrayOfAccounts.length,
            1,
            "Account was not created")
    })
})