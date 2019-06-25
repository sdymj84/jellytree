import React from 'react'
import MainImage from '../../assets/collections_main.jpg'
import { Image, Container } from "semantic-ui-react";
import styled from 'styled-components'
import theme from '../../theme'
import BulletPoints from './BulletPoints';
import ProductsTable from './ProductsTable';

const StyledContainer = styled(Container)`
  .brand-detail-title {
    font-size: 1.1em;
    span {
      color: ${theme.contrastColor}
    }
  }
`
const Section = styled.div`
  margin: 5em 0;
`

const AllCollections = () => {
  return (
    <div>
      <Image src={MainImage} />
      <StyledContainer>
        <Section>
          <p className="brand-detail-title">
            <span>HappyTree: Baby Clothes & Accessories</span> -
            Discover Stylish and Practical Babies & Kids Accessories
          </p>
          <p>
            Be more adorable and get more compliments!
            HappyTree offers high quality & trust-worthy products
            made with special care for your baby's comfort & style.
            We are a family-oriented company who pay extra attention
            to babies / kids needs and craft safe, functional and
            fashionable products. We are specialized in designing
            toddlers & kids hats and scarves that can easily put on
            for any occasions or go wonderfully with everyday outfits.
            Mix and match our fun & lovely beanie hats / bonnets / scarves
            to add a little bit of cuteness and complete your young ones
            adorable outfit :)
          </p>
        </Section>
        <Section>
          <BulletPoints />
        </Section>
        <Section>
          <ProductsTable />
        </Section>
      </StyledContainer>
    </div>
  )
}

export default AllCollections
