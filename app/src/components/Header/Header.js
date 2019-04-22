import React, { Component } from 'react'
import styled from 'styled-components'

import { ReactComponent as HelpIcon } from '../../assets/icons/help-icon.svg'
import { ReactComponent as GalleryIcon } from '../../assets/icons/gallery-icon.svg'

const Container = styled.div`
  margin: 100px 0;
`

const Icon = styled.a`
  margin-left: 2.3rem;
  @media only screen and (max-width: 800px) {
    display: none;
  }

  svg {
    width: 3rem;
    height: auto;
    color: ${props => props.theme.textPrimary};
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

  @media only screen and (max-width: 800px) {
    display: none;
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
    font-size: calc(1rem + 8vw - 1rem);
    height: calc(1rem + 8vw - 1rem);
    line-height: normal;
    color: ${props => props.theme.textPrimary};

    /* Maximum font-size */
    @media only screen and (min-width: 1300px) {
      font-size: 7.5rem;
      height: 7.5rem;
    }

    /* Maximum font-size */
    @media only screen and (max-width: 800px) {
      font-size: calc(1rem + 8vw);
      height: calc(1rem + 8vw);
    }
  }
`

const Navbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background: ${props => props.theme.white};
  width: 100%;
  overflow: hidden;
  padding: 1.5rem 0;
  padding-bottom: 0;
  z-index: 1;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const CollapsedNavbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: fixed;
  top: -210px;
  overflow: hidden;
  padding: 1rem 0 0.6rem 0;
  z-index: 1;
  background: ${props => props.theme.white};
  width: 100%;
  border-bottom: 2px solid ${props => props.theme.textPrimary};
  transition: 0.5s ease-out;
`

const CollapsedTitle = styled(Title)`
  span {
    font-size: 1.375rem;
    color: ${props => props.theme.textPrimary};
    letter-spacing: initial;
    line-height: initial;
    height: initial;
    transition: 0.5s ease-out;
  }
`

class Header extends Component {
  constructor(props) {
    super(props)

    this.navRef = React.createRef()
    this.titleRef = React.createRef()

    this.state = {
      navbarStyle: {},
      sigStyle: {}
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
    if (document.documentElement.scrollTop > '300') {
      // Styles when Collapsed

      this.setState({
        navbarStyle: {
          top: '0'
        }
      })
    } else {
      // Default styles

      this.setState({
        navbarStyle: {
          top: '-210px'
        }
      })
    }
  }

  render() {
    return (
      <Container>
        <Navbar>
          <ContentWrapper className={this.props.narrow ? 'l-container' : null}>
            <Title>
              <span>Kaleido-</span>
              <span>saur</span>
            </Title>
            <Icon
              onClick={() => {
                this.props.aboutRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'end',
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
                  block: 'end',
                  inline: 'center'
                })
              }}
            >
              <GalleryIcon />
            </Icon>
          </ContentWrapper>
        </Navbar>

        <CollapsedNavbar style={this.state.navbarStyle}>
          <ContentWrapper className={this.props.narrow ? 'l-container' : null}>
            <CollapsedTitle>
              <span>Kaleido-</span>
              <span>saur</span>
            </CollapsedTitle>
            <Icon
              onClick={() => {
                this.props.aboutRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'end',
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
                  block: 'end',
                  inline: 'center'
                })
              }}
            >
              <GalleryIcon />
            </Icon>
          </ContentWrapper>
        </CollapsedNavbar>

        <div className={this.props.narrow ? 'l-container' : null}>
          <Subtitle>Abstract art generator</Subtitle>

          <Signature style={this.state.sigStyle}>
            Capstone 2019 <br />
            Northeastern University
          </Signature>
        </div>
      </Container>
    )
  }
}

export default Header
