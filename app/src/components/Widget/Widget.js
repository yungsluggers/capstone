import React, { Component } from 'react'

import Introduction from './Introduction'
import LabelSelection from './LabelSelection'
import Rendering from './Rendering'
import Output from './Output'

class Widget extends Component {
  state = {
    step: 1,
    label: null,
    id: null
  }

  reset = () => {
    const { step } = this.state
    this.setState({
      step: 1
    })
  }

  nextStep = (id, label) => {
    const { step } = this.state
    console.log(id, label)
    this.setState({
      step: step + 1,
      label,
      id
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value })
  }

  render() {
    const { step } = this.state

    switch (step) {
      case 1:
        return (
          <Introduction
            nextStep={this.nextStep}
            handleChange={this.handleChange}
          />
        )

      case 2:
        return (
          <LabelSelection
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        )

      case 3:
        return (
          <Rendering
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            label={this.state.label}
            id={this.state.id}
          />
        )

      case 4:
        return (
          <Output
            reset={this.reset}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        )

      default:
        console.log('default case')
    }
  }
}

export default Widget
