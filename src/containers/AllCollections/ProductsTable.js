import React, { Fragment } from 'react'
// import styled from 'styled-components'
import ProductTable from './ProductTable'

// first table images
import BabyDenimSunBonnet from '../../assets/products/baby-denim-sun-bonnet.jpg'
import ToddlerSummerBonnet from '../../assets/products/toddler-summer-bonnet.jpg'
import BabySummerBonnet from '../../assets/products/baby-summer-bonnet.jpg'
import InfantSunBonnet from '../../assets/products/infant-sun-bonnet.jpg'
import CottonBabyBonnet from '../../assets/products/cotton-baby-bonnet.jpg'

// second table images
// import  from '../../assets/products/'
// import  from '../../assets/products/'
// import  from '../../assets/products/'
// import  from '../../assets/products/'
// import  from '../../assets/products/'

const firstTableProps = [
  {
    image: BabyDenimSunBonnet,
    title: "Baby Denim Sun Bonnet",
    material: "100% Cotton",
    ageSize: "3-18 Months",
    color: "3+",
  },
  {
    image: ToddlerSummerBonnet,
    title: "Toddler Summer Bonnet",
    material: "100% Breathable Cotton",
    ageSize: "3-18 Months",
    color: "4+",
  },
  {
    image: BabySummerBonnet,
    title: "Baby Summer Bonnet",
    material: "100% Breathable Cotton",
    ageSize: "3-18 Months",
    color: "4+",
  },
  {
    image: InfantSunBonnet,
    title: "Infant Sun Bonnet",
    material: "Linen",
    ageSize: "3-6 months",
    color: "2+",
  },
  {
    image: CottonBabyBonnet,
    title: "Cotton Baby Bonnet",
    material: "100% Cotton",
    ageSize: "1-24 Months",
    color: "8+",
  },
]

const secondTableProps = [
  {
    image: BabyDenimSunBonnet,
    title: "Toddler Denim Sun Hat",
    material: "100% Cotton",
    ageSize: "6-24 Months",
    color: "6+",
  },
  {
    image: ToddlerSummerBonnet,
    title: "Baby Bucket Summer Hat",
    material: "80% Cotton, 20% Rayon",
    ageSize: "6-24 Months",
    color: "6+",
  },
  {
    image: BabySummerBonnet,
    title: "Baby Reversible Sun Hat",
    material: "100% Cotton",
    ageSize: "6-24 Months",
    color: "3+",
  },
  {
    image: InfantSunBonnet,
    title: "Baby Gnome Bonnet",
    material: "100% Cotton",
    ageSize: "6-12 months",
    color: "2+",
  },
  {
    image: CottonBabyBonnet,
    title: "Newborn Baby Hat",
    material: "100% Cotton",
    ageSize: "0-2 Months",
    color: "3+",
  },
]



const ProductsTable = () => {
  return (
    <Fragment>
      <ProductTable props={firstTableProps} />
    </Fragment>
  )
}

export default ProductsTable
