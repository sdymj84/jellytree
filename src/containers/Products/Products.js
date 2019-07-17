import React, { useState, useEffect } from 'react'
import {
  Grid, Ref, Rail, Sticky
} from 'semantic-ui-react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import _ from 'lodash'
import Filter from './Filter'
import axios from 'axios'

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


  // const { products } = useContext(ProductContext)
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function listProducts() {
      try {
        const res = await axios.get('https://us-central1-jellytree-3cb33.cloudfunctions.net/listProducts')
        setProducts(res.data)
      } catch (e) {
        console.log("Error gettings products data", e)
      }
    }
    listProducts()
  }, [])

  console.log(products)

  return (
    <StyledContainer>
      <Ref innerRef={contextRef}>
        <ProductsContainer>

          <Grid columns={4} doubling stackable>
            <Grid.Row>
              {_.map(products, product => (
                <Grid.Column key={product.id}>
                  {product &&
                    <ProductCard
                      productDocId={product.id}
                      productInfo={product.data} />}
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

export default Products
