import {default as contract} from 'truffle-contract';
import artifact from '../../build/contracts/Patient.json';

var Patient = contract(artifact);

function alertUser(alertLevel, alertText) {
  $("#alertUser").html('<div id="alertBox" class="alert alert-' + alertLevel + ' alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + alertText + '</div>')
  $("#alertUser").show();
}

var PatientManager = {

  address: null,
  doctorAddress: null,

  start: function() {
    var self = this;

    Patient.setProvider(window.web3.currentProvider);

    window.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
    });

    this.address = window.web3.eth.coinbase

    Patient.deployed().then((instance) => {
      $('#addressButton').html('<button type="button" class="btn btn-outline-warning" data-clipboard-text="'+ instance.address + '"><i class="fa fa-key" aria-hidden="true"></i></button>')
    });

    return true
  },

  writePrescription: function(patientAddress, drugName, quantity) {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.writePrescription(patientAddress, drugName, {from: self.address});
    }).then(function(result) {

      var success = false



      for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];
        if (log.event == "PrescriptionCreated") {
          alertUser("success","<strong>Prescription written!!</strong>")
          success = true
          break;
        }
      }

      if (!success) {
        alertUser("danger","<strong>Error writing prescription!!</strong> Possible error: Patient ran out of ether")
      }

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },


  getNoOfPrescriptions: function() {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.getNoOfPrescriptions.call({from: self.address});
    }).then(function(result) {

      console.log(result)

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

  getNoOfHistories: function() {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.getNoOfHistories.call({from: self.address});
    }).then(function(result) {

      console.log(result)

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

  getData: function() {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.getData.call({from: self.address});
    }).then(function(result) {

      $("#ptssn").text(result[0])
      $("#insid").text(result[1])
      $("#insName").text(result[2])

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

  getPrescription: function(i) {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.getPrescription.call(i, {from: self.address});
    }).then(function(result) {

      console.log(result)

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

  getHistoryPrescription: function(i) {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.getHistoryPrescription.call(i, {from: self.address});
    }).then(function(result) {

      console.log(result)

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

  removePrescription: function(prescriptionAddress) {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.removePrescription(prescriptionAddress, {from: self.address});
    }).then(function(result) {

      console.log(result)

      // var success = false
      //
      // for (var i = 0; i < result.logs.length; i++) {
      //   var log = result.logs[i];
      //   if (log.event == "PrescriptionCreated") {
      //     alertUser("success","<strong>Prescription written!!</strong>")
      //     success = true
      //     break;
      //   }
      // }
      //
      // if (!success) {
      //   alertUser("danger","<strong>Error writing prescription!!</strong> Possible error: Patient ran out of ether")
      // }

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

}

module.exports = PatientManager