import React, { useContext } from 'react'
import {
  Container, Button, Segment,
  Header, Icon
} from 'semantic-ui-react'
import { CartContext } from '../../contexts/CartContext'
import styled from 'styled-components'
import SaveForLaterProduct from './SaveForLaterProduct';

const isMobile = window.innerWidth < 600

const StyledContainer = styled(Container)`
  padding-left: ${isMobile && 0};
  padding-right: ${isMobile && 0};
  .ui.placeholder.segment {
    min-height: 10rem;
  }
`


const SaveForLater = (props) => {
  const {
    saveForLaterProducts,
    saveForLaterRefetch,
  } = useContext(CartContext)

  if (saveForLaterProducts.loading) {
    return (
      <StyledContainer>
        <Segment placeholder loading />
      </StyledContainer>
    )
  }

  if (saveForLaterProducts.error) {
    return (
      <StyledContainer>
        <Segment placeholder>
          <Header icon as='h2'>
            <Icon name="warning circle" />
            Something went wrong
          </Header>
          <Button
            color="olive"
            onClick={saveForLaterRefetch}>
            RETRY
          </Button>
          <Header as='h3' textAlign="center">
            Please contact customer service if the problem persists
          </Header>
        </Segment>
      </StyledContainer>
    )
  }

  if (!saveForLaterProducts.length) {
    return (
      <StyledContainer>
        <Segment
          placeholder>
          <Header icon as='h2'>
            No items saved for later
          </Header>
        </Segment>
      </StyledContainer>
    )
  }

  return (
    <StyledContainer>
      {saveForLaterProducts.map(product =>
        <SaveForLaterProduct
          key={product.id}
          product={product} />
      )}
    </StyledContainer>
  )
}

export default SaveForLater
