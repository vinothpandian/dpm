import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Patient extends Component {
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

Patient.propTypes = {}
Patient.defaultProps = {}

export default Patient
