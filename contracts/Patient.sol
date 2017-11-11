import "./Prescription.sol";

pragma solidity ^0.4.8;

contract Patient {
    bytes32 ssn;
    bytes32 insuranceId;
    bytes32 insuranceName;

    mapping(address => Prescription) histories;
    mapping(address => Prescription) prescriptions;

    function Patient(bytes32 ssnParam, bytes32 insuranceIdParam, bytes32 insuranceNameParam) public {
        ssn = ssnParam;
        insuranceId = insuranceIdParam;
        insuranceName = insuranceNameParam;
    }

    function addPrescription(Prescription prescription) public {
        prescriptions[prescription] = prescription;
    }

    function validPrescription(Prescription prescription) public returns (bool) {
        return existPrescription(prescription) && prescription.getDelivered() == false;
    }

    function existPrescription(Prescription prescription) public returns (bool) {
        Prescription data = prescriptions[prescription];
        return data == prescription;
    }

    function getData() public returns (string ssnRet, string insuranceIdRet, string insuranceNameRet) {
        ssnRet = bytes32ToString(ssn);
        insuranceIdRet = bytes32ToString(insuranceId);
        insuranceNameRet = bytes32ToString(insuranceName);
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