import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ProductCard from './ProductCard'
import _ from 'lodash'


const FilteredProducts = ({ products, colorFilters, sizeFilters }) => {

  const [filteredProducts, setFilteredProducts] = useState(products)
  useEffect(() => {
    const newProducts = _.filter(products, product =>
      _.difference(colorFilters, product.colorMap).length === 0 &&
      _.difference(sizeFilters, product.sizeMap).length === 0)
    setFilteredProducts(newProducts)
  }, [products, colorFilters, sizeFilters])


  return (
    <Grid columns={4} doubling stackable>
      <Grid.Row>
        {_.map(filteredProducts, product => (
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
  )
}

export default FilteredProducts
