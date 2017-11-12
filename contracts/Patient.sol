import "./Prescription.sol";

pragma solidity ^0.4.8;

contract Patient {
    bytes32 ssn;
    bytes32 insuranceId;
    bytes32 insuranceName;
    uint noOfPrescriptions;
    uint noOfHistories;

    mapping (address => Prescription) prescriptions;
    mapping (uint => address) prescriptions_idx;
    mapping (uint => address) histories;

    event PrescriptionRemoved(address prescription);

    function Patient(bytes32 ssnParam, bytes32 insuranceIdParam, bytes32 insuranceNameParam) public {
        ssn = ssnParam;
        insuranceId = insuranceIdParam;
        insuranceName = insuranceNameParam;
        noOfPrescriptions = 0;
        noOfHistories = 0;
    }

    function getNoOfPrescriptions() public returns (uint) {
        return noOfPrescriptions;
    }

    function getNoOfHistories() public returns (uint) {
        return noOfHistories;
    }

    function addPrescription(address prescription) public {
        prescriptions_idx[noOfPrescriptions] = prescription;
        prescriptions[prescription] = Prescription(prescription);
        noOfPrescriptions++;
    }

    function getPrescription(uint i) public returns (address prescriptionAddress, string drugName, address patientAddress, address doctorAddress, bool delivered) {
        prescriptionAddress = prescriptions_idx[i];
        var prescription = prescriptions[prescriptionAddress];
        drugName = bytes32ToString(prescription.getDrugName());
        patientAddress = prescription.getPatient();
        doctorAddress =  prescription.getDoctor();
        delivered = prescription.getDelivered();
    }

    function getHistoryPrescription(uint i) public returns (address prescriptionAddress, string drugName, address patientAddress, address doctorAddress, bool delivered) {
        prescriptionAddress = histories[i];
        var prescription = Prescription(prescriptionAddress);
        drugName = bytes32ToString(prescription.getDrugName());
        patientAddress = prescription.getPatient();
        doctorAddress =  prescription.getDoctor();
        delivered = prescription.getDelivered();
    }

    function removePrescription(address prescription) public {
        // get the id
        uint prescriptionId = prescriptions[prescription].getId();
        noOfPrescriptions--;

        // get last obj
        address lastPrescription = prescriptions_idx[noOfPrescriptions];

        // move the last to the removed idx
        prescriptions_idx[prescriptionId] = prescriptions_idx[noOfPrescriptions];

        // update the last obj id
        prescriptions[lastPrescription].setId(prescriptionId);
        delete prescriptions[prescription];
        delete prescriptions_idx[noOfPrescriptions];

        histories[noOfHistories] = prescription;
        noOfHistories++;
        PrescriptionRemoved(prescription);
    }

    function validPrescription(Prescription prescription) public returns (bool) {
        return existPrescription(prescription) && prescription.getDelivered() == false;
    }

    function existPrescription(Prescription prescription) public returns (bool) {
        var data = prescriptions[prescription];
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