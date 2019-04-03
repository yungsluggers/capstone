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
    /* background-color: ${props => props.theme.yellow}; */
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
    background-color: 'white' !important;
    color: '#41b984' !important;

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
`

export const theme = {
  green: '#41b984',
  red: '#eb3d25',
  purple: '#912e8f',
  gold: '#f99d33',
  yellow: '#f2b42d',
  pink: '#e62c8f',
  blue: '#4ca1d9',
  grey: '#acacad',
  white: '#ffffff',
  textPrimary: '#191818'
}

export default GlobalStyle
