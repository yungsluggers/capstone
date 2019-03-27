import React, { Component } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import GlobalStyle, { theme } from './theme/globalStyle'

import Header from './components/Header/Header'
import Section from './components/Section/Section'
import WidgetContainer from './components/Widget/WidgetContainer'
import Widget from './components/Widget/Widget'
import Gallery from './components/Gallery/Gallery'
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
                    />

                    <WidgetContainer>
                        <Widget />
                    </WidgetContainer>

                    <div ref={this.aboutRef}>
                        <Section title="About" from="right" narrow>
                            <p>
                                Thanks to the inspirational work of Chris
                                Cummins'
                                <Link
                                    href="https://chriscummins.cc/s/genetics/#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    genetically generated images
                                </Link>
                                and Tom White's
                                <Link
                                    href="https://medium.com/artists-and-machine-intelligence/perception-engines-8a46bc598d57"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    perception engine
                                </Link>
                                , we have a strategy to base our work on. We
                                will be combining the two techniques in order to
                                generate a fully original image that is the
                                internal representation of what an AI identifies
                                as its label. Labels can be anything that humans
                                can identify visually. "dog", "cat", "happy",
                                "bicycle", etc are examples of common labels.
                                The AI will be trained off of a set of images
                                that represent one of these words then rate the
                                image being generated by how well it fits that
                                label.
                            </p>
                            <p>
                                The image generation will be done genetically.
                                This means that we will generate many random
                                images then choose the best two and "breed" them
                                by combining their image data. This new child
                                image will be used as a seed for a new set of
                                random images and the process will iterate from
                                ThemeProvider. This should over time create a
                                more and more accurate image and eventually
                                trigger the AI's label detection more than a
                                normal picture of that label.
                            </p>
                        </Section>
                    </div>

                    <div ref={this.galleryRef}>
                        <Section title="Gallery" from="left" narrow>
                            <Gallery />
                        </Section>
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}

export default App
