import React from 'react'
import { Image, Header, List, Dropdown } from 'semantic-ui-react'
import AmazonStars from '../../components/AmazonStars'
import styled from 'styled-components'
import theme from '../../theme'

const Container = styled.div`
  margin: 3em 10em;
  
  @media (max-width: 1300px) {
    margin: 3em 4em;
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
    flex: 1 0 400px;
  }
  .product-details {
    flex: 4 0 400px;
    span {
      color: ${theme.color};
    }
  }

  .options {
    margin-bottom: 1em;
  }
`
const Color = styled.div`
  display: flex;
  flex-wrap: wrap;
  img {
    width: 50px;
    margin: 0.5em 0.5em 0.5em 0;
    border-radius: 50%;
    border: 1px solid grey;
    flex: 0 0 50px;
    :hover {
      cursor: pointer;
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

const sizeOptions = [
  {
    key: 'Select',
    text: 'Select',
    value: 'Select',
  },
  {
    key: 'S / 3-6 Months',
    text: 'S / 3-6 Months',
    value: 'S / 3-6 Months',
  },
  {
    key: 'M / 6-12 Months',
    text: 'M / 6-12 Months',
    value: 'M / 6-12 Months',
  },
]

const Product = () => {
  return (
    <Container>
      <div className="thumbnails">
        <Image src="https://picsum.photos/100" />
        <Image src="https://picsum.photos/100" />
        <Image src="https://picsum.photos/100" />
        <Image src="https://picsum.photos/100" />
        <Image src="https://picsum.photos/100" />
        <Image src="https://picsum.photos/100" />
        <Image src="https://picsum.photos/100" />
      </div>

      <div className="main-image">
        <Image src="https://picsum.photos/1000"
          style={{ marginBottom: '2em' }} />
      </div>

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
          <div>Size : </div>
          <Dropdown
            placeholder='Select'
            selection
            options={sizeOptions}
          />
        </div>

        <div className="options">
          <div>Color : Pink</div>
          <Color>
            <Image src="https://picsum.photos/100" />
            <Image src="https://picsum.photos/100" />
            <Image src="https://picsum.photos/100" />
            <Image src="https://picsum.photos/100" />
            <Image src="https://picsum.photos/100" />
            <Image src="https://picsum.photos/100" />
            <Image src="https://picsum.photos/100" />
          </Color>
        </div>

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

export default Product
