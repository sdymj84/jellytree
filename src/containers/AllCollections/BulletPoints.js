import React from 'react'
import { Grid, Card, Image } from "semantic-ui-react";
import ProtectionImage from '../../assets/bullet-points/protection.jpg'
import StyleImage from '../../assets/bullet-points/style.jpg'
import SoftnessImage from '../../assets/bullet-points/softness.jpg'
import styled from 'styled-components'
import theme from '../../theme'

const StyledContainer = styled.div`
  &&& {
    .card-title {
      color: ${theme.contrastColor};
    }
  }
`
const StyledImage = styled(Image)`
  object-fit: cover;
`
const BulletPoints = () => {
  return (
    <StyledContainer>
      <Grid columns={3} centered doubling stackable>
        <Grid.Row>

          <Grid.Column>
            <Card fluid color="green">
              <StyledImage src={ProtectionImage} />
              <Card.Content>
                <Card.Header className="card-title">PROTECTION</Card.Header>
                <Card.Description>
                  Babies & kids have thinner skin that is more vulnerable
                  than adult skin and special care must be taken to ensure
                  that it's well protected from the sun, cold, and scratches.
                  Keep your young one safe and comfy for any outdoor activity.
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card fluid color="green">
              <StyledImage src={StyleImage} />
              <Card.Content>
                <Card.Header className="card-title">STYLE</Card.Header>
                <Card.Description>
                  For any occasions, be more adorable and get more compliments!
                  Explore our stylish yet practical designs: infinity scarves,
                  reversible hats with adjustable bands & removable pom that are
                  easy to put on and take off.
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card fluid color="green">
              <StyledImage src={SoftnessImage} />
              <Card.Content>
                <Card.Header className="card-title">SOFTNESS</Card.Header>
                <Card.Description>
                  We use trustworthy & high-quality materials that are
                  y on a baby’s skin. Combed cotton, double layers,
                  fleece & 100% cotton lining provide extra warm & ultra
                  softness to our babies & kids.
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </StyledContainer>
  )
}

export default BulletPoints
