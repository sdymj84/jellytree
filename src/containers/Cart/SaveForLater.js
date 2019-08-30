import React, { useContext, useEffect } from 'react'
import {
  Container, Button, Segment,
  Header, Icon
} from 'semantic-ui-react'
import { CartContext } from '../../contexts/CartContext'
import styled from 'styled-components'
import SaveForLaterProduct from './SaveForLaterProduct';
import { connect } from "react-redux";
import { listSaveForLaterProducts } from '../../actions/saveForLaterActions';
import { AuthContext } from '../../contexts/AuthContext';

const isMobile = window.innerWidth < 600

const StyledContainer = styled(Container)`
  padding-left: ${isMobile && 0};
  padding-right: ${isMobile && 0};
  margin-bottom: 3em;
  .ui.placeholder.segment {
    min-height: 10rem;
  }
`


const SaveForLater = (props) => {
  const { saveForLaterRefetch } = useContext(CartContext)


  // ==== Test code =====================

  const { user } = useContext(AuthContext)
  const { listSaveForLaterProducts } = props

  useEffect(() => {
    user !== 'loading' && listSaveForLaterProducts(user)
  }, [user, listSaveForLaterProducts])

  const { saveForLaterProducts } = props.saveForLater

  // ====================================





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


const mapStateToProps = (state) => {
  return {
    saveForLater: state.saveForLater
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listSaveForLaterProducts: (user) => dispatch(listSaveForLaterProducts(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveForLater)
