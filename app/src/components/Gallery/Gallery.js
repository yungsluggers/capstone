import React, { Component } from 'react'
import styled from 'styled-components'


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

const imageArray = [
  "bear",
  "cat",
  "corn",
  "harp",
  "horse",
  "hotdogs",
  "lion",
  "meerkat",
  "mushroom",
  "plant",
  "puppies",
  "tiger"
]

class Gallery extends Component {
  render() {
    
    return (
      <ImageGrid>
        {
          imageArray.map(image => (
            <Image key={image}>
              <img src={require(`../../assets/images/${image}.jpg`)} alt="Gallery image" />
            </Image>
            )
          )
        }

      </ImageGrid>
    )
  }
}

export default Gallery