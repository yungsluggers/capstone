import styled from 'styled-components'

export const Link = styled.a`
  color: ${props => props.theme.black};
  /* transition: 0.1s; */

  &:hover {
    color: ${props => props.theme.yellow};
  }
`

export default Link
