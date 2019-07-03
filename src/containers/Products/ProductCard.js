import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import DotBonnet from '../../assets/products/babies/dot-bonnet.jpg'
import ReactStars from 'react-stars'

const StyledCard = styled(Card)`
  &&& {
    margin-bottom: 2em;
  }
`
const StyledImage = styled(Image)`
  object-fit: cover;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
`

const ProductCard = () => {
  return (
    <StyledCard fluid color="green">
      <StyledImage src={DotBonnet} />
      <Card.Content>
        <Card.Header>
          <small>$</small>10<small>.99</small>{' - '}
          <small>$</small>12<small>.99</small>
        </Card.Header>
        <Card.Description>
          <Flex>
            <Icon name="amazon" size="large" />
            <ReactStars
              count={5}
              size={22}
              color1={'#e5e5e5'}
              color2={'#ffd700'}
              edit={false}
              value={3.5} />
          </Flex>
        </Card.Description>
      </Card.Content>
    </StyledCard>
  )
}

export default ProductCard
