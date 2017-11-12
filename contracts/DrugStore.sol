pragma solidity ^0.4.8;

import "./Patient.sol";

contract DrugStore {
    bytes32 name;
    event PrescriptionVerified();
    event PrescriptionDelivered();

    function DrugStore(bytes32 nameP) public {
        name = nameP;
    }

    function verify(address patient, uint prescriptionID) public returns (string) {
        var drugs, var qty = Patient(patient).getPrescriptionData(prescriptionID);
        return bytes32ToString(drugs);
        PrescriptionVerified();
    }

    function delivered(address patient, uint prescriptionID) public returns (bool) {
        return Patient(patient).prescriptionDelivered(prescriptionID);
        PrescriptionDelivered();
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
