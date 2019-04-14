import React, { Component } from 'react'
import styled from 'styled-components'

import { ReactComponent as HelpIcon } from '../../assets/icons/help-icon.svg'
import { ReactComponent as GalleryIcon } from '../../assets/icons/gallery-icon.svg'

const Container = styled.div`
  margin: 100px 0;
`

const Icon = styled.a`
  margin-left: 2.3rem;

  svg {
    width: 3rem;
    height: auto;
    color: ${props => props.theme.textPrimary};
  }
`

const Title = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 100%;

  span {
    font-family: 'Univers';
    text-transform: uppercase;
    font-size: 7.5rem;
    letter-spacing: -0.5rem;
    line-height: normal;
    width: 100%;
    height: 7.5rem;
  }
`

const Subtitle = styled.div`
  text-transform: lowercase;
`

const Signature = styled.div`
  display: flex;
  align-items: flex-start;
  text-transform: lowercase;
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  display: flex;
  width: 100%;
  align-items: flex-end;
`

const Navbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const NavTitle = styled(Title)`
  span {
    font-size: 1.375rem;
    letter-spacing: initial;
    width: initial;
    height: initial;
  }
`

class Header extends Component {
  render() {
    return (
      <Container>
        <div className={this.props.narrow ? 'l-container' : null}>
          <Navbar>
            <NavTitle>
              <span>Kaleido-</span>
              <span>saur</span>
            </NavTitle>

            <Icon
              onClick={() => {
                this.props.aboutRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'center'
                })
              }}
            >
              <HelpIcon />
            </Icon>

            <Icon
              onClick={() => {
                this.props.galleryRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'center'
                })
              }}
            >
              <GalleryIcon />
            </Icon>
          </Navbar>

          <Title>
            <span>Kaleido-</span>
            <span>saur</span>
          </Title>

          <Subtitle>Abstract art generator</Subtitle>

          <Signature narrow>
            Capstone 2019 <br />
            Northeastern University
          </Signature>
        </div>
      </Container>
    )
  }
}

export default Header
