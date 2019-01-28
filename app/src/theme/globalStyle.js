import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Oswald:300|Roboto:300');

  html, body {
    padding: 0;
    margin: 0;
    margin-top: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    line-height: 1.5rem;
  }

  button {
    font-family: 'Roboto', sans-serif;
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

  header, h1, h2, h3, h4, h5, h6 {
    font-family: 'Oswald', sans-serif;
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
  gold:'#f99d33',
  pink: '#e62c8f',
  blue: '#4ca1d9',
  grey: '#acacad',
  textPrimary: '#231f20'
}

export default GlobalStyle