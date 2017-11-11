import "./Patient.sol";
import "./Doctor.sol";

pragma solidity ^0.4.8;

contract Prescription {
    address doctor;
    address patient;
    bytes32 drugName;
    bool delivered;

    function Prescription(address doctorP, address patientP, bytes32 drugNameP, bool deliveredP) public {
        doctor = doctorP;
        patient = patientP;
        drugName = drugNameP;
        delivered = deliveredP;
        Patient(patient).addPrescription(this);
    }

    function getDelivered() public returns(bool) {
        return delivered;
    }

    function deliver() public {
        delivered = true;
    }

    function getData() public returns (string) {
        Doctor d = Doctor(doctor);
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
