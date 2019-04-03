import React, { Component } from 'react'

import SectionHeader from '../Section/SectionHeader'
import Galler from './Gallery'
import Gallery from './Gallery'

class GallerySection extends Component {
  render() {
    return (
      <div className={this.props.narrow ? 'l-container' : null}>
        <SectionHeader
          title={this.props.title}
          subtitle={this.props.subtitle}
        />
        <Gallery />
      </div>
    )
  }
}

export default GallerySection
