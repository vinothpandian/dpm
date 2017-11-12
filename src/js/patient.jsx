import React, { Component } from 'react'
import PropTypes from 'prop-types'

import plusButton from "../assets/plus.svg"
import minusButton from "../assets/negative.svg"

import PatientContract from "./PatientContract"

class Patient extends Component {

  componentDidUpdate (prevProps, prevState, prevContext) {
    $("#alertBox").removeClass("show");
  }

  constructor(props) {
    super(props)

    this.state = {
      count : 1
    };

    this.handlePlusClick = this.handlePlusClick.bind(this)
    this.handleMinusClick = this.handleMinusClick.bind(this)
    this.prescribe = this.prescribe.bind(this)
  }

  handlePlusClick(e){
    e.preventDefault()

    const newCount = this.state.count + 1

    this.setState({
      count: newCount
    })
  }

  handleMinusClick(e){
    e.preventDefault()

    $('#'+e.target.id).parent().parent().remove()

    const newCount = this.state.count

    this.setState({
      count: newCount
    })
  }

  prescribe(e) {
    e.preventDefault()

    let drugName = ""
    let qtyVal = ""

    PatientContract.start()


    PatientContract.getPrescriptionHistoryCount();

    for (var i = 0; i < this.state.count; i++) {
      let val = $("#tab"+i).val() +","
      let qty = $("#qty"+i).val() + ","
      drugName +=  val
      qtyVal += qty
    }

    PatientContract.addPrescription(PatientContract.patientAddress, drugName, qtyVal)


  }

  render () {

    let forms= []

    PatientContract.start()

    PatientContract.getDetails()

    for (var i = 0; i < this.state.count; i++) {
      forms.push(
        <tr key={"keyCpt"+i} id={"cpt"+i} className='entry'>
          <td className="medicine">
            <input className="form-control"  type="text" placeholder="eg. Tablet Name" id={"tab"+i}/>
          </td>
          <td className="number">
            <input className="form-control w-25"  placeholder={"0"} min={"0"} type="number" id={"qty"+i}/>
          </td>
          <td><button id={"removeButtton"+i} className ="btn-danger btn btn-small rounded-circle" onClick={this.handleMinusClick} >x</button></td>
          </tr>
      )

    }

    const Child = ({ match }) => (
      <div>
        <h3>ID: {match.params.id}</h3>
      </div>
    )

    const cardStyle = {
      width: "20rem"
    }

    return (
      <div>
        <div className="section text-center py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-3">Patient Panel</h1>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-md text-center bg-primary navbar-inverse">
          <div className="container">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
            <div className="collapse navbar-collapse text-center justify-content-center" id="navbar2SupportedContent">
            </div>
          </div>
        </nav>

        <div className="row justify-content-center">
          <div className="col-3 p-5">
            <div id="patient-info">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Patient information</h3>
                  <h6 className="card-subtitle mb-2 text-muted"><strong className="text-dark">ID: </strong><span id="ptssn"></span></h6>
                  <h6 className="card-subtitle mb-2 text-muted"><strong className="text-dark">Insurance ID: </strong><span id="insid"></span></h6>
                  <h6 className="card-subtitle mb-2 text-muted"><strong className="text-dark">Insurance Name: </strong><span id="insName"></span></h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9 p-5">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" href="#">Prescription</a>
              </li>
            </ul>

            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="prescription">
                <div id="table" className="table-editable">

                  <table className="table">
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Quantity</th>
                        <th><button className="table-add btn btn-small rounded-circle btn-success" onClick={this.handlePlusClick} id="addRow">+</button></th>
                      </tr>
                    </thead>
                    <tbody>
                    {forms}
                    </tbody>
                  </table>
                  <button className="btn btn-success" onClick={this.prescribe}>Prescribe</button>
                </div>
              </div>
              <div id="myModal" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <canvas id="qr" width="300" height="300"></canvas>
                  </div>
                </div>
              </div>

              <div role="tabpanel" className="tab-pane" id="prescription-history"></div>
            </div>
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
