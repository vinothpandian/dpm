import React, { Component } from 'react'
import PropTypes from 'prop-types'

import plusButton from "../assets/plus.svg"
import minusButton from "../assets/negative.svg"

class Patient extends Component {

  constructor(props) {
    super(props)

    this.state = {
      count : 1
    };

    this.handlePlusClick = this.handlePlusClick.bind(this)
    this.handleMinusClick = this.handleMinusClick.bind(this)
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

  render () {

    let forms= []



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
          <div className="col-4 p-5">
            <div id="patient-info">
              <h3>Patient information</h3>
            </div>
          </div>
          <div className="col-8 p-5">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" href="#">Prescription</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">History</a>
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
