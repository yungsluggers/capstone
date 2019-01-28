import React, { Component } from 'react'
import styled from 'styled-components'

import Button from './../Button/Button'

const WidgetContainer = styled.div`
  position: relative;
  padding: 6em 0 4em 0;
  box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.2);
  top: -22vh;
  background: white;
  z-index: 2;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const WidgetContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  font-size: 1.375rem;
  margin: 0em 6em 2em 6em;
`

const FlexItem = styled.div`
  flex-basis: 50%;
  margin: 0 1em;
`

class Widget extends Component {
  render() {
    return (
      <WidgetContainer className="l-container">

        <WidgetContent>
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
          
        </WidgetContent>
        
        <Button primary>Start</Button>

      </WidgetContainer>
    )
  }
}

export default Widget