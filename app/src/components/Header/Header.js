import React, { Component } from 'react'
import styled from 'styled-components'

import { ReactComponent as HelpIcon } from '../../assets/icons/baseline-help_outline-24px.svg'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto auto auto;
  margin: 3rem 0 5rem 0;
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
  grid-column: 4 / span 4;
  grid-row: 2;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;

  span {
    font-family: 'Univers';
    text-transform: uppercase;
    font-size: 7.5rem;
    letter-spacing: .2rem;
    line-height: normal;
    background-color: #191818e6;
    color: white;
    width: 100%;
    height: 7.5rem;
    margin-bottom: 7px;
    padding: .75rem 0 .75rem 2rem;
  }
`

const Subtitle = styled.div`
  grid-column: 4 / span 4;
  grid-row: 3;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;  
  text-transform: lowercase;

  span  {
    color: white;
    background-color: #191818e6;
    font-size: 2rem;
    width: 100%;
    height: min-content;
    padding: .75rem 0 .75rem 2rem;
  }
`

const Names = styled.div`
  grid-column: 2;
  grid-row: 4;
  display: flex;
  align-items: flex-start;
  text-transform: lowercase;
  transform: rotate(180deg);
  writing-mode: vertical-rl;
`


class Header extends Component {
  render() {
    return (
      <Container>
        <Title>
          <span>Kaleido-</span>
          <span>saur</span>
        </Title>

        <Subtitle>
          <span>Abstract art generator</span>
        </Subtitle>

        <Icon
          onClick={() => {
            this.props.aboutRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center',
            });
          }}
          style={{gridColumn: 2}}
        >
          <HelpIcon/>
        </Icon>

         <Icon
          onClick={() => {
            this.props.galleryRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center',
            });
          }}
          style={{gridColumn: 3, fontSize: 32}}
        >
          🦆
        </Icon>

        <Names>
          Michael Rascati <br />
          Kevin Altschuler <br />
          Chris Louie <br />
        </Names>

      </Container>
    )
  }
}

export default Header