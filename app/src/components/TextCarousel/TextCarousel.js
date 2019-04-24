import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 200px 0;
  /* display: flex; */
  /* flex-direction: column; */
  overflow-x: hidden;
`

const Word = styled.h1`
  font-size: 4.5rem;
  text-transform: uppercase;
  -webkit-text-stroke: 1px ${props => props.theme.yellow};
  color: ${props => props.theme.white};
  line-height: 4.8rem;
  letter-spacing: -0.3rem;
`

const FilledWord = styled(Word)`
  color: ${props => props.theme.yellow};
`

const Warning = styled.div`
  font-size: 2rem;
  width: 200px;
  padding: 1rem;
  color: white;
  background: red;
  position: fixed;
  top: 100px;
  left: 0px;
`

const row1width = 1494.33

const disableAnimation = true

class TextCarousel extends Component {
  constructor(props) {
    super(props)
    this.onScroll = this.onScroll.bind(this)
    this.updateCurrentTime = this.updateCurrentTime.bind(this)
    this.state = {
      scrollPos: 0,
      time: 0
    }
  }

  updateCurrentTime() {
    this.setState(state => ({
      ...state,
      time: this.state.time + 0.7
    }))
    this.timeoutId = setTimeout(this.updateCurrentTime.bind(this), 1)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    this.updateCurrentTime()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScroll / height

    this.setState({
      scrollPos: scrolled
    })
  }

  render() {
    const { time } = this.state

    let scrollDeg = this.state.scrollPos * row1width * 0.5
    scrollDeg += time
    scrollDeg = scrollDeg % row1width
    scrollDeg *= -1

    if (disableAnimation) {
      return <Warning>RE-ENABLE THE TEXT CAROUSEL</Warning>
    }

    const Row = styled.div`
      display: flex;
      flex-direction: row;
      margin-right: auto;
      clear: right;
      transform: matrix(1, 0, 0, 1, ${scrollDeg}, 0);
    `
    const RevRow = styled.div`
      display: flex;
      flex-direction: row;
      margin-right: auto;
      float: right;
      transform: matrix(1, 0, 0, 1, ${scrollDeg * -1}, 0);
    `

    return (
      <Container>
        <Row>
          <Word>Dog.&nbsp;</Word>
          <Word>Happiness.&nbsp;</Word>
          <Word>Mug.&nbsp;</Word>
          <Word>Human.&nbsp;</Word>
          <Word>Dog.&nbsp;</Word>
          <Word>Happiness.&nbsp;</Word>
          <Word>Mug.&nbsp;</Word>
          <Word>Human.&nbsp;</Word>
        </Row>
        <RevRow>
          <Word>Forest.&nbsp;</Word>
          <FilledWord>Kaleido&#8209;saur.&nbsp;</FilledWord>
          <Word>Beach.&nbsp;</Word>
          <Word>Forest.&nbsp;</Word>
          <FilledWord>Kaleido&#8209;saur.&nbsp;</FilledWord>
          <Word>Beach.&nbsp;</Word>
        </RevRow>
        <Row>
          <Word>Mushroom.&nbsp;</Word>
          <Word>Fan.&nbsp;</Word>
          <Word>Hotdog.&nbsp;</Word>
          <Word>Infinity.&nbsp;</Word>
          <Word>Mushroom.&nbsp;</Word>
          <Word>Fan.&nbsp;</Word>
          <Word>Hotdog.&nbsp;</Word>
          <Word>Infinity.&nbsp;</Word>
        </Row>
      </Container>
    )
  }
}

export default TextCarousel
