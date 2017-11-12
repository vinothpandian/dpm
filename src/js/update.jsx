import React, { Component } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import DB from "../../db"
import * as PatientContract from './PatientContract'




class Update extends Component {

  constructor(props) {
    super(props)

  }

  componentDidMount () {
    var patientAddr = this.getUrlVars()["patient_addr"];
    var id = this.getUrlVars()["id"];

    console.log(patientAddr)
    console.log(id)

    PatientContract.start();
    PatientContract.getPrescriptionData(id);

    DB.tablets = $('#medicines').text()
    DB.qty = $('#qty').text()

  }

  getUrlVars()
  {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }

  render () {

    return (
      <div>
        <div id="address"></div>
        <div id="medicines"></div>
        <div id="qty"></div>
      </div>

    )
  }
}

Update.propTypes = {}
Update.defaultProps = {}

export default Update

render(<Update/>, document.getElementById("update-container"));

$(window).on('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  }



})