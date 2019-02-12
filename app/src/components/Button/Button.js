import styled from 'styled-components'

export const Button = styled.button`
  color: white;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: bolder;
  /* padding: 10px 22px; */
  border-radius: 1000px;
  letter-spacing: 2px;
  width: auto;
  border: none;
  display: block;
  min-height: 65px;
  min-width: 220px;
  background-color: ${props => props.primary ? props.theme.green : props.secondary ? props.theme.gold : props.theme.red };
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
  font-weight: lighter;

  margin: 0 1em;
  transition: .5s;

  /* light */
  &:hover {
    background-color: lighten(${props => props.primary ? props.theme.green : props.secondary ? props.theme.gold : props.theme.red }, 20%);
  }

  /* dark */
  &:active { 
    
  }
`

export default Button