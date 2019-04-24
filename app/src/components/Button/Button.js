import styled, { keyframes } from 'styled-components'

const BaseButton = styled.button`
  color: ${props => (props.filled ? props.theme.white : props.theme.black)};
  background-color: ${props =>
    props.filled ? props.theme.black : props.theme.white};
  border: ${props =>
    props.filled ? 'none' : `2px solid ${props.theme.black}`};
  text-transform: uppercase;
  font-size: 1.4rem;
  line-height: 3rem;
  padding: 14px 40px 8px 40px;
  width: max-content;
  border-radius: 0.2rem;
  /* height: 3rem; */
  /* transition: all 0.2s ease 0s; */
  overflow: hidden;
  /* position: absolute; */
  /* &:hover {
    transform: translate(0, -5px);
  } */
`

const glitch = keyframes`
  0% {
    transform: skewX(0deg);
  }
  5% {
    transform: skewX(2deg);
    opacity: 0.95;
  }
  10% {
    transform: skewX(0deg);
    opacity: 1;
  }
  15% {
    transform: skewX(-5deg);
    opacity: 0.95;
  }
  20% {
    transform: skewX(0deg);
    opacity: 1;
  }
  45% {
    transform: skewX(3deg);
    opacity: 0.85;
  }
  50% {
    transform: skewX(0deg);
    opacity: 1;
  }
  55% {
    transform: skewX(0deg);
    opacity: 0.85;
  }
  60% {
    transform: skewX(0deg);
    opacity: 1;
  }
  75% {
    transform: skewX(2deg);
  }
  80% {
    transform: skewX(0deg);
  }
  85% {
    transform: skewX(-7deg);
    opacity: 0.85;
  }
  90% {
    transform: skewX(0deg);
    opacity: 1;
  }
  100% {
    transform: skewX(0deg);
  }
`

const scan = keyframes`
  0% {
    top: 0%;
  }
  50% {
    top: 97%;
  }
  100% {
    top: 0%;
  }
`

const Button = styled(BaseButton)`
  transition: opacity 300ms;

  &:after {
    box-shadow: rgba(212, 207, 201, 0.75) 0 0 15px 2px;
    background: ${props => props.theme.purple};
    content: '';
    height: 2px;
    opacity: 0;

    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  &:before {
    content: '';
    opacity: 0;
  }

  &:hover {
    animation: ${glitch} 750ms infinite;

    &:before {
      opacity: 1;
    }

    &:after {
      animation: ${scan} 2s infinite;
      opacity: 1;
    }
  }
`

export default Button
