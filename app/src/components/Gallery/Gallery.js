import React, { Component } from 'react'
import styled from 'styled-components'

import { Images } from '../../assets/images/index'

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 0px 8px;
`

const Image = styled.div`
  img {
    max-width: 100%;
    border-radius: 2px;
  }
`

class Gallery extends Component {
  render() {
    
    return (
      <ImageGrid>
        {
          Object.keys(Images).map(function(key) {
            return (
              <Image key={key}>
                <img src={Images[key]} alt={key}/>
              </Image>
            )
          })
        }

      </ImageGrid>
    )
  }
}

export default Gallery