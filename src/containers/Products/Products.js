import React, { useState, useEffect } from 'react'
import {
  Grid, Ref, Rail, Sticky
} from 'semantic-ui-react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import _ from 'lodash'
import Filter from './Filter'
import axios from 'axios'
import JellyLoader from '../../components/JellyLoader'

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


  // Get products data from db and save to state
  const [products, setProducts] = useState([])
  useEffect(() => {
    let isMounted = true
    async function listProducts() {
      try {
        const res = await axios.get('https://us-central1-jellytree-3cb33.cloudfunctions.net/listProducts')
        isMounted && setProducts(res.data)
      } catch (e) {
        console.log("Error getting products data", e)
      }
    }
    listProducts()
    return () => {
      isMounted = false
    }
  }, [])


  // Extract Color Map and Size Map from products and save to array
  let colorMap = []
  let sizeMap = []
  _.forEach(products, product => {
    colorMap.push(...product.colorMap)
    sizeMap.push(...product.sizeMap)
  })
  colorMap = _.uniq(colorMap).sort()
  sizeMap = _.uniq(sizeMap).sort()


  // Controlled filter states
  const [colorFilters, setColorFilters] = useState(
    JSON.parse(localStorage.getItem('colorFilters')) || []
  )
  const [sizeFilters, setSizeFilters] = useState(
    JSON.parse(localStorage.getItem('sizeFilters')) || []
  )
  useEffect(() => {
    localStorage.setItem('colorFilters', JSON.stringify(colorFilters))
    localStorage.setItem('sizeFilters', JSON.stringify(sizeFilters))
  }, [colorFilters, sizeFilters])

  const handleColorFilter = (e) => {
    e.persist()
    const selectedColor = e.target.innerText
    const newColorFilters = _.filter(colorFilters, v => v !== selectedColor)
    if (colorFilters.length === newColorFilters.length) {
      setColorFilters(prevColorFilters => [...prevColorFilters, selectedColor])
    } else {
      setColorFilters(newColorFilters)
    }
  }
  const handleSizeFilter = (e) => {
    e.persist()
    const selectedSize = e.target.innerText
    const newSizeFilters = _.filter(sizeFilters, v => v !== selectedSize)
    if (sizeFilters.length === newSizeFilters.length) {
      setSizeFilters(prevSizeFilters => [...prevSizeFilters, selectedSize])
    } else {
      setSizeFilters(newSizeFilters)
    }
  }


  return (
    <JellyLoader isLoading={!products}>
      <StyledContainer>
        <Ref innerRef={contextRef}>
          <ProductsContainer>
            <Grid columns={4} doubling stackable>
              <Grid.Row>
                {_.map(products, product => (
                  <Grid.Column key={product.id}>
                    {product &&
                      <ProductCard
                        productInfo={product}
                        colorFilters={colorFilters}
                        sizeFilters={sizeFilters} />}
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>

            {!isMobile &&
              <Rail dividing internal position='left'>
                <Sticky context={contextRef} offset={80}>
                  <Filter
                    colorMap={colorMap}
                    colorFilters={colorFilters}
                    sizeFilters={sizeFilters}
                    sizeMap={sizeMap}
                    handleColorFilter={handleColorFilter}
                    handleSizeFilter={handleSizeFilter} />
                </Sticky>
              </Rail>}
          </ProductsContainer>
        </Ref>
      </StyledContainer>
    </JellyLoader>
  )
}

export default Products
