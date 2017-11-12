pragma solidity ^0.4.8;

import "./Patient.sol";

contract DrugStore {
    bytes32 name;

    function DrugStore(bytes32 nameP) public {
        name = nameP;
    }

    function verify(address patient, address prescription) public returns (string) {
        var p = Patient(patient);
        var pre = Prescription(prescription);
        if (p.validPrescription(pre)) {
            pre.deliver();
            pre.getData();
        }
    }
}
