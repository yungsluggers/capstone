import React, { Component } from 'react'
import styled from 'styled-components'

import { ReactComponent as HelpIcon } from '../../assets/icons/baseline-help_outline-24px.svg'

import Button from '../Button/Button'


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto auto auto;
  margin-top: 3rem;
`

const Icon = styled.a`
  grid-column: 2;
  grid-row: 1;

  svg {
    width: 45px;
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
    background-color: ${props => props.theme.textPrimary};
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
    background-color: ${props => props.theme.textPrimary};
    font-size: 2rem;
    width: 100%;
    height: min-content;
    padding: .75rem 0 .75rem 2rem;
  }
`

const Content = styled.div`
  grid-column: 4;
  grid-row: 5;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
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

        <Icon>
          <HelpIcon />
        </Icon>

        <Names>
          Michael Rascati <br />
          Kevin Altschuler <br />
          Chris Louie <br />
        </Names>

        <Content>
          <Button filled>
            Get Started
          </Button>
        </Content>
        
        {/* <Content className="l-container">
          <Title>
            {this.props.children}
          </Title>

          <Icon>
            <HelpIcon fill="white"/>
          </Icon>
        </Content> */}
        
      </Container>
    )
  }
}

export default Header