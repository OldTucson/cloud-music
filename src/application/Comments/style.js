import styled from 'styled-components'
import style from '../../assets/global-style'

export const CommentsContainer = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1001;
    .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
    &.layer {
      background: ${style["font-color-desc"]};
      opacity: 0.3;
      filter: none;
    }
  }
    
`