import React, { Component } from 'react'
import styled from 'styled-components'

import Button from './../Button/Button'


const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Content = styled.div`
  margin-bottom: 90px;
  text-align: center;
`

class Introduction extends Component {

  startApp = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  render() {

    return (
      <Container>
        <Content>
          <p>
            This is a small project exploring a computer's ability to create abstract visual representations of real world objects through genetic image generation. 
          </p>
          <p>
            Get started below.
          </p>
        </Content>

        <Button onClick={this.startApp} filled>Get Started</Button>
      </Container>
    )

  }
}

export default Introduction