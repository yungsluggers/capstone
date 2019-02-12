import styled from 'styled-components'

export const Link = styled.a`
  color: white;
  transition: 0.1s;

  &:hover {
    color: ${props => props.theme.green };
    background: #ffffff;
  }
`

export default Link