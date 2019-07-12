import React, { useState, useRef, useEffect } from 'react'
import { Header, List, Button } from 'semantic-ui-react'
import AmazonStars from '../../../components/AmazonStars'
import styled from 'styled-components'
import theme from '../../../theme'
import ProductImages from './ProductImages'
import ProductSizes from './ProductSizes'
import ProductColors from './ProductColors'
import _ from 'lodash'

const isMobile = window.innerWidth < 600

const Container = styled.div`
  margin: 3em 10em;
  
  @media (max-width: 1300px) {
    margin: ${isMobile ? '0' : '3em 4em'};
  }

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & > div {
    margin: 1em;
  }

  .thumbnails {
    flex: 0 0 50px;
    img {
      margin-bottom: 1em;
    }
  }
  .main-image {
    flex: 1 1 400px;
  }
  
  .product-details {
    flex: 4 1 400px;
    margin-top: ${isMobile ? '3em' : '1em'};
    .list span {
      color: ${theme.color};
    }
  }

  .options {
    margin-bottom: 2em;
    .size-color-name {
      font-family: "Exo 2";
    }
  }
`
const Price = styled.span`
  &&& {
    font-size: 2em;
    font-family: "Exo 2";
    color: tomato;
  }
`
const StyledButton = styled(Button)`
  &&& {
    box-shadow: 0 0 15px -4px grey;
    margin-bottom: 3em;
    max-width: 500px;
  }
`

const useScroll = () => {
  const ref = useRef(null)
  const executeScroll = () => {
    window.scrollTo(0, ref.current.offsetTop - (window.innerHeight / 2) + 50)
  }
  const htmlElementAttributes = { ref }

  return [executeScroll, htmlElementAttributes]
}

const Product = () => {
  const [executeScroll, scrollHtmlAttributes] = useScroll()

  // When clicked Add to Cart
  const [selectedProductId, setSelectedProductId] = useState("")
  const handleAddToCart = () => {
    const product = _.find(productInfo.variations, { 'color': selectedColor, 'size': selectedSize })
    const pid = product && product.pid
    if (pid) {
      setSelectedProductId(pid)
    } else {
      executeScroll()
      setSizeNotSelected(true)
    }
  }
  useEffect(() => {
    selectedProductId &&
      alert(`Product ${selectedProductId} is added to cart.`)
  }, [selectedProductId])


  // When changed size from dropdown
  const [selectedSize, setSelectedSize] = useState("")
  const [sizeNotSelected, setSizeNotSelected] = useState(false)
  const handleSizeChange = (e, data) => {
    console.log('size changed')
    setSelectedSize(data.value)
    setSizeNotSelected(false)
  }
  const handleSizeClose = () => {
    console.log('dropdown closed')
    if (sizeNotSelected) {
      setSelectedSize("")
    }
  }

  // When changed color
  const frontProduct = _.maxBy(availableColors, 'soldCount')
  const [selectedColor, setSelectedColor] = useState(frontProduct.color)
  const handleColorChange = (i) => {
    setSelectedColor(availableColors[i].color)
  }
  useEffect(() => {
    const available = _.filter(productInfo.variations, (product) => {
      return product.color === selectedColor
        && product.size === selectedSize
        && product.stock !== 0
    })
    available.length === 0 && setSelectedSize("")
    // eslint-disable-next-line
  }, [selectedColor])


  // Render UI
  return (
    <Container>
      <ProductImages
        productInfo={productInfo}
        availableColors={availableColors}
        selectedColor={selectedColor} />

      <div className="product-details">
        <Header as="h1">
          Hat Summer Bonnet Breathable Double Gauze (Cotton) Toddler Sun Hat Infant Boys and Girls Beanie Cap, 3-18m
        </Header>
        <AmazonStars />
        <hr />
        <div className="options">
          Price : <Price>$10.99</Price>
        </div>

        <div className="options">
          <ProductSizes
            sizeNotSelected={sizeNotSelected}
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
            handleSizeClose={handleSizeClose}
            scrollHtmlAttributes={scrollHtmlAttributes}
            productInfo={productInfo}
            selectedColor={selectedColor}
            sizes={sizes} />
        </div>

        <div className="options">
          <ProductColors
            availableColors={availableColors}
            selectedColor={selectedColor}
            handleColorChange={handleColorChange}
            productInfo={productInfo}
            selectedSize={selectedSize} />
        </div>

        <div className="options">
          Product ID : <span style={{ fontFamily: "Arial" }}>88012345678</span>
        </div>

        <StyledButton fluid
          size="big" color="orange"
          onClick={handleAddToCart}>
          Add to Cart
        </StyledButton>

        <List>
          <List.Item>
            <List.Icon name="thumbs up outline" />
            <List.Content>
              <span>[ STYLE ]</span> : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.
              </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="thumbs up outline" />
            <List.Content>
              <span>[ DESIGN ]</span> : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)
              </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="thumbs up outline" />
            <List.Content>
              <span>[ PERFECT GIFT ]</span> : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!
              </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="thumbs up outline" />
            <List.Content>
              <span>[ MATERIAL & SIZE ]</span> : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.
              </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="thumbs up outline" />
            <List.Content>
              <span>[ 100% SATISFACTION ]</span> : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.
              </List.Content>
          </List.Item>
        </List>
      </div>
    </Container>
  )
}



const productInfo = {
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
}

const availableOptions = _.filter(productInfo.variations, v => v.stock > 0)
const availableColors = _.uniqBy(availableOptions, 'color')
const sizes = _.uniqBy(productInfo.variations, 'size')


export default Product
