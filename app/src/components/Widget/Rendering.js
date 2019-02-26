import React, { Component } from 'react'
import styled from 'styled-components'

import { init } from '../../ccevolve'

import Button from './../Button/Button'


const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const ButtonRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
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
    return (
      <input type="file" onChange={this.importFile.bind(this)} />
    )
  }

}

class Rendering extends Component {

  nextStep = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  back = (e) => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    // const {values} = this.props

    return (
      <Container>

        <h3>Kaleidescope Rendering...</h3>

        {/* <input type="file" id="file_input" /> */}
        <FileImporter />

        <canvas id="orig_img_canvas" style={{backgroundColor: "#000"}} />
        <canvas id="best_img_canvas" width="350" height="350" />
        <canvas id="test_img_canvas" width="75" height="75" />

        <div>
          <div id="elapsed-time"></div>
        </div>
        
        <div>number of generations: <div id="number-of-generations"></div></div>
        <div>time per generations: <div id="time-per-generation"></div></div>
        <div>time per improvement: <div id="time-per-improvement"></div></div>
        <div>current fitness: <div id="current-fitness"></div></div>
        <div>highest fitness: <div id="highest-fitness"></div></div>
        <div>lowest fitness: <div id="lowest-fitness"></div></div>

        <br />

        <ButtonRow>
          <Button onClick={this.back}>Back</Button>
          <Button onClick={this.nextStep} filled>Stop</Button>
        </ButtonRow>

      </Container>
    )

  }
}

export default Rendering