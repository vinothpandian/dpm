var Prescription = artifacts.require("./Prescription.sol");
var Doctor = artifacts.require("./Doctor.sol");
var DrugStore = artifacts.require("./DrugStore.sol");
var Patient = artifacts.require("./Patient.sol");

module.exports = function(deployer) {
  deployer.deploy(Prescription);
  deployer.deploy(Doctor);
  deployer.deploy(DrugStore);
  deployer.deploy(Patient);
};
