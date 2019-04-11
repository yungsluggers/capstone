import React, { Component } from 'react'
import Select from './ReactSelectFaster'
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

        {/* <Select
          isMulti
          components={MenuList}
          name="labels"
          data={options}
          filterOption={null}
        /> */}

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
