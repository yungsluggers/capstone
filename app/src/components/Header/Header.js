import React, { Component } from 'react'
import styled from 'styled-components'

import { ReactComponent as HelpIcon } from '../../assets/icons/baseline-help_outline-24px.svg'


const HeaderContainer = styled.div`
  position: relative;
  height: 45vh;
  background-color: ${props => props.theme.green };
  color: white;
  box-shadow: 2px 2px 15px 0px rgba(0,0,0,0.2);
  /* background-size: 200% auto; */
  background-image: linear-gradient(120deg, rgba(65,185,132,1) 0%, rgba(72,193,139,1) 43%, rgba(84,206,151,1) 68%, rgba(95,219,162,1) 80%, rgba(99,218,162,1) 100%);
  z-index: 1;
`

const HeaderTitle = styled.h3`
  color: white;
  text-align: left;
  font-size: 1.875rem;
  letter-spacing: 10px;
  font-kerning: auto;
`

const HeaderContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const HeaderIcon = styled.a`
  svg {
    width: 45px;
    height: auto;
  }
`

class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        
        <HeaderContent className="l-container">
          <HeaderTitle>
            {this.props.children}
          </HeaderTitle>

          <HeaderIcon>
            <HelpIcon fill="white"/>
          </HeaderIcon>
        </HeaderContent>
        
      </HeaderContainer>
    )
  }
}

export default Header