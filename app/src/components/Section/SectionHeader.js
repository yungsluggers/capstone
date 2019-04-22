import React, { Component } from 'react'
import styled from 'styled-components'
import Tilt from 'react-tilt'

const Container = styled.div`
  margin-bottom: 100px;
`

const HeaderContainer = styled.div`
  position: relative;
  margin-top: 3rem;
  padding: 250px;
  margin: -250px;
`

const Header = styled.h1`
  text-transform: uppercase;
  font-size: 4.5rem;
  /* color: ${props => props.theme.textPrimary}; */
  position: relative;
  letter-spacing: -0.3rem;
  line-height: 4rem;
  
  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`

const ColorHeader = styled(Header)`
  left: -8px;
  top: -58px;
  color: ${props => props.theme.white};
`

const Rule = styled.hr`
  height: 0;
  border: 0.5px solid ${props => props.theme.textPrimary};
  margin-bottom: 20px;
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
        <Rule />

        <HeaderContainer>
          <Header>{this.props.title}</Header>

          {/* <Tilt
            className="Tilt"
            options={{ max: 25, reverse: false, scale: 1, speed: 2000 }}
            style={{
              width: 'fit-content',
              // padding: '0 1000px',
              // margin: '0 -1000px'
              padding: '200px 100vw',
              margin: '-200px -100vw'
            }}
          > */}
          <ColorHeader>{this.props.title}</ColorHeader>
          {/* </Tilt> */}
        </HeaderContainer>

        <Subtitle>{this.props.subtitle}</Subtitle>
      </Container>
    )
  }
}

export default SectionHeader
