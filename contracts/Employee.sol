pragma solidity ^0.5.0;

import './helpers/SafeMath.sol';
import './Account.sol';

contract Employee {
    using SafeMath for *;

    enum AccountStatusType {
        closed,
        open
    }
    enum AccountAccumulationType {
        Accumulation1,
        Accumulation2,
        DefinedBenefitDivision,
        PersonalAccount,
        Pension
    }

    address payable public EmployeeId;
    address public SpouseId;
    address payable public EmployeeAddress;
    address public PayoutAddress;
    uint32 public Counter;
    string public DOB;

    mapping (address => Account) Accounts;
    Account[] arrayOfAccounts;
    event LogCreateNewAccount(Account loggedAccount);

<<<<<<< HEAD
    event LogDebugger(string debugEvent);
    
    constructor(string memory dob) public {
        EmployeeAddress = msg.sender;
=======

    constructor(string memory dob, address payable _empAddress) public {
        EmployeeAddress = _empAddress;
>>>>>>> UniSuperLedger Frontend Intrigration
        EmployeeId = address(this);
        DOB = dob;
        Counter = 0;
    }

//Modifier for owner access permission 
    modifier onlyOwner (address _address){
        require(msg.sender == _address, "Invalid Authentication");
    _;
    }

    function setPayoutAddress(address payoutAddress) public onlyOwner(EmployeeAddress){
        require(msg.sender == EmployeeAddress, "Invalid Authorization");
        PayoutAddress = payoutAddress;
    }

    function addSpouse(address payable spouseId) public onlyOwner(EmployeeAddress){
        require(SpouseId == address(0), "employee already has a spouse registered");
        SpouseId = spouseId;
    }

    function removeSpouse(address payable spouseId) public onlyOwner(EmployeeAddress){
        require(SpouseId != address(0), "employee does not have a spouse registered");
        if(SpouseId == spouseId) {
            SpouseId = address(0);
        }
    }

    function changePayoutAddress(address payable payoutAddress) public onlyOwner(EmployeeAddress){
        PayoutAddress = payoutAddress;
    }

    function createNewAccount() public onlyOwner(EmployeeAddress){
        require(msg.sender == EmployeeAddress, "Invalid Authorization");
        Account tempAccountStore = new Account(EmployeeId, Account.AccountAccumulationType.Accumulation1);
        Accounts[address(tempAccountStore)] = tempAccountStore;
        arrayOfAccounts.push(tempAccountStore);
    }

    function deleteAccount(address accountAddress) public onlyOwner(EmployeeAddress){
        require(address(Accounts[accountAddress]) != address(0), 'Account has not been created');
        Accounts[accountAddress].closeAccount();
    }


    function transferFundsBetweenAccounts(address payable payTo, address payable payFrom, uint amount) public onlyOwner(EmployeeAddress){
        if(Accounts[payTo].AccountStatus() == Account.AccountStatusType.open){
            Accounts[payFrom].transferFunds(payTo, amount);
        }
    }

    function payVoluntaryContribution(address payable accountAddress, uint amount) public onlyOwner(EmployeeAddress){
        if (msg.sender == EmployeeId && address(this).balance > amount) {
            accountAddress.transfer(amount);
        }


        // Add administrative abilities and behaviours

    }

    // Creating testable code

    function getArrayOfAccounts() public view  returns (Account[] memory) {
        return arrayOfAccounts;
    }

    function checkAccountClosed(address accountAddress) public view returns (bool) {
        return Accounts[accountAddress].AccountStatus() == Account.AccountStatusType.closed;
    }

    function () external payable {}
}