import styled from 'styled-components'
import * as GameItemStyled from 'components/GameItem/styles'

export const Wrapper = styled.main`
  ${GameItemStyled.Wrapper} {
    &:last-child {
      border-bottom: 0;
    }
  }
`
