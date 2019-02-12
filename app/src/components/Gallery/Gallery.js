import React, { Component } from 'react'
import styled from 'styled-components'


function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../../assets/images/', false, /\.(png|jpe?g|svg)$/));

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
        {images.map(( img, i ) => {
          return (

            <Image key={i}>
              <img src={img} alt={"Gallery image #" + i}/>
            </Image>

          )
        })}
      </ImageGrid>
    )
  }
}

export default Gallery