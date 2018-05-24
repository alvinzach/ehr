pragma solidity  ^0.4.11;
contract Master{

modifier onlyOwner {
    require(msg.sender == masterAccount);
    _;
}
mapping (address=>address) private  patients ;

function addRecord(address _patient,address _contract) onlyOwner returns(address){
    patients[_patient]=_contract;
    return patients[_patient];
}
function returnRecord(address _patient) constant onlyOwner returns(address) {
    return patients[_patient];
} 
}