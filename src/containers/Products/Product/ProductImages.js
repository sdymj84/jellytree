import React, { Fragment } from 'react'
import { Image } from 'semantic-ui-react'
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify'

const isMobile = window.innerWidth < 600

const Images = () => {
  return (
    <Fragment>
      {!isMobile &&
        <div className="thumbnails">
          <Image src="https://picsum.photos/100" />
          <Image src="https://picsum.photos/100" />
          <Image src="https://picsum.photos/100" />
          <Image src="https://picsum.photos/100" />
          <Image src="https://picsum.photos/100" />
          <Image src="https://picsum.photos/100" />
          <Image src="https://picsum.photos/100" />
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
              <Image src="https://picsum.photos/1000"
                style={{ marginBottom: '2em' }} />
              <Image src="https://picsum.photos/1000"
                style={{ marginBottom: '2em' }} />
              <Image src="https://picsum.photos/1000"
                style={{ marginBottom: '2em' }} />
            </Slider>
          </div>

          : < ReactImageMagnify
            enlargedImagePosition={window.innerWidth < 1046 ? "over" : "beside"}
            enlargedImageContainerDimensions={{ width: '150%', height: '110%' }}
            isHintEnabled
            enlargedImageContainerStyle={{
              boxShadow: '0 0 5px 2px grey',
              zIndex: '2'
            }}
            {...{
              smallImage: {
                alt: 'Product image',
                isFluidWidth: true,
                src: "https://picsum.photos/1000"
              },
              largeImage: {
                src: "https://picsum.photos/1000",
                width: 1200,
                height: 1200
              }
            }} />
        }
      </div>
    </Fragment>
  )
}

export default Images
