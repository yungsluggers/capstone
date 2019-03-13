import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'

import Button from './../Button/Button'
import ButtonRow from './../Button/ButtonRow'

const options = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'human', label: 'Human' },
  { value: 'shoe', label: 'Shoe' },
  { value: 'cake', label: 'Cake' },
  { value: 'cake', label: 'Boat' },
  { value: 'frog', label: 'Frog' },
  { value: 'frog', label: 'Horse' },
]


class Introduction extends Component {

  nextStep = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  back = (e) => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {

    return (
      <div>

        <label htmlFor="label-select">
          <p>Select up to two labels and genetic priority</p>
        </label>

        <Select 
          isMulti
          components={makeAnimated()}
          name="labels"
          options={options}
        />

        <ButtonRow>
          <Button onClick={this.back}>Back</Button>
          <Button onClick={this.nextStep} filled>Next</Button>
        </ButtonRow>
        
      </div>
    )

  }
}

export default Introduction