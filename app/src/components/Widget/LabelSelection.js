import React, { Component } from 'react'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import makeAnimated from 'react-select/lib/animated'

import Button from './../Button/Button'
import ButtonRow from './../Button/ButtonRow'

import VirtualizedDropdown from './VirtualizedDropdown'

import options from './../../data/9k.json'

class Introduction extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedOption: null, selectedLabel: null }
  }

  nextStep = e => {
    e.preventDefault()
    if (this.state.selectedOption && this.state.selectedLabel)
      this.props.nextStep(this.state.selectedOption, this.state.selectedLabel)
  }

  back = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  handleChange = selectedOption => {
    console.log('handlechange: ', selectedOption)
    this.setState({
      selectedOption: selectedOption.value,
      selectedLabel: selectedOption.label
    })
  }

  render() {
    return (
      <div>
        <label htmlFor="label-select">
          <p>Select a label</p>
        </label>

        <VirtualizedDropdown
          value={this.state.selectedOption}
          handleChange={this.handleChange}
          options={options}
        />

        <ButtonRow>
          <Button onClick={this.back}>Back</Button>
          <Button onClick={this.nextStep} filled>
            Next
          </Button>
        </ButtonRow>
      </div>
    )
  }
}

export default Introduction
