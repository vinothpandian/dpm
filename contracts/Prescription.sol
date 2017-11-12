import "./Patient.sol";

pragma solidity ^0.4.8;

contract Prescription {
    uint id;
    address doctor;
    address patient;
    bytes32 drugName;
    bool delivered;

    function Prescription(address doctorP, address patientP, bytes32 drugNameP, bool deliveredP) public {
        doctor = doctorP;
        patient = patientP;
        drugName = drugNameP;
        delivered = deliveredP;
    }

    function getId() public returns(uint) {
        return id;
    }

    function setId(uint newId) public {
        id = newId;
    }

    function getDoctor() public returns(address) {
        return doctor;
    }

    function getPatient() public returns(address) {
        return patient;
    }

    function getDrugName() public returns(bytes32) {
        return drugName;
    }

    function getDelivered() public returns(bool) {
        return delivered;
    }

    function deliver() public {
        delivered = true;
        Patient(patient).removePrescription(this);
    }

    function getData() public returns (string) {
        return bytes32ToString(drugName);
    }

    function bytes32ToString(bytes32 x) private returns (string) {
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
