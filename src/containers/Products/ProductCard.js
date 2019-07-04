import React from 'react'
import { Card, Image, Popup } from 'semantic-ui-react'
import styled from 'styled-components'
import DotBonnet from '../../assets/products/babies/dot-bonnet.jpg'
import AmazonStars from '../../components/AmazonStars';
import { Link } from 'react-router-dom'

const StyledCard = styled(Card)`
  &&& {
    margin-bottom: 2em;
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

const ProductCard = () => {
  return (
    <StyledLink to="/product/8809681780568">
      <StyledCard fluid color="green">
        <Popup
          trigger={<Image src={DotBonnet} style={{ objectFit: 'cover' }} />}
          content="Summer Bonnet Breathable Double Gauze (Cotton), 3-18m"
          position="top center"
        />
        <Card.Content>
          <Card.Header id="price">
            <small>$</small>10<small>.99</small>{' - '}
            <small>$</small>12<small>.99</small>
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
