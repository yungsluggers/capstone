import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 100px;
`

const HeaderContainer = styled.div`
  /* position: relative; */
  /* margin-top: 3rem; */
  /* padding: 250px; */
  /* margin: -250px; */
  height: 4.5rem;
`

const Header = styled.h1`
  text-transform: uppercase;
  font-size: 4.5rem;
  color: ${props => props.theme.yellow};
  position: relative;
  letter-spacing: -0.3rem;
  line-height: normal;
  height: inherit;
  z-index: 2;

  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`

const OutlineTitle = styled(Header)`
  top: -4.85rem;
  margin-left: 7px;
  -webkit-text-stroke: 1.5px ${props => props.theme.yellow};
  color: ${props => props.theme.white};
  z-index: 1;
`

const Subtitle = styled.p`
  margin-top: 0;

  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`

class SectionHeader extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header>{this.props.title}</Header>
          <OutlineTitle>{this.props.title}</OutlineTitle>
        </HeaderContainer>

        <Subtitle>{this.props.subtitle}</Subtitle>
      </Container>
    )
  }
}

export default SectionHeader
