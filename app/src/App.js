import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle, { theme } from './theme/globalStyle'

import Header from './components/Header/Header'
// import Section from './components/Section/SectionHeader'
import WidgetContainer from './components/Widget/WidgetContainer'
import Widget from './components/Widget/Widget'
// import Gallery from './components/Gallery/Gallery'
import AboutSection from './components/About/AboutSection'
import GallerySection from './components/Gallery/GallerySection'
import Link from './components/Link/Link'

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

          <WidgetContainer>
            <Widget />
          </WidgetContainer>

          {/* <div ref={this.aboutRef}>
            <Section
              title="About"
              subtitle="research / background / info"
              narrow
            >
              
            </Section>
          </div> */}

          <AboutSection
            title="About"
            subtitle="research / background / info"
            narrow
          />

          <div ref={this.galleryRef}>
            <GallerySection
              title="Gallery"
              subtitle="view / upload / download"
              narrow
            />
          </div>

          {/* <div ref={this.galleryRef}>
            <Section title="Gallery" subtitle="view / upload / download" narrow>
              <Gallery />
            </Section>
          </div> */}
        </div>
      </ThemeProvider>
    )
  }
}

export default App
