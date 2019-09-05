/* 
  modalShow (boolean), iconName (string), modalMessage (string),
  handleClose (function)
*/
import React from 'react'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'

const CheckModal = (props) => {
  const { modalShow, iconName, message } = props.modal
  return (
    <Modal basic size='tiny'
      open={modalShow}
      onClose={props.handleClose}>
      <Header icon={iconName} content={message} />
      <Modal.Actions>
        <Button basic color='red' inverted
          onClick={props.handleClose}>
          <Icon name='remove' /> No
      </Button>
        <Button color='green' inverted
          onClick={props.handleConfirm}>
          <Icon name='checkmark' /> Yes
      </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CheckModal
