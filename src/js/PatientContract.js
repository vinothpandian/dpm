import {default as contract} from 'truffle-contract';
import artifact from '../../build/contracts/Patient.json';

var Patient = contract(artifact);

function alertUser(alertLevel, alertText) {
  $("#alertUser").html('<div id="alertBox" class="alert alert-' + alertLevel + ' alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + alertText + '</div>')
  $("#alertUser").show();
}

var PatientManager = {

  address: null,
  patientAddress: null,

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
    this.getAddress()

    Patient.deployed().then((instance) => {
      $('#addressButton').html('<button type="button" class="btn btn-outline-warning" data-clipboard-text="'+ instance.address + '"><i class="fa fa-key" aria-hidden="true"></i></button>')
    });

    return true
  },

  getAddress: function () {
    var self = this;

    Patient.deployed().then(function(instance) {
      self.patientAddress = instance.address;
    })

    console.log(self.patientAddress)
  },

  addPrescription: function(patientAddress, drugName, quantity) {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.addPrescription(patientAddress, drugName, quantity, {from: self.address});
    }).then(function(result, ret) {

      console.log(ret)

      for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];
        if (log.event == "PrescriptionDelivered") {

          alertUser("success","<strong>Prescription written!!</strong>")
          break;
        }
      }

      alertUser("success","<strong>Prescription written!!</strong>")

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

      console.log(result.valueOf())

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

  getPrescriptionHistoryCount: function() {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.getPrescriptionHistoryCount.call({from: self.address});
    }).then(function(result) {

      console.log(result.valueOf())

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

  getDetails: function() {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.getDetails.call({from: self.address});
    }).then(function(result) {

      console.log("result")

      $("#ptssn").text(result[0])
      $("#insid").text(result[1])
      $("#insName").text(result[2])

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

  getPrescriptionData: function(i) {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.getPrescriptionData.call(i, {from: self.address});
    }).then(function(result) {

      console.log(result)

      var drugs = result[0].split(',');
      var qty = result[1].split(',');

      for (i = 0; i < drugs.length; i++) {
        $('#tbl tbody').append("<tr><td>" + drugs[i] + "</td><td>" + qty[i] + "</td></tr>")
      }
    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

  getPrescriptionHistory: function(i) {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.getPrescriptionHistory.call(i, {from: self.address});
    }).then(function(result) {

      console.log(result)

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

  prescriptionDelivered: function(prescriptionID) {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Patient.deployed().then(function(instance) {
      return instance.prescriptionDelivered(prescriptionID, {from: self.address});
    }).then(function(result) {

      var success = false

      for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];
        if (log.event == "PrescriptionDelivered") {
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

}

module.exports = PatientManager