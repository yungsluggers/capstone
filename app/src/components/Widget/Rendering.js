import React, { Component } from 'react'
import styled from 'styled-components'

import Button from './../Button/Button'


const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const ButtonRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
`


class Rendering extends Component {

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
      <Container>

        <h3>Kaleidescope Rendering...</h3>


        <ButtonRow>
          <Button onClick={this.back} secondary>Back</Button>
          <Button onClick={this.nextStep} tertiary>Stop</Button>
        </ButtonRow>
        


      </Container>
    )

  }
}

export default Rendering