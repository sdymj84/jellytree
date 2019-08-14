import React from 'react'
import { Icon } from 'semantic-ui-react'

const CheckoutStepNumber = ({ number, isCompleted }) => {
  return (
    isCompleted
      ? <Icon name="check" size="big" />
      : <span style={{
        marginRight: '1.5em',
      }}>{number}</span>
  )
}

export default CheckoutStepNumber
