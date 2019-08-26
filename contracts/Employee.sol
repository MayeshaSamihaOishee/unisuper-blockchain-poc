pragma solidity ^0.5.0;

import './helpers/SafeMath.sol';
import './Account.sol';

contract Employee {
    using SafeMath for *;

    enum AccountAccumulationType {
        Accumulation1,
        Accumulation2,
        DefinedBenefitDivision,
        PersonalAccount,
        Pension
    }

    address payable public EmployeeId;
    address public SpouseId;
    address public EmployeeAddress = msg.sender;
    address PayoutAddress;
    uint32 Counter;
    string public DOB;

    mapping (address => Account) Accounts;
    Account[] arrayOfAccounts;
    event LogCreateNewAccount(Account loggedAccount);


    constructor(string memory dob) public {
        //
        EmployeeId = address(this);
        DOB = dob;
        Counter = 0;
    }
    // modifier for autherization check
    modifier onlyEmployee(address _EmployeeAddress) {
        require(msg.sender == _EmployeeAddress, "Invalid Authorization");
    _;
    }

    function setPayoutAddress(address payoutAddress) public onlyEmployee(EmployeeAddress){
                EmployeeAddress = payoutAddress;
    }

    function addSpouse(address payable spouseId) public {
        require(SpouseId == address(0), "employee already has a spouse registered");
        SpouseId = spouseId;
    }

    function removeSpouse(address payable spouseId) public {
        require(SpouseId != address(0), "employee does not have a spouse registered");
        SpouseId = spouseId;
    }

    function changePayoutAddress(address payable payoutAddress) public{
        require(msg.sender == EmployeeAddress, "Invalid Authorization");
        PayoutAddress = payoutAddress;
    }

    function createNewAccount() public {
        require(msg.sender == EmployeeAddress, "Invalid Authorization");
        Account tempAccountStore = new Account(EmployeeId, Account.AccountAccumulationType.Accumulation1);
        Accounts[address(tempAccountStore)] = tempAccountStore;
    }

    function deleteAccount(address accountAddress) public {
        require(msg.sender == EmployeeAddress, "Invalid Authorization");
        Accounts[accountAddress].closeAccount();
    }

    function transferFundsBetweenAccounts(address payable payTo, address payable payFrom, uint amount) public {
        require(msg.sender == EmployeeAddress, "Invalid Authorization");
        if(Accounts[payTo].AccountStatus() == Account.AccountStatusType.open){
            Accounts[payFrom].transferFunds(payTo, amount);
        }
    }

    function payVoluntaryContribution(address payable accountAddress, uint amount) public {
        if (msg.sender == EmployeeId && address(this).balance > amount) {
            accountAddress.transfer(amount);
        }


        // Add administrative abilities and behaviours

    }

    // Creating testable code

    function getArrayOfAccounts() public view  returns (Account[] memory) {
        return arrayOfAccounts;
    }

    function () external payable {}
}