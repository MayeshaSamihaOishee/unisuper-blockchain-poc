pragma solidity >=0.4.22 <0.7.0;

contract HelloWorld {

 address owner = msg.sender; //set owner as msg.sender
 bytes32 stateofcontract="unknown";
 uint statenum=1;

struct State {
    uint num;
    bytes32 state;
}
mapping (address => State) instructors; // stores num,state in instructors

address[] public addarray; // stores all addresses

function setState(address _address, uint _num, bytes32 _state) public
{

State storage s = instructors[_address];
s.num = _num;
s.state = _state;
addarray.push(_address);

uint time = now;

 if (now >= time && time > 10) 
 {
  stateofcontract = "I am Alive";
    time = 0;
     }
    else {
        stateofcontract = "I am Missing";
    }

}
    }
