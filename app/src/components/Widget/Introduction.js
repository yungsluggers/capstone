import React, { Component } from 'react'
import styled from 'styled-components'

import Button from './../Button/Button'


const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 75px;
`

const FlexItem = styled.div`
  flex-basis: 50%;
  margin: 0 1em;
`

class Introduction extends Component {

  startApp = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  render() {

    const {values} = this.props

    return (
      <Container>
        <Content>
          <FlexItem>
            <p>
              <i>Kaleidoscope</i> is a web based application which allows users to explore a computer's capacity to create abstract visual representations of real world objects through genetic image generation. To get started, follow the instructions or explore more information below.
            </p>
          </FlexItem>

          <FlexItem>
            <ol>
              <li>Click START to begin</li>
              <li>Select the labels and their priority values to base your abstract art on</li>
              <li>Press STOP during image rendering phase at any point to view the output or let it run to completion. Enjoy your art!</li>
            </ol>
          </FlexItem>
        </Content>

        <Button onClick={this.startApp} primary>Start</Button>
      </Container>
    )

  }
}

export default Introduction