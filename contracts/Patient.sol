pragma solidity ^0.4.8;

contract Patient {
    bytes32 ssn;
    bytes32 insuranceId;
    bytes32 insuranceName;

    event PrescriptionDelivered();
    event PrescriptionCreated();

    struct Prescription {
        address doctorAddress;
        bytes32 drugDetails;
        bytes32 drugQty;
        bool delivered;

    }

    uint noOfPrescriptions;
    uint noOfHistories;

    mapping (uint => Prescription) prescriptions;
    mapping (uint => address) prescriptions_index;
    Prescription[] histories;

    event PrescriptionRemoved(address prescription);

    function Patient(bytes32 ssnParam, bytes32 insuranceIdParam, bytes32 insuranceNameParam) public {
        ssn = ssnParam;
        insuranceId = insuranceIdParam;
        insuranceName = insuranceNameParam;
        noOfPrescriptions = 0;
        noOfHistories = 0;
    }

    function addPrescription(address doctorAddress, bytes32 drugDetails, bytes32 drugQty) public returns (uint) {
        var prescription = Prescription(doctorAddress, drugDetails, drugQty, false);
        prescriptions[noOfPrescriptions] = prescription;
        noOfPrescriptions++;
        return noOfPrescriptions-1;
        PrescriptionCreated();
    }

    function isPrescriptionDelivered(uint id) private returns (bool){
        return prescriptions[id].delivered;
    }

    function getPrescriptionData(uint id) public returns (string drugs, string qty) {
        if(!isPrescriptionDelivered(id)) {
            drugs = bytes32ToString(prescriptions[id].drugDetails);
            qty = bytes32ToString(prescriptions[id].drugQty);
        }
    }

    function getPrescriptionHistoryCount() public constant returns(uint) {
        return histories.length;
    }

    function getPrescriptionHistory(uint id) public constant returns (string drugs, string qty) {
        drugs = bytes32ToString(histories[id].drugDetails);
        qty = bytes32ToString(histories[id].drugQty);
    }

    function prescriptionDelivered(uint id) public returns (bool) {
        histories.push(prescriptions[id]);
        noOfPrescriptions--;
        prescriptions[id] = prescriptions[noOfPrescriptions];
        delete prescriptions[noOfPrescriptions];
        PrescriptionDelivered();
        return true;
    }

    function getNoOfPrescriptions() public constant returns (uint) {
        return noOfPrescriptions;
    }

    function getDetails() public constant returns (string ssnRet, string insuranceIdRet, string insuranceNameRet) {
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