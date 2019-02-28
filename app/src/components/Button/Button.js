import styled from 'styled-components'

const Button = styled.button`
  color: ${props => props.filled ? 'white' : props.theme.textPrimary};
  background-color: ${props => props.filled ? props.theme.textPrimary : 'white'};
  border: ${props => props.filled ? 'none' : `2px solid ${props.theme.textPrimary}`};
  text-transform: uppercase;
  font-size: 1rem;
  line-height: 3rem;
  padding: 4px 36px;
  width: max-content;
  height: 3rem;
  transition: all .2s ease 0s;

  &:hover {
    transform: translate(0, -5px);

  }
`

export default Button