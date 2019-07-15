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
              {/* {_.times(images.length, i => (
                <Grid.Column key={i}>
                  <ProductCard image={images[i]} />
                </Grid.Column>
              ))} */}
              {_.map(products, product => (
                <Grid.Column key={product.sku}>
                  <ProductCard productInfo={product} />
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


const products = [
  {
    sku: 'JT-BH-P',
    title: 'Summer Bonnet Breathable Double Gauze Beanie Cap',
    minPrice: '10.99',
    maxPrice: '12.99',
    sizeMap: ['Small', 'Medium'],
    colorMap: ['White', 'Pink'],
    soldCount: 60,
    stock: 10,
    frontProductId: '8802',
    variations: [
      {
        pidType: 'EAN',
        pid: '8801',
        sku: 'JT-BH-WHS',
        title: 'Summer Bonnet Breathable Double Gauze Beanie Cap, 3-18m',
        color: 'White',
        colorMap: 'White',
        size: 'S / 3-6 Months',
        sizeMap: 'Small',
        material: 'Cotton',
        price: '10.99',
        stock: 0,
        soldCount: 30,
        mainImage: 'https://picsum.photos/1000',
        thumbnail: 'https://picsum.photos/100',
        images: [
          'https://picsum.photos/1000',
          'https://picsum.photos/900',
        ],
        bulletPoints: [
          '[ STYLE ] : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.',
          '[ DESIGN ] : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)',
          '[ PERFECT GIFT ] : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!',
          '[ MATERIAL & SIZE ] : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.',
          '[ 100% SATISFACTION ] : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.',
        ]
      },
      {
        pidType: 'EAN',
        pid: '8802',
        sku: 'JT-BH-WHM',
        title: 'Summer Bonnet Breathable Double Gauze Beanie Cap, 3-18m',
        color: 'White',
        colorMap: 'White',
        size: 'M / 6-12 Months',
        sizeMap: 'Medium',
        material: 'Cotton',
        price: '10.99',
        stock: 10,
        soldCount: 20,
        mainImage: 'https://picsum.photos/1000',
        thumbnail: 'https://picsum.photos/100',
        images: [
          'https://picsum.photos/1000',
          'https://picsum.photos/900',
        ],
        bulletPoints: [
          '[ STYLE ] : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.',
          '[ DESIGN ] : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)',
          '[ PERFECT GIFT ] : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!',
          '[ MATERIAL & SIZE ] : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.',
          '[ 100% SATISFACTION ] : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.',
        ]
      },
      {
        pidType: 'EAN',
        pid: '8803',
        sku: 'JT-BH-PKS',
        title: 'Summer Bonnet Breathable Double Gauze Beanie Cap, 3-18m',
        color: 'Pink',
        colorMap: 'Pink',
        size: 'S / 3-6 Months',
        sizeMap: 'Small',
        material: 'Cotton',
        price: '10.99',
        stock: 10,
        soldCount: 21,
        mainImage: 'https://picsum.photos/1100',
        thumbnail: 'https://picsum.photos/100',
        images: [
          'https://picsum.photos/1000',
          'https://picsum.photos/900',
        ],
        bulletPoints: [
          '[ STYLE ] : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.',
          '[ DESIGN ] : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)',
          '[ PERFECT GIFT ] : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!',
          '[ MATERIAL & SIZE ] : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.',
          '[ 100% SATISFACTION ] : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.',
        ]
      }
    ]
  },
  {
    sku: 'JT-IS-P',
    title: 'Summer Bonnet Breathable Double Gauze Beanie Cap',
    minPrice: '12.99',
    maxPrice: '14.99',
    sizeMap: ['Small', 'Medium'],
    colorMap: ['White', 'Pink'],
    soldCount: 60,
    stock: 10,
    frontProductId: '8812',
    variations: [
      {
        pidType: 'EAN',
        pid: '8811',
        sku: 'JT-IS-WHS',
        title: 'Summer Bonnet Breathable Double Gauze Beanie Cap, 3-18m',
        color: 'White',
        colorMap: 'White',
        size: 'S / 3-6 Months',
        sizeMap: 'Small',
        material: 'Cotton',
        price: '10.99',
        stock: 0,
        soldCount: 30,
        mainImage: 'https://picsum.photos/1000',
        thumbnail: 'https://picsum.photos/100',
        images: [
          'https://picsum.photos/1000',
          'https://picsum.photos/900',
        ],
        bulletPoints: [
          '[ STYLE ] : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.',
          '[ DESIGN ] : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)',
          '[ PERFECT GIFT ] : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!',
          '[ MATERIAL & SIZE ] : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.',
          '[ 100% SATISFACTION ] : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.',
        ]
      },
      {
        pidType: 'EAN',
        pid: '8812',
        sku: 'JT-IS-WHM',
        title: 'Summer Bonnet Breathable Double Gauze Beanie Cap, 3-18m',
        color: 'White',
        colorMap: 'White',
        size: 'M / 6-12 Months',
        sizeMap: 'Medium',
        material: 'Cotton',
        price: '10.99',
        stock: 10,
        soldCount: 20,
        mainImage: 'https://picsum.photos/1000',
        thumbnail: 'https://picsum.photos/100',
        images: [
          'https://picsum.photos/1000',
          'https://picsum.photos/900',
        ],
        bulletPoints: [
          '[ STYLE ] : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.',
          '[ DESIGN ] : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)',
          '[ PERFECT GIFT ] : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!',
          '[ MATERIAL & SIZE ] : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.',
          '[ 100% SATISFACTION ] : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.',
        ]
      },
      {
        pidType: 'EAN',
        pid: '8813',
        sku: 'JT-IS-PKS',
        title: 'Summer Bonnet Breathable Double Gauze Beanie Cap, 3-18m',
        color: 'Pink',
        colorMap: 'Pink',
        size: 'S / 3-6 Months',
        sizeMap: 'Small',
        material: 'Cotton',
        price: '10.99',
        stock: 10,
        soldCount: 21,
        mainImage: 'https://picsum.photos/1100',
        thumbnail: 'https://picsum.photos/100',
        images: [
          'https://picsum.photos/1000',
          'https://picsum.photos/900',
        ],
        bulletPoints: [
          '[ STYLE ] : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.',
          '[ DESIGN ] : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)',
          '[ PERFECT GIFT ] : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!',
          '[ MATERIAL & SIZE ] : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.',
          '[ 100% SATISFACTION ] : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.',
        ]
      }
    ]
  },
  {
    sku: 'JT-DH-P',
    title: 'Denim Hat',
    minPrice: '11.99',
    maxPrice: '11.99',
    sizeMap: ['Small', 'Large'],
    colorMap: ['White', 'Pink'],
    soldCount: 60,
    stock: 10,
    frontProductId: '8822',
    variations: [
      {
        pidType: 'EAN',
        pid: '8821',
        sku: 'JT-DH-WHS',
        title: 'Summer Bonnet Breathable Double Gauze Beanie Cap, 3-18m',
        color: 'White',
        colorMap: 'White',
        size: 'S / 3-6 Months',
        sizeMap: 'Small',
        material: 'Cotton',
        price: '10.99',
        stock: 0,
        soldCount: 30,
        mainImage: 'https://picsum.photos/1000',
        thumbnail: 'https://picsum.photos/100',
        images: [
          'https://picsum.photos/1000',
          'https://picsum.photos/900',
        ],
        bulletPoints: [
          '[ STYLE ] : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.',
          '[ DESIGN ] : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)',
          '[ PERFECT GIFT ] : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!',
          '[ MATERIAL & SIZE ] : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.',
          '[ 100% SATISFACTION ] : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.',
        ]
      },
      {
        pidType: 'EAN',
        pid: '8822',
        sku: 'JT-DH-WHM',
        title: 'Summer Bonnet Breathable Double Gauze Beanie Cap, 3-18m',
        color: 'White',
        colorMap: 'White',
        size: 'M / 6-12 Months',
        sizeMap: 'Medium',
        material: 'Cotton',
        price: '10.99',
        stock: 10,
        soldCount: 20,
        mainImage: 'https://picsum.photos/1000',
        thumbnail: 'https://picsum.photos/100',
        images: [
          'https://picsum.photos/1000',
          'https://picsum.photos/900',
        ],
        bulletPoints: [
          '[ STYLE ] : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.',
          '[ DESIGN ] : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)',
          '[ PERFECT GIFT ] : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!',
          '[ MATERIAL & SIZE ] : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.',
          '[ 100% SATISFACTION ] : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.',
        ]
      },
      {
        pidType: 'EAN',
        pid: '8823',
        sku: 'JT-DH-PKS',
        title: 'Summer Bonnet Breathable Double Gauze Beanie Cap, 3-18m',
        color: 'Pink',
        colorMap: 'Pink',
        size: 'L / 6-12 Months',
        sizeMap: 'Large',
        material: 'Cotton',
        price: '10.99',
        stock: 10,
        soldCount: 21,
        mainImage: 'https://picsum.photos/1100',
        thumbnail: 'https://picsum.photos/100',
        images: [
          'https://picsum.photos/1000',
          'https://picsum.photos/900',
        ],
        bulletPoints: [
          '[ STYLE ] : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.',
          '[ DESIGN ] : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)',
          '[ PERFECT GIFT ] : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!',
          '[ MATERIAL & SIZE ] : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.',
          '[ 100% SATISFACTION ] : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.',
        ]
      }
    ]
  }
]

export default Products
