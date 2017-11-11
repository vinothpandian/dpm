import "bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { Component } from 'react'
import {render} from 'react-dom'

class App extends Component {
  render () {
    return (
      <div>
        <h1 className="display1">Hello from React</h1>
      </div>
  )

  }
}

render(<App /> , document.getElementById("react-container"))

