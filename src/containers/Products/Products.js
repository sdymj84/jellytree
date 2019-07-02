import React from 'react'
import {
  Grid, Ref, Rail, Sticky, Header, Card
} from 'semantic-ui-react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import _ from 'lodash'

const StyledContainer = styled.div`
  margin: 3em 40px;

  .ui.left.rail {
    z-index: 0;
    width: 180px;
  }
`
const ProductsContainer = styled.div`
  position: relative;
  padding-left: 220px;
`

const Products = () => {
  const contextRef = React.createRef()

  return (
    <StyledContainer>
      <Ref innerRef={contextRef}>
        <ProductsContainer>

          <Grid columns={4} doubling stackable>
            <Grid.Row>
              {_.times(10, i => (
                <Grid.Column key={i}>
                  <ProductCard />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>

          <Rail dividing internal position='left'>
            <Sticky context={contextRef} offset={100}>
              <Header as='h3'>Filters</Header>
              <ul>
                <li>Color</li>
                <li>Size</li>
                <li>Category</li>
              </ul>
            </Sticky>
          </Rail>
        </ProductsContainer>
      </Ref>
    </StyledContainer>
  )
}

export default Products
