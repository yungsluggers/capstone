import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  padding: 3rem 4rem;
  background: ${props => props.theme.white};
  border: 2px solid ${props => props.theme.black};
  font-size: 1.5rem;
  line-height: normal;
`

class WidgetContainer extends Component {
  render() {
    return (
      <div className="l-container">
        <Container>{this.props.children}</Container>
      </div>
    )
  }
}

export default WidgetContainer
