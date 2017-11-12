import "./Patient.sol";

pragma solidity ^0.4.8;

contract Doctor {
    bytes32 name;
    event PrescriptionCreated();

    function Doctor(bytes32 nameParam) public {
        name = nameParam;
    }

    function writePrescription(address patient, bytes32 drugDetails) public returns (uint id) {
        id = Patient(patient).addPrescription(this, drugDetails);
        PrescriptionCreated();
    }

    function getData() public constant returns (string) {
        return bytes32ToString(name);
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