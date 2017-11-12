
var Patient = artifacts.require("./Patient.sol");

module.exports = function(deployer) {
  deployer.deploy(Patient, "PAT2017LAUZ001", "AXAHEALTH01", "AXA health insurance");
  deployer.deploy(Patient, "PAT2017LAUZ002", "AXAHEALTH02", "AXA health insurance");
  deployer.deploy(Patient, "PAT2017LAUZ003", "AXAHEALTH03", "AXA health insurance");
  deployer.deploy(Patient, "PAT2017LAUZ004", "AXAHEALTH04", "AXA health insurance");
  deployer.deploy(Patient, "PAT2017LAUZ005", "AXAHEALTH05", "AXA health insurance");
  deployer.deploy(Patient, "PAT2017LAUZ006", "AXAHEALTH06", "AXA health insurance");

};
