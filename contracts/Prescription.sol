import "./Patient.sol";

pragma solidity ^0.4.8;

contract Prescription {
    uint id;
    address doctor;
    address patient;
    bytes32 drugName;
    bool delivered;
    
    function Prescription(address doctorP, address patientP, bytes32 drugNameP, bool deliveredP) public {
        Patient p = Patient(patientP);
        doctor = doctorP;
        patient = patientP;
        drugName = drugNameP;
        delivered = deliveredP;
        id = p.getNoOfPrescriptions();
        p.addPrescription(this);
    }
    
    function getId() public constant returns(uint) {
        return id;
    }
    
    function setId(uint newId) public {
        id = newId;
    }
    
    function getDoctor() public constant returns(address) {
        return doctor;
    }
    
    function getPatient() public constant returns(address) {
        return patient;
    }
    
    function getDrugName() public constant returns(bytes32) {
        return drugName;
    }
    
    function getDelivered() public constant returns(bool) {
        return delivered;
    }
    
    function deliver() public {
        delivered = true;
        Patient p = Patient(patient);
        p.removePrescription(this);
    }
}
