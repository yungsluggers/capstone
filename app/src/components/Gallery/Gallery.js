import React, { Component } from 'react'
import styled from 'styled-components'
// '../../assets/images/'


function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../../assets/images/', false, /\.(png|jpe?g|svg)$/));
export { images }
// const images = importAll(require.context('../../../build/static/media', false, /\.(png|jpe?g|svg)$/));

// import bear from '../../assets/images/bear.jpg'
// import cat from '../../assets/images/cat.jpg'
// import corn from '../../assets/images/corn.jpg'
// import harp from '../../assets/images/harp.jpg'
// import horse from '../../assets/images/horse.jpg'
// import hotdogs from '../../assets/images/hotdogs.jpg'
// import lion from '../../assets/images/lion.jpg'
// import meerkat from '../../assets/images/meerkat.jpg'
// import mushroom from '../../assets/images/mushroom.jpg'
// import plant from '../../assets/images/plant.jpg'
// import puppies from '../../assets/images/puppies.jpg'
// import tiger from '../../assets/images/tiger.jpg'


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
      // <img src={bear} alt={"Gallery image #"}/>

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