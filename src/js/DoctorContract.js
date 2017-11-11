import {default as contract} from 'truffle-contract';
import artifact from '../../build/contracts/Doctor.json';

var Doctor = contract(artifact);

function alertUser(alertLevel, alertText) {
  $("#alertUser").html('<div id="alertBox" class="alert alert-' + alertLevel + ' alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + alertText + '</div>')
  $("#alertUser").show();
}

var DoctorManager = {

  address: null,
  doctorAddress: null,

  start: function() {
    var self = this;

    Doctor.setProvider(window.web3.currentProvider);

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

    Doctor.deployed().then((instance) => {
      $('#addressButton').html('<button type="button" class="btn btn-outline-warning" data-clipboard-text="'+ instance.address + '"><i class="fa fa-key" aria-hidden="true"></i></button>')
    });

    return true
  },

  writePrescription: function(patientAddress, drugName, quantity) {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Doctor.deployed().then(function(instance) {
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
        alertUser("danger","<strong>Error writing prescription!!</strong> Possible error: Doctor ran out of ether")
      }

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },


  getData: function() {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    Doctor.deployed().then(function(instance) {
      return instance.getData.call({from: self.address});
    }).then(function(result) {

      console.log(result)

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error writing prescription!!</strong> Check logs!")
    });
  },

}

module.exports = DoctorManager