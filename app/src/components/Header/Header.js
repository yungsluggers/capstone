import React, { Component } from 'react'
import styled from 'styled-components'

import { ReactComponent as HelpIcon } from '../../assets/icons/baseline-help_outline-24px.svg'

const Container = styled.div`
  margin: 100px 0;
`

const Icon = styled.a`
  grid-row: 1;
  margin-bottom: 5rem;
  margin-right: auto;

  svg {
    width: 3rem;
    height: auto;
    color: ${props => props.theme.textPrimary};
  }
`

const Title = styled.div`
  /* grid-column: 4 / span 4; */
  /* grid-row: 2; */
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 100%;
  /* overflow: hidden; */

  span {
    font-family: 'Univers';
    text-transform: uppercase;
    font-size: 7.5rem;
    letter-spacing: -0.5rem;
    line-height: normal;
    /* color: ${props => props.theme.textPrimary}; */
    width: 100%;
    height: 7.5rem;
    /* margin-bottom: 7px; */
    /* padding: 0.75rem 0 0.75rem 2rem; */
  }
`

const Subtitle = styled.div`
  text-transform: lowercase;
`

// const div = styled.div``

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

class Header extends Component {
  render() {
    return (
      <Container>
        <div className={this.props.narrow ? 'l-container' : null}>
          <Title>
            <span>Kaleido-</span>
            <span>saur</span>
          </Title>

          <Subtitle>Abstract art generator</Subtitle>

          <Icon
            onClick={() => {
              this.props.aboutRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
              })
            }}
            style={{ gridColumn: 2 }}
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
            style={{ gridColumn: 3, fontSize: 32 }}
          >
            🦆
          </Icon>

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
