import React, { Component } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'

import Button from './../Button/Button'

const ButtonRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
`

// const Select = styled.select`
//   width: 100%; 
//   font-size: 1.25rem;
//   background-color: #f7f8f9;
//   padding: 1rem;
//   margin: 1rem 0;
// `

const options = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'human', label: 'Human' },
  { value: 'shoe', label: 'Shoe' },
  { value: 'cake', label: 'Cake' },
  { value: 'happiness', label: 'Happiness' },
  { value: 'pain', label: 'Pain' },
  { value: 'furry', label: 'Furry' },
  { value: 'disestablishmentarianism', label: 'Disestablishmentarianism' },
  { value: 'defenestration', label: 'Defenestration' },
  { value: 'frog', label: 'Frog' },
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
    const {values} = this.props

    return (
      <div>

          <label htmlFor="label-select">
            <h4>Select up to two labels and genetic priority...</h4>
          </label>

          <Select 
            isMulti
            components={makeAnimated()}
            name="labels"
            options={options}
          />

          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>

        <ButtonRow>
          <Button onClick={this.back} secondary>Back</Button>
          <Button onClick={this.nextStep} primary>Next</Button>
        </ButtonRow>
        
      </div>
    )

  }
}

export default Introduction