import React, { Component } from 'react'
import styled from 'styled-components'


const Container = styled.div`
  margin: 200px 0;
`

const Content = styled.div`
  color: ${props => props.theme.textPrimary};
  /* text-align: left;
  font-size: 1.125rem;
  max-width: 66vw;
  margin: 0 auto; */
`

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  overflow: hidden;
`

const SectionHeader = styled.h1`
  grid-column: 2;
  grid-row: 1;
  text-transform: uppercase;
  text-align: center;
  font-size: 4.5rem;
  color: ${props => props.theme.textPrimary};
`

const OutlineHeader = styled.h1`
  -webkit-text-stroke: 1px ${props => props.theme.textPrimary};
  color: rgba(0, 0, 0, 0);
  text-transform: uppercase;
  text-align: center;
  font-size: 4.5rem;
  position: relative;
  bottom: 20px;
  left: ${props => props.from === 'left' ? '-22px' : '22px'};
  grid-column: 2;
  grid-row: 1;
`

const Underline = styled.div`
  border-bottom: 10px solid ${props => props.theme.textPrimary};
  grid-column: ${props => props.from === 'left' ? '1 / span 2' : '2 / span 2'};
  grid-row: 1;
  position: relative;
  bottom: 48px;
  left: ${props => props.from === 'left' ? '-60px' : '60px'};
`


class Section extends Component {
  render() {
    
    return (
      
      <Container >
        <HeaderContainer from={this.props.from}>
          
          <SectionHeader>
            {this.props.title}
          </SectionHeader>

          <OutlineHeader from={this.props.from}>
            {this.props.title}
          </OutlineHeader>
          
          <Underline from={this.props.from}/>
        </HeaderContainer>

        <Content className={this.props.narrow ? 'l-container-narrow' : null}>
          {this.props.children}
        </Content>

      </Container>
    )
  }
}

export default Section