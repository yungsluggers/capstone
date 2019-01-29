import React, { Component } from 'react'

import Introduction from './Introduction'
import LabelSelection from './LabelSelection'
import Rendering from './Rendering'
import Output from './Output'


class Widget extends Component {
  //constructor? 

  state = {
    step: 1,
    label: '',
    //percent: '',
    //stopped: false,
    //download/startover
  }

  reset = () => {
    const { step } = this.state
    this.setState({
      step: 1,
      label: ''
    })
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({
      step: step + 1
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
  }

  handleChange = input => event => {
    this.setState({ [input] : event.target.value })
  }


  render() {
    console.log(this.state.step)

    const {step} = this.state
    const { label } = this.state;
    const values = { label };

    switch(step) {
      
      case 1:
        return (
          <Introduction
            nextStep = {this.nextStep} 
            handleChange = {this.handleChange}
            values = {values}
            />
        )

      case 2:
        return (
          <LabelSelection 
            nextStep = {this.nextStep} 
            prevStep = {this.prevStep}
            handleChange = {this.handleChange}
            values = {values}
            />
        )

      case 3: 
        return (
          <Rendering 
            nextStep = {this.nextStep} 
            prevStep = {this.prevStep}
            handleChange = {this.handleChange}
            values = {values}
            />
        )

      case 4:
        return (
          <Output
            reset = {this.reset} 
            prevStep = {this.prevStep}
            handleChange = {this.handleChange}
            values = {values}
            />
        )
      
      default: console.log('default case');
      
    }

  }
}

export default Widget