import React from 'react'
import { Card, Image, Popup } from 'semantic-ui-react'
import styled from 'styled-components'
import AmazonStars from '../../components/AmazonStars';
import { Link } from 'react-router-dom'
import _ from 'lodash'

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

const ProductCard = ({ productInfo }) => {
  const product = _.find(productInfo.variations,
    { 'pid': productInfo.frontProductId })
  const minPrice = productInfo.minPrice.split('.')
  const maxPrice = productInfo.maxPrice.split('.')

  return (
    <StyledLink to="/product/8809681780568">
      <StyledCard fluid color="green">
        <Popup
          trigger={
            <Image
              src={product.mainImage}
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
