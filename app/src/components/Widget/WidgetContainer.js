import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  padding: 4em 4em 3em 4em;
  box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.2);
  top: -22vh;
  background: white;
  z-index: 2;
  font-size: 1.375rem;
`


class WidgetContainer extends Component {

  render() {

    return (
      <div className="l-container">
        <Container>
          {this.props.children}
        </Container>
      </div>
    )

  }
}

export default WidgetContainer