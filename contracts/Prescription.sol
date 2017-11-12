import "./Patient.sol";

pragma solidity ^0.4.8;

contract Prescription {
    uint id;
    address doctor;
    address patient;
    bytes32 drugName;
    bool delivered;

    function Prescription(address doctorP, address patientP, bytes32 drugNameP, bool deliveredP) public {
        var p = Patient(patientP);
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
        var p = Patient(patient);
        p.removePrescription(this);
    }

    function getData() public constant returns (string) {
        return bytes32ToString(drugName);
      }

    function bytes32ToString(bytes32 x) private pure returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }
}
