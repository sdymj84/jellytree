import React from 'react'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'

const ConfirmModal = (props) => {
  return (
    <Modal basic size='tiny'
      closeOnDimmerClick={false}
      open={props.modalShow}>
      <Header icon={props.iconName} content={props.modalMessage} />
      <Modal.Actions>
        <Button basic color='red' inverted
          onClick={() => props.handleModalClose('no')} >
          <Icon name='remove' /> {props.noButton}
        </Button>
        <Button color='green' inverted
          onClick={props.handleYesClick}>
          <Icon name='checkmark' /> {props.yesButton}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ConfirmModal
