import React, { useContext, useEffect } from 'react'
import {
  Container, Button, Segment,
  Header, Icon
} from 'semantic-ui-react'
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
  const { user } = useContext(AuthContext)
  const { listSaveForLaterProducts } = props
  const { saveForLaterProducts } = props.saveForLater

  useEffect(() => {
    user && user !== 'loading' && listSaveForLaterProducts(user)
  }, [user, listSaveForLaterProducts])



  if (!user) {
    return (
      <StyledContainer>
        <Segment
          placeholder>
          <Header icon as='h2'>
            Please sign in to save for later
          </Header>
        </Segment>
      </StyledContainer>
    )
  }

  if (props.saveForLater.isLoading) {
    return (
      <StyledContainer>
        <Segment placeholder loading />
      </StyledContainer>
    )
  }

  if (props.saveForLater.error) {
    return (
      <StyledContainer>
        <Segment placeholder>
          <Header icon as='h2'>
            <Icon name="warning circle" />
            Something went wrong
          </Header>
          <Button
            color="olive"
            onClick={listSaveForLaterProducts(user)}>
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


const mapStateToProps = (state) => ({
  saveForLater: state.saveForLater
})

const mapDispatchToProps = (dispatch) => {
  return {
    listSaveForLaterProducts: (user) => dispatch(listSaveForLaterProducts(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveForLater)
