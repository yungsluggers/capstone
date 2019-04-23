import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import Tilt from 'react-tilt'

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
  display: inline;
  max-width: 25em;
  word-break: break-word;
  background-color: ${props => props.theme.white};
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

  @media only screen and (max-width: 800px) {
    margin: 0;
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
  justify-content: flex-end;
  margin-left: 50%;

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

  @media only screen and (max-width: 800px) {
    display: none;
  }
`

const jump = keyframes`
  from {
    transform: translateY(-1px);
  }
  to {
    transform: translateY(2px);
  }
`

const FancySubtitle = styled.p`
  margin-top: -100px;
  position: relative;
  top: -155px;

  span {
    display: inline-block;
  }

  span:nth-child(1) {
    /* animation: ${jump} 1.5s ease 0s infinite normal; */
    /* animation: ${jump} 1s linear 0s infinite alternate; */
  }
  span:nth-child(2) {
    /* animation: ${jump} 1.5s ease 100ms infinite normal; */
    /* animation: ${jump} 1s linear 100ms infinite alternate; */
  }
  span:nth-child(3) {
    /* animation: ${jump} 1.5s ease 200ms infinite normal; */
    /* animation: ${jump} 1s linear 200ms infinite alternate; */
  }

  @media only screen and (max-width: 800px) {
    text-align: center;
  }
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
            research&nbsp;/&nbsp;
          </span>
          <span
            onMouseEnter={() => this.onMouseEnter('background')}
            onMouseLeave={() => this.onMouseLeave('background')}
          >
            background&nbsp;/&nbsp;
          </span>
          <span
            onMouseEnter={() => this.onMouseEnter('info')}
            onMouseLeave={() => this.onMouseLeave('info')}
          >
            info
          </span>
        </FancySubtitle>
        <ContentContainer>
          <Tilt
            className="Tilt"
            options={{ max: 35, reverse: false, scale: 1, speed: 2000 }}
            style={{
              width: 'fit-content',
              padding: '15% 35%',
              margin: '-15% -35%'
            }}
          >
            <WordArt>
              Genetically.
              <br />
              Generated.
              <br />
              Abstract.
              <br />
              Art.
            </WordArt>
          </Tilt>

          <Content>
            <p>
              The image generation is done genetically. This means that we
              generate many random images then choose the best two and "breed"
              them by combining their image data. This new child image is used
              as a seed for a new set of random images and the process will
              iterate from ThemeProvider.{' '}
              <span style={backgroundStyle}>
                Over time, this creates a more and more accurate image and
                eventually trigger the AI's label detection more than a normal
                picture of that label.
              </span>
            </p>
            <p>
              <span style={researchStyle}>
                Through exploring how artificial intelligence would shape the
                future of art and design, we discovered several projects that
                were especially inspiring for us: Chris Cummins{' '}
                <Link
                  href="https://chriscummins.cc/s/genetics/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={researchStyle}
                >
                  genetic algorithms for generative art
                </Link>
                , and Tom White’s{' '}
                <Link
                  href="https://medium.com/artists-and-machine-intelligence/perception-engines-8a46bc598d57"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={researchStyle}
                >
                  Perception Engine.
                </Link>
              </span>{' '}
              We combined the two techniques in order to generate a fully
              original image that is the internal representation of what our
              neural network identifies as its label.{' '}
              <span style={infoStyle}>
                There is a large list of labels to choose from and they are made
                up of anything that humans can identify visually. Plenty of
                animals and household objects are available for users to choose.{' '}
              </span>{' '}
              <br />
              <br />
              The neural network is based on the{' '}
              <Link
                href="https://pjreddie.com/darknet/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DarkNet
              </Link>{' '}
              open source neural network, which is written in C and CUDA.
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
