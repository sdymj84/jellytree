import React, { useState, useEffect } from 'react'
import {
  Grid, Ref, Rail, Sticky
} from 'semantic-ui-react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import _ from 'lodash'
import Filter from './Filter'

const isMobile = window.innerWidth < 600

const StyledContainer = styled.div`
  margin: ${isMobile ? '3em 10px' : '3em 40px'};

  .ui.left.rail {
    z-index: 0;
    width: 180px;
  }
  .column {
    min-width: ${isMobile ? '0' : '230px'};
  }
`
const ProductsContainer = styled.div`
  position: relative;
  padding-left: ${isMobile ? '0' : '220px'};
`

const Products = () => {
  const [contextRef, setContextRef] = useState(React.createRef())
  useEffect(() => {
    if (!contextRef.current) {
      setContextRef(React.createRef())
    }
  }, [contextRef])

  return (
    <StyledContainer>
      <Ref innerRef={contextRef}>
        <ProductsContainer>

          <Grid columns={4} doubling stackable>
            <Grid.Row>
              {_.times(images.length, i => (
                <Grid.Column key={i}>
                  <ProductCard image={images[i]} />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>

          {!isMobile &&
            <Rail dividing internal position='left'>
              <Sticky context={contextRef} offset={80}>
                <Filter />
              </Sticky>
            </Rail>}
        </ProductsContainer>
      </Ref>
    </StyledContainer>
  )
}


const images = [
  'https://picsum.photos/200',
  'https://picsum.photos/200',
  'https://picsum.photos/200',
  'https://picsum.photos/200',
  'https://picsum.photos/200',
  'https://picsum.photos/200',
  'https://picsum.photos/200',
]

export default Products
