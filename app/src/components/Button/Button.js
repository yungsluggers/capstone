import styled from 'styled-components'

export const Button = styled.button`
  color: ${props => props.filled ? 'white' : props.theme.textPrimary};
  background-color: ${props => props.filled ? props.theme.textPrimary : 'white'};
  border: ${props => props.filled ? 'none' : `2px solid ${props.theme.textPrimary}`};
  text-transform: uppercase;
  font-size: 1rem;
  line-height: 3rem;
  padding: 4px 36px;
  height: 3rem;
`

export default Button