import React from 'react'
import { Card, Image, Popup } from 'semantic-ui-react'
import styled from 'styled-components'
import AmazonStars from '../../components/AmazonStars';
import { Link } from 'react-router-dom'
import _ from 'lodash'
import ProductErrorImage from '../../assets/jellytree_logo_full.jpg'

const isMobile = window.innerWidth < 600

const StyledCard = styled(Card)`
  &&& {
    margin-bottom: ${isMobile ? '0' : '2em'};
  }
  #price {
    font-size: 1.5em;
  }
  :hover {
    cursor: pointer;
  }
`
const StyledLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`

const ProductCard = ({ productInfo, colorFilters, sizeFilters }) => {
  // Don't show when ...
  // product doesn't have variations
  if (productInfo.variations.length === 0 ||
    // (Business decision) product doesn't have stock
    Number(productInfo.stock) === 0) {
    return null
  }

  const product = _.find(productInfo.variations,
    { 'sku': productInfo.frontProductSku })
  const minPrice = productInfo.minPrice.split('.')
  const maxPrice = productInfo.maxPrice.split('.')

  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = ProductErrorImage
    e.target.style.width = '40%'
    e.target.style.margin = 'auto'
    e.target.outerHTML =
      `<div
        style='text-align: center;
        margin: 1em;
        color: black; font-size: 1.5em;'>
        ${productInfo.title}
      </div>
      ${e.target.outerHTML}
      <div 
        style='text-align: center; 
        margin: 1em;
        color: tomato; font-size: 1.3em;'>
        Error on image loading
      </div>`
  }


  return (
    <StyledLink to={`/product/${productInfo.id}`}>
      <StyledCard fluid color="green">
        <Popup
          trigger={
            <Image
              src={product && product.thumbnail}
              onError={handleImageError}
              style={{ objectFit: 'cover' }} />}
          content={productInfo.title}
          position="top center"
        />
        <Card.Content>
          <Card.Header id="price">
            {productInfo.minPrice !== productInfo.maxPrice
              ? <span>
                <small>$</small>{minPrice[0]}
                <small>.{minPrice[1]}</small>{' - '}
              </span>
              : null}
            <small>$</small>{maxPrice[0]}
            <small>.{maxPrice[1]}</small>
          </Card.Header>
          <Card.Description>
            <AmazonStars />
          </Card.Description>
        </Card.Content>
      </StyledCard>
    </StyledLink>
  )
}

export default ProductCard
