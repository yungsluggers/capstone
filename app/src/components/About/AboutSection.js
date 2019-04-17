import React, { Component } from 'react'
import styled from 'styled-components'

import SectionHeader from '../Section/SectionHeader'
import Link from '../Link/Link'

const Container = styled.div`
  margin: 200px auto;
`

const ContentContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const Content = styled.div`
  color: ${props => props.theme.textPrimary};
  font-size: 1.125rem;
  width: 50%;
  margin-left: auto;
  margin-right: 2rem;
  /* margin-top: 500px; */
  display: inline;
  max-width: 25em;
  word-break: break-word;
  background-color: white;
  border: 2px solid ${props => props.theme.textPrimary};
  padding: 1rem;

  > p {
    margin-top: 0;
    margin-right: 0;
    max-width: 30em;
    word-break: break-word;
  }

  @media only screen and (max-width: 1100px) {
    width: 100%;
    max-width: initial;
  }
`

const WordArt = styled.div`
  text-transform: uppercase;
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  font-family: 'Univers', sans-serif;
  font-size: 3rem;
  font-style: italic;
  line-height: initial;
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: flex-end;

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`

const Names = styled.div`
  display: flex;
  text-transform: lowercase;
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  height: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
  white-space: nowrap;

  @media only screen and (max-width: 750px) {
    display: none;
  }
`

const FancySubtitle = styled.p`
  margin-top: -100px;
  margin-bottom: 100px;
`

class AboutSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      researchHovered: false,
      backgroundHovered: false,
      infoHovered: false
    }

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseEnter(topic) {
    let hoveredTopic = `${topic}Hovered`

    this.setState({
      [hoveredTopic]: true
    })
  }

  onMouseLeave(topic) {
    let hoveredTopic = `${topic}Hovered`

    this.setState({
      [hoveredTopic]: false
    })
  }

  render() {
    const { researchHovered, backgroundHovered, infoHovered } = this.state

    const researchStyle = researchHovered ? { color: '#72dcb2' } : {}
    const backgroundStyle = backgroundHovered ? { color: '#72dcb2' } : {}
    const infoStyle = infoHovered ? { color: '#72dcb2' } : {}

    return (
      <Container className={this.props.narrow ? 'l-container' : null}>
        <SectionHeader
          title={this.props.title}
          // subtitle={this.props.subtitle}
        />
        <FancySubtitle>
          <span
            onMouseEnter={() => this.onMouseEnter('research')}
            onMouseLeave={() => this.onMouseLeave('research')}
          >
            research
          </span>
          &nbsp;/&nbsp;
          <span
            onMouseEnter={() => this.onMouseEnter('background')}
            onMouseLeave={() => this.onMouseLeave('background')}
          >
            background
          </span>
          &nbsp;/&nbsp;
          <span
            onMouseEnter={() => this.onMouseEnter('info')}
            onMouseLeave={() => this.onMouseLeave('info')}
          >
            info
          </span>
        </FancySubtitle>
        <ContentContainer>
          <WordArt>
            Genetically.
            <br />
            Generated.
            <br />
            Abstract.
            <br />
            Art.
          </WordArt>

          <Content>
            <p>
              The image generation will be done genetically. This means that we
              will generate many random images then choose the best two and
              "breed" them by combining their image data. This new child image
              will be used as a seed for a new set of random images and the
              process will iterate from ThemeProvider.{' '}
              <span style={backgroundStyle}>
                This should over time create a more and more accurate image and
                eventually trigger the AI's label detection more than a normal
                picture of that label.
              </span>
            </p>
            <p>
              <span style={researchStyle}>
                Thanks to the inspirational work of Chris Cummins'{' '}
                <Link
                  href="https://chriscummins.cc/s/genetics/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={researchStyle}
                >
                  genetically generated images
                </Link>{' '}
                and Tom White's{' '}
                <Link
                  href="https://medium.com/artists-and-machine-intelligence/perception-engines-8a46bc598d57"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={researchStyle}
                >
                  perception engine
                </Link>
                , we have a strategy to base our work on.
              </span>{' '}
              We will be combining the two techniques in order to generate a
              fully original image that is the internal representation of what
              an AI identifies as its label.{' '}
              <span style={infoStyle}>
                Labels can be anything that humans can identify visually. "dog",
                "cat", "happy", "bicycle", etc are examples of common labels.{' '}
              </span>{' '}
              The AI will be trained off of a set of images that represent one
              of these words then rate the image being generated by how well it
              fits that label.
            </p>
          </Content>
          <Names>
            <div>Michael Rascati </div>
            <div>Kevin Altschuler </div>
            <div>Chris Louie</div>
          </Names>
        </ContentContainer>
      </Container>
    )
  }
}
AboutSection.defaultProps = {
  theme: {
    textPrimary: '#191818'
  }
}
export default AboutSection
