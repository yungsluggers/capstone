import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  html, body {
    padding: 0;
    margin: 0;
    margin-top: 0;
    font-family: 'Work Sans', sans-serif;
    font-size: 16px;
    line-height: 1.5rem;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.black};
  }

  body {
    overflow-x: hidden;
  }

  button, select {
    font-family: 'Univers', sans-serif;
    
    &:focus {
      outline: none;
    }
  }

  button, a {
    &:hover {
      cursor: pointer;
    }
    color: inherit;
  }

  a:hover {
    color: ${props => props.theme.yellow} !important;
  }

  header, h1, h2, h3 {
    font-family: 'Univers', sans-serif;
    text-transform: uppercase;
    margin: 0;
    line-height: 9rem;
  }

  ul, li {
    margin-bottom: 1em;
    padding: unset;
  }

  .l-container {
    width: 70vw;
    min-width: 300px;
    margin: 0 auto;
  }

  .l-container-narrow {
    width: 43vw;
    min-width: 300px;
    margin: 0 auto;
  }

  #root > div > div:nth-child(5) > div > div.sc-kpOJdX.binNiL > p {
    position: relative;
    top: -60px;
  }


  /* Styles for React Virtualized Dropdown */
  #YBV-react-virtualized-dropdown * {
    font-family: 'Work Sans', sans-serif;
    font-weight: normal;
  }

  #YBV-react-virtualized-dropdown > div > div > div {
    &:before {
      border-bottom: 1px solid ${props => props.theme.black};
    }

    &:after {
      border-bottom: 1px solid ${props => props.theme.yellow};
    }
  }

  #value > div.css-1wy0on6 > span {
    height: 100%;
    margin: 0;
  }

  #value > div:nth-child(1) > p {
    color: ${props => props.theme.black};
  }

  #react-select-2-input {
    color: ${props => props.theme.black} !important;
    font-size: 1.5rem !important;
  }
`

export const theme = {
  black: '#F1F2F3',
  white: '#252626',
  yellow: '#FAED23',
  purple: '#433594'
}

export default GlobalStyle
