import React, { useState, useEffect } from 'react'
import { Ref, Rail, Sticky } from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'
import Filter from './Filter'
import MobileFilter from './MobileFilter'
import axios from 'axios'
import JellyLoader from '../../components/JellyLoader'
import FilteredProducts from './FilteredProducts'
import urls from '../../urls';
import NoProductMsg from '../../components/NoProductMsg'

const isMobile = window.innerWidth < 600

const Container = styled.div`
  margin: ${isMobile ? '1em 10px' : '3em 40px'};
  min-height: 700px;
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

const Products = ({ category }) => {
  const [contextRef, setContextRef] = useState(() => React.createRef())
  useEffect(() => {
    if (!contextRef.current) {
      setContextRef(React.createRef())
    }
    // eslint-disable-next-line
  }, [])


  // Get products data from db and save to state
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    let isMounted = true
    async function listProducts() {
      try {
        setIsLoading(true)
        const res = await axios.get(urls.listProducts)
        setIsLoading(false)
        const c = _.filter(res.data, { 'category': category })
        isMounted && setProducts(category === 'all' ? res.data : c)
      } catch (e) {
        console.log("Error getting products data", e.response)
        setIsLoading(false)
      }
    }
    listProducts()
    return () => {
      isMounted = false
    }
  }, [category])


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
  const [colorFilters, setColorFilters] = useState(() =>
    JSON.parse(sessionStorage.getItem(`colorFilters${category}`)) || []
  )
  const [sizeFilters, setSizeFilters] = useState(() =>
    JSON.parse(sessionStorage.getItem(`sizeFilters${category}`)) || []
  )
  useEffect(() => {
    sessionStorage.setItem(`colorFilters${category}`, JSON.stringify(colorFilters))
    sessionStorage.setItem(`sizeFilters${category}`, JSON.stringify(sizeFilters))
  }, [category, colorFilters, sizeFilters])

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

  const [filteredProducts, setFilteredProducts] = useState(products)

  if (!isLoading && !products.length) {
    return (
      <NoProductMsg />
    )
  }

  return (
    <JellyLoader isLoading={isLoading}>
      <Container>
        <Ref innerRef={contextRef}>
          <ProductsContainer>
            {isMobile
              ? <MobileFilter
                colorMap={colorMap}
                colorFilters={colorFilters}
                sizeMap={sizeMap}
                sizeFilters={sizeFilters}
                handleColorFilter={handleColorFilter}
                handleSizeFilter={handleSizeFilter}
                filteredProducts={filteredProducts} />
              : <Rail dividing internal position='left'>
                <Sticky context={contextRef} offset={80}>
                  <Filter
                    colorMap={colorMap}
                    colorFilters={colorFilters}
                    sizeMap={sizeMap}
                    sizeFilters={sizeFilters}
                    handleColorFilter={handleColorFilter}
                    handleSizeFilter={handleSizeFilter} />
                </Sticky>
              </Rail>}
            <FilteredProducts
              products={products}
              colorFilters={colorFilters}
              sizeFilters={sizeFilters}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts} />
          </ProductsContainer>
        </Ref>
      </Container>
    </JellyLoader>
  )
}

export default Products
