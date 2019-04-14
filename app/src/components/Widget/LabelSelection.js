import React, { Component } from 'react'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import makeAnimated from 'react-select/lib/animated'

import Button from './../Button/Button'
import ButtonRow from './../Button/ButtonRow'

import VirtualizedDropdown from './VirtualizedDropdown'

import options from './../../data/labels.json'

class Introduction extends Component {
  nextStep = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  back = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    return (
      <div>
        <label htmlFor="label-select">
          <p>Select up to two labels and genetic priority</p>
        </label>

        <VirtualizedDropdown options={options} />

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
