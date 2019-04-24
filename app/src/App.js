import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import GlobalStyle, { theme } from './theme/globalStyle'

import Header from './components/Header/Header'
import WidgetContainer from './components/Widget/WidgetContainer'
import Widget from './components/Widget/Widget'
import AboutSection from './components/About/AboutSection'
import GallerySection from './components/Gallery/GallerySection'
import TextCarousel from './components/TextCarousel/TextCarousel'

import { ReactComponent as BeanOne } from './assets/art/bean-1.svg'
import { ReactComponent as BeanTwo } from './assets/art/bean-2.svg'

const BeanWrapper = styled.div`
  /* width: 70%;
  position: absolute;
  z-index: 0;

  @media only screen and (max-width: 800px) {
    width: 100%;
  } */
`

class App extends Component {
  constructor(props) {
    super(props)
    this.aboutRef = React.createRef()
    this.galleryRef = React.createRef()
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <GlobalStyle />

          <Header
            aboutRef={this.aboutRef}
            galleryRef={this.galleryRef}
            narrow
          />

          {/* <BeanWrapper> */}
          <BeanOne
            style={{
              position: 'absolute',
              top: '-10vh',
              right: '-20vw',
              zIndex: '0',
              width: '75%'
            }}
          />
          {/* </BeanWrapper> */}

          <WidgetContainer>
            <Widget />
          </WidgetContainer>

          <div ref={this.aboutRef}>
            <AboutSection
              title="About"
              subtitle="research / background / info"
              narrow
            />
          </div>

          {/* <BeanWrapper> */}
          <BeanTwo
            style={{
              position: 'absolute',
              marginTop: '-100vh',
              left: '-25vw',
              zIndex: '0'
            }}
          />
          {/* </BeanWrapper> */}

          <TextCarousel />

          <div ref={this.galleryRef}>
            <GallerySection
              title="Gallery"
              subtitle="view / upload / download"
              narrow
            />
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

export default App
