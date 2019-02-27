import React, { Component } from 'react'
import styled from 'styled-components'

import { ReactComponent as HelpIcon } from '../../assets/icons/baseline-help_outline-24px.svg'

import Button from '../Button/Button'

const Container = styled.div`
  /* position: relative; */
  /* height: 45vh; */
  /* background-color: ${props => props.theme.green }; */
  /* color: white; */
  /* box-shadow: 2px 2px 15px 0px rgba(0,0,0,0.2); */
  /* background-size: 200% auto; */
  /* background-image: linear-gradient(120deg, rgba(65,185,132,1) 0%, rgba(72,193,139,1) 43%, rgba(84,206,151,1) 68%, rgba(95,219,162,1) 80%, rgba(99,218,162,1) 100%); */
  /* z-index: 1; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
`

const Icon = styled.a`
  grid-column: 1;
  grid-row: 1;

  svg {
    width: 45px;
    height: auto;
  }
`

const Title = styled.div`
  grid-column: 3 / span 3;
  grid-row: 2;

  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 100%;

  h1 {
    font-size: 7.5rem;
    letter-spacing: .2rem;
    /* display: inline; */
    hyphens: auto;
  }

  span {
    /* display: inline-block; */
    background-color: ${props => props.theme.textPrimary};
    color: white;
    width: 100%;
  }
`

const Subtitle = styled.div`
  grid-column: 3 / span 3;
  grid-row: 3;
  text-transform: lowercase;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;

  span  {
    background-color: ${props => props.theme.textPrimary};
    color: white;
    width: 100%;
  }
`

const Content = styled.div`
  grid-column: 3;
  grid-row: 4;
  /* display: flex; */
  /* flex-flow: row nowrap; */
  /* justify-content: space-between; */
  /* align-items: center; */
`

const Names = styled.div`
  grid-column: 1;
  grid-row: 3;
  text-transform: lowercase;
  transform: rotate(-90deg);
`


class Header extends Component {
  render() {
    return (
      <Container>
        <Title>
          {/* {this.props.children} */}
          <h1><span>{this.props.children}</span></h1>
          {/* <h1><span><br />saur</span></h1> */}
          {/* <h1>{this.props.children}</h1> */}
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