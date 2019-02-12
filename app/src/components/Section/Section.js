import React, { Component } from 'react'
import styled from 'styled-components'


const Container = styled.div`
  background: ${props => props.green ? props.theme.green : 'white'};
  padding: 3em 0em 7em 0em;
  z-index: 0;
  position: relative;
  font-weight: lighter;
`

const SectionContent = styled.div`
  color: ${props => props.green ? 'white' : props.theme.textPrimary};
  text-align: left;
  font-size: 1.125rem;
  max-width: 66vw;
  margin: 0 auto;
`

const SectionHeader = styled.h1`
  color: ${props => props.green ? 'white' : props.theme.green};
  text-transform: uppercase;
  text-align: center;
  font-size: 3rem;
`

class Section extends Component {
  render() {
    return (
      <Container green={this.props.green}>

        <SectionHeader green={this.props.green} className={this.props.narrow ? 'l-container-narrow' : null}>
          {this.props.title}
        </SectionHeader>

        <SectionContent green={this.props.green} className={this.props.narrow ? 'l-container-narrow' : null}>
          {this.props.children}
        </SectionContent>

      </Container>
    )
  }
}

export default Section