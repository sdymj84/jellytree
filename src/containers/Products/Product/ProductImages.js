import React, { Fragment } from 'react'
import { Image } from 'semantic-ui-react'
import Slider from "react-slick";

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

          : <Image src="https://picsum.photos/1000"
            style={{ marginBottom: '2em' }} />
        }
      </div>
    </Fragment>
  )
}

export default Images
