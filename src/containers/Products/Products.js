import React, { useState, useEffect } from 'react'
import { Ref, Rail, Sticky } from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'
import Filter from './Filter'
import axios from 'axios'
import JellyLoader from '../../components/JellyLoader'

import FilteredProducts from './FilteredProducts'
import urls from '../../urls';

const isMobile = window.innerWidth < 600

const Container = styled.div`
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
        const res = await axios.get(urls.listProducts)
        isMounted && setProducts(res.data)
      } catch (e) {
        console.log("Error getting products data", e.response)
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
    JSON.parse(sessionStorage.getItem('colorFilters')) || []
  )
  const [sizeFilters, setSizeFilters] = useState(
    JSON.parse(sessionStorage.getItem('sizeFilters')) || []
  )
  useEffect(() => {
    sessionStorage.setItem('colorFilters', JSON.stringify(colorFilters))
    sessionStorage.setItem('sizeFilters', JSON.stringify(sizeFilters))
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
    <JellyLoader isLoading={!products.length}>
      <Container>
        <Ref innerRef={contextRef}>
          <ProductsContainer>
            <FilteredProducts
              products={products}
              colorFilters={colorFilters}
              sizeFilters={sizeFilters} />

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
      </Container>
    </JellyLoader>
  )
}

export default Products
