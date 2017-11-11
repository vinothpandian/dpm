import {default as contract} from 'truffle-contract';
import artifact from '../../build/contracts/DrugStore.json';

var DrugStore = contract(artifact);

function alertUser(alertLevel, alertText) {
  $("#alertUser").html('<div id="alertBox" class="alert alert-' + alertLevel + ' alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + alertText + '</div>')
  $("#alertUser").show();
}

var DrugStoreManager = {

  address: null,
  doctorAddress: null,

  start: function() {
    var self = this;

    DrugStore.setProvider(window.web3.currentProvider);

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

    DrugStore.deployed().then((instance) => {
      $('#addressButton').html('<button type="button" class="btn btn-outline-warning" data-clipboard-text="'+ instance.address + '"><i class="fa fa-key" aria-hidden="true"></i></button>')
    });

    return true
  },

  verify: function(patientAddress, prescriptionAddress) {
    var self = this;

    alertUser("warning","<div class='loader'></div><strong class='ml-4'>Initiating Transaction!</strong> Please wait.... ")

    DrugStore.deployed().then(function(instance) {
      return instance.verify(patientAddress, prescriptionAddress, {from: self.address});
    }).then(function(result) {

      var success = false

      for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];
        if (log.event == "PrescriptionVerified") {
          alertUser("success","<strong>Prescription was not tampered!!</strong>")
          success = true
          break;
        }
      }

      if (!success) {
        alertUser("danger","<strong>Prescription not verified!!</strong> Possible error: Tampered prescription")
      }

    }).catch(function(e) {
      console.log(e);
      alertUser("danger","<strong>Error verifying prescription!!</strong> Check logs!")
    });
  }

}

module.exports = DrugStoreManager