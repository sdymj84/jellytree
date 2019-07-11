import React, { Fragment, useState } from 'react'
import { Image } from 'semantic-ui-react'
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify'
import _ from 'lodash'
import styled from 'styled-components'

const isMobile = window.innerWidth < 600

const Thumbnails = styled(Image)`
  box-shadow: ${p => p.selectedIndex === p.i
    ? "0 0 2px 1px tomato" : ""};

  :hover {
    box-shadow: 0 0 2px 1px tomato;
  }
`

const Images = (props) => {
  const selectedOption = _.find(props.availableColors, obj =>
    obj.color === props.selectedColor)
  const images = [
    selectedOption.mainImage,
    ...selectedOption.images
  ]

  const [selectedImage, setSelectedImage] = useState(images[0])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleThumbnailClick = (e, i) => {
    e.persist()
    console.log(i)
    setSelectedImage(e.target.src)
    // setSelectedIndex(i)
  }

  return (
    <Fragment>
      {!isMobile &&
        <div className="thumbnails">
          {_.map(images, (image, i) =>
            <Thumbnails key={i} src={image} alt="product images"
              selectedIndex={selectedIndex}
              i={i}
              // onMouseOver={() => console.log('hover')}
              onClick={(e) => handleThumbnailClick(e, i)} />
          )}
        </div>}

      <div className="main-image">
        {isMobile
          ? <div style={{ width: window.innerWidth, textAlign: 'center' }}>
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}>
              {_.map(images, (image, i) =>
                <Image key={i} src={image}
                  alt="product images"
                  style={{ marginBottom: '2em' }} />
              )}
            </Slider>
          </div>

          : < ReactImageMagnify
            enlargedImagePosition={window.innerWidth < 1046 ? "over" : "beside"}
            enlargedImageContainerDimensions={{
              width: '150%', height: '110%'
            }}
            isHintEnabled
            enlargedImageContainerStyle={{
              boxShadow: '0 0 5px 2px grey',
              zIndex: '2'
            }}
            {...{
              smallImage: {
                alt: 'Product image',
                isFluidWidth: true,
                src: selectedImage
              },
              largeImage: {
                src: selectedImage,
                width: 1500,
                height: 1500
              }
            }} />
        }
      </div>
    </Fragment>
  )
}

export default Images
