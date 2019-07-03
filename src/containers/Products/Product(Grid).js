import React from 'react'
import { Grid, Image, Header } from 'semantic-ui-react'
import AmazonStars from '../../components/AmazonStars'
import styled from 'styled-components'

const Container = styled.div`
  margin: 3em 10em;
  
  @media (max-width: 1150px) {
    margin: 3em 4em;
  }
`

const Product = () => {
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}
            style={{ flex: '0 0 80px' }}>
            <Image src="https://picsum.photos/100" />
            <Image src="https://picsum.photos/100" />
            <Image src="https://picsum.photos/100" />
            <Image src="https://picsum.photos/100" />
            <Image src="https://picsum.photos/100" />
          </Grid.Column>

          <Grid.Column width={5}
            style={{ flex: '1 1 0%', minWidth: '400px' }} >
            <Image src="https://picsum.photos/500"
              style={{ marginBottom: '2em' }} />
          </Grid.Column>

          <Grid.Column width={10}
            style={{ flex: '1 1 27%', minWidth: '400px' }}>
            <Header as="h1">
              Hat Summer Bonnet Breathable Double Gauze (Cotton) Toddler Sun Hat Infant Boys and Girls Beanie Cap, 3-18m
            </Header>
            <AmazonStars />
            <hr />
            <div>Price : $10.99</div>
            <p>
              [ STYLE ] : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.
              [ DESIGN ] : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)
              [ PERFECT GIFT ] : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!
              [ MATERIAL & SIZE ] : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.
              [ 100% SATISFACTION ] : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Product
