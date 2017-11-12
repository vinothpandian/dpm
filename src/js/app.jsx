import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import React, { Component } from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'

import Patient from './patient'
import doctorLogo from '../assets/doctor.svg'

$(window).on('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://192.33.203.60:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://192.33.203.60:8545'))
  }

  render(<Router>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/patient/:id" component={Patient}/>
      </Switch>
    </Router>
    , document.getElementById('react-container'))

})


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      link : ""
    };

  }

  componentDidMount () {

    var self = this;


    const Instascan = require('instascan');

    let scanner = new Instascan.Scanner({video: document.getElementById('preview') });

    scanner.addListener('scan', function (content) {
      this.setState({
        link: <NavLink className="btn btn-success mt-3 btn-block" to={"/patient/"+content}>Confirm</NavLink>
      })
    }.bind(this));

    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    })

    console.log(self.text)

  }

  render () {

    return (
      <div>
        <div className="section text-center py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <img className="justify-content-start" src={doctorLogo} alt="Doctor Logo" width="200"/>
                <h1 className="display-3">Doctor's portal</h1>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-md text-center bg-danger navbar-inverse">
          <div className="container">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
            <div className="collapse navbar-collapse text-center justify-content-center" id="navbar2SupportedContent">
            </div>
          </div>
        </nav>
        <div className="row justify-content-center align-items-center pt-5">
          <div className="col-auto">

          </div>
          <div className="col-auto">
            <h3>Scan Patient's QR code</h3>
            <video className="align-self-center" id="preview" width="500"></video>
            <div id="patientID">
              {this.state.link}
            </div>
          </div>
        </div>
        <div id="alertUser" className="text-center"></div>
      </div>
    )
  }
}



