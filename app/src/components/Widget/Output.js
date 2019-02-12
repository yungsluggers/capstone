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

const ImagePlaceholder = styled.div`
  width: 500px;
  height: 500px;
  margin-bottom: 75px;
  background: antiquewhite;
`


class Output extends Component {

  nextStep = (e) => {
    e.preventDefault()
    this.props.reset()
  }

  back = (e) => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    const {values} = this.props

    return (
      <Container>

        <ImagePlaceholder />

        <ButtonRow>
          <Button secondary>Download</Button>
          <Button onClick={this.nextStep} primary>Start over</Button>
        </ButtonRow>

      </Container>
    )

  }
}

export default Output