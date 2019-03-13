import React, { Component } from 'react'
import styled from 'styled-components'

import Button from './../Button/Button'
import ButtonRow from './../Button/ButtonRow'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
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

    return (
      <Container>

        <ImagePlaceholder />

        <ButtonRow>
          <Button>Download</Button>
          <Button onClick={this.nextStep} filled>Start over</Button>
        </ButtonRow>

      </Container>
    )

  }
}

export default Output