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

class App extends Component {

  componentDidMount () {


    const Instascan = require('instascan');

    let scanner = new Instascan.Scanner({
      video: document.getElementById('preview') });
    scanner.addListener('scan', function (content) {
      document.location.href = "http://localhost:8080/patient/"+content
    });
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    })
  }

  render () {
    return (
      <div>
        <div className="section text-center py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-3">Scan QR code</h1>
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
        <div className="row justify-content-center align-items-center">
          <div className="col-auto">
            <img src={doctorLogo} alt="Doctor Logo" width="500"/>
          </div>
          <div className="col-auto">
            <video id="preview" width="500"></video>
          </div>
        </div>
        <div id="alertUser" className="text-center"></div>
      </div>
    )
  }
}

render(<Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/patient/:id" component={Patient}/>
    </Switch>
  </Router>
  , document.getElementById('react-container'))

