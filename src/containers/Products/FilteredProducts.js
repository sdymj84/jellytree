import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ProductCard from './ProductCard'
import _ from 'lodash'
import NoProductMsg from '../../components/NoProductMsg'


const FilteredProducts = ({ products, colorFilters, sizeFilters,
  filteredProducts, setFilteredProducts }) => {

  useEffect(() => {
    const newProducts = _.filter(products, product =>
      _.difference(colorFilters, product.colorMap).length === 0 &&
      _.difference(sizeFilters, product.sizeMap).length === 0)
    setFilteredProducts(newProducts)
  }, [products, colorFilters, sizeFilters,
    setFilteredProducts])


  if (!filteredProducts.length) {
    return (
      <NoProductMsg msg="No products with this filter" />
    )
  }

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
