import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import ProtectionImage from '../../assets/bullet-points/protection.jpg'

const StyledCard = styled(Card)`
  &&& {
    margin-bottom: 2em;
  }
`
const StyledImage = styled(Image)`
  object-fit: cover;
`

const ProductCard = () => {
  return (
    <StyledCard fluid color="green">
      <StyledImage src={ProtectionImage} />
      <Card.Content>
        <Card.Header>$12.99</Card.Header>
        <Card.Description>
          * * * * *
        </Card.Description>
      </Card.Content>
    </StyledCard>
  )
}

export default ProductCard
