
var Doctor = artifacts.require("./Doctor.sol");
var DrugStore = artifacts.require("./DrugStore.sol");
var Patient = artifacts.require("./Patient.sol");

module.exports = function(deployer) {
  deployer.deploy(DrugStore, "drug");
  deployer.deploy(Doctor, "doc");
  deployer.deploy(Patient, "ssn", "insid", "insname");
};
