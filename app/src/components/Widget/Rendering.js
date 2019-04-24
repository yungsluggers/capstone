import React, { Component } from 'react'
import styled from 'styled-components'

import { init, playPause } from '../../ccevolve'

import Button from './../Button/Button'
import ButtonRow from './../Button/ButtonRow'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`

const FlexRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`

const Canvas = styled.div`
  display: flex;
  flex-flow: column nowrap;

  canvas {
    border: 2px solid ${props => props.theme.black};
    margin-right: 40px;
  }
`

const Header = styled.div`
  margin-bottom: 50px;
`

const AnalyticsList = styled.div`
  display: flex;
  margin-bottom: 3rem;
`

class FileImporter extends Component {
  importFile(e) {
    var URL = window.webkitURL || window.URL
    var url = URL.createObjectURL(e.target.files[0])
    var img = new Image()
    img.src = url

    img.onload = function() {
      var img_width = img.width
      var img_height = img.height

      init(img, img_width)
    }
  }

  render() {
    return <input type="file" onChange={this.importFile.bind(this)} />
  }
}

class Rendering extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: true
    }
  }

  componentDidMount() {
    init(this.props.id)
  }

  nextStep = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  back = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  play = e => {
    playPause()
    this.setState({ playing: !this.state.playing })
  }

  render() {
    return (
      <Container>
        <Content>
          <Header>{this.props.label}</Header>
          <FlexRow>
            <FlexRow>
              <Canvas>
                <canvas id="best_img_canvas" width="350" height="350" />
                <canvas
                  id="test_img_canvas"
                  style={{ visibility: 'hidden' }}
                  width="75"
                  height="75"
                />
              </Canvas>
            </FlexRow>

            {/* {this.state.playing ? (
          <FlexRow>
            <FlexRow>
              <Canvas>
                <canvas
                  id="best_img_canvas"
                  width="350"
                  height="350"
                  style={{
                    marginBottom: '-2rem'
                  }}
                />
                <canvas
                  id="test_img_canvas"
                  style={{ visibility: 'hidden' }}
                  width="75"
                  height="75"
                />
              </Canvas>
            </FlexRow>

            {/* {this.state.playing ? (
            <Button onClick={this.play}>Pause</Button>
          ) : (
            <Button onClick={this.play}>Play</Button>
          )} */}

            <AnalyticsList>
              <table>
                <tbody>
                  <tr>
                    <td>Elapsed time:&nbsp;</td>
                    <td>
                      <div id="elapsed-time" />
                    </td>
                  </tr>
                  <tr>
                    <td>Number of generations:&nbsp;</td>
                    <td>
                      <div id="number-of-generations" />
                    </td>
                  </tr>
                  <tr>
                    <td>Time per generation:&nbsp;</td>
                    <td>
                      <div id="time-per-generation" />
                    </td>
                  </tr>
                  <tr>
                    <td>Time per improvement:&nbsp;</td>
                    <td>
                      <div id="time-per-improvement" />
                    </td>
                  </tr>
                  <tr>
                    <td>Current fitness:&nbsp;</td>
                    <td>
                      <div id="current-fitness" />
                    </td>
                  </tr>
                  <tr>
                    <td>Highest fitness:&nbsp;</td>
                    <td>
                      <div id="highest-fitness" />
                    </td>
                  </tr>
                  <tr>
                    <td>Lowest fitness:&nbsp;</td>
                    <td>
                      <div id="lowest-fitness" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </AnalyticsList>
          </FlexRow>

          <br />

          <ButtonRow>
            <Button onClick={this.back}>Back</Button>
            <Button onClick={this.nextStep} filled>
              Stop
            </Button>
          </ButtonRow>
        </Content>
      </Container>
    )
  }
}

export default Rendering
