import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 100px;
`

const HeaderContainer = styled.div`
  position: relative;
  margin-top: 3rem;
`

const Header = styled.h1`
  text-transform: uppercase;
  font-size: 4.5rem;
  color: ${props => props.theme.textPrimary};
  position: relative;
  letter-spacing: -0.3rem;
  line-height: 4rem;
`

const ColorHeader = styled(Header)`
  position: absolute;
  left: -8px;
  top: 5px;
  color: ${props => props.theme.white};
`

const Rule = styled.hr`
  height: 0;
  border: 0.5px solid black;
`

const Subtitle = styled.p`
  margin-top: 0;
`

class SectionHeader extends Component {
  render() {
    return (
      <Container>
        <Rule />

        <HeaderContainer>
          <Header>{this.props.title}</Header>
          <ColorHeader>{this.props.title}</ColorHeader>
        </HeaderContainer>

        <Subtitle>{this.props.subtitle}</Subtitle>
      </Container>
    )
  }
}

export default SectionHeader
