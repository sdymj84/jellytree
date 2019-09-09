import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Divider, Header, Message } from 'semantic-ui-react'
import styled from 'styled-components'
import { AuthContext } from '../../contexts/AuthContext';
import { addAddress, modifyAddress } from '../../actions/authAction';
import LoaderButton from '../../components/LoaderButton';
import validator from 'validator'

const StyledForm = styled(Form)`
  margin-top: 1.5em;
`



// TODO: data validation
const ShippingAddressForm = ({ addr, setIsShowAddrForm, isEdit }) => {
  const { user, dispatchUser } = useContext(AuthContext)
  const [forms, setForms] = useState({
    email: addr ? addr.email : "",
    phone: addr ? addr.phone : "",
    firstName: addr ? addr.firstName : "",
    middleName: addr ? addr.middleName : "",
    lastName: addr ? addr.lastName : "",
    streetName: addr ? addr.streetName : "",
    unit: addr ? addr.unit : "",
    city: addr ? addr.city : "",
    state: addr ? addr.state : "",
    zipcode: addr ? addr.zipcode : "",
  })
  useEffect(() => {
    setForms({
      email: addr ? addr.email : "",
      phone: addr ? addr.phone : "",
      firstName: addr ? addr.firstName : "",
      middleName: addr ? addr.middleName : "",
      lastName: addr ? addr.lastName : "",
      streetName: addr ? addr.streetName : "",
      unit: addr ? addr.unit : "",
      city: addr ? addr.city : "",
      state: addr ? addr.state : "",
      zipcode: addr ? addr.zipcode : "",
    })
  }, [addr])



  // Form validation
  const [errorMessage, setErrorMessage] = useState([])
  const validateForm = (data) => {
    const msg = []
    try {
      if (!validator.isEmail(data.email)) {
        msg.push("Please input valid email address.")
      }
      if (!validator.isMobilePhone(data.phone)) {
        msg.push("Please input valid phone number.")
      }
      if (!validator.isPostalCode(data.zipcode, 'US')) {
        msg.push("Please input valid zipcode")
      }

      if (msg.length) {
        throw new Error(msg)
      }
      return true
    } catch (e) {
      setErrorMessage(e.message.split(','))
      return false
    }
  }



  const handleChange = (e, { name, value }) => {
    setForms(forms => ({
      ...forms,
      [name]: value
    }))
  }

  const [isLoading, setIsLoading] = useState(false)
  // Save new address
  const handleSubmit = async () => {
    setIsLoading(true)
    setErrorMessage([])
    if (validateForm(forms)) {
      isEdit
        ? await modifyAddress(user, addr.id, forms, dispatchUser)
        : await addAddress(user, forms, dispatchUser)
      setIsLoading(false)
      setIsShowAddrForm(false)
    } else {
      setIsLoading(false)
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault()
    setIsShowAddrForm(false)
  }

  return (
    <React.Fragment>
      <Divider horizontal>
        <Header as='h3'>
          {isEdit ? 'Edit Address' : 'Add Address'}
        </Header>
      </Divider>

      <StyledForm onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Input
            required
            label='Email for order confirmation' width={10}
            name='email' value={forms.email}
            onChange={handleChange} />
          <Form.Input
            label='Phone Number' width={6}
            name='phone' value={forms.phone}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Input label='First Name' width={6}
            required
            name='firstName' value={forms.firstName}
            onChange={handleChange} />
          <Form.Input label='Middle Name' width={4}
            name='middleName' value={forms.middleName}
            onChange={handleChange} />
          <Form.Input label='Last Name' width={6}
            required
            name='lastName' value={forms.lastName}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Input label='Street Name' width={12}
            required
            name='streetName' value={forms.streetName}
            onChange={handleChange} />
          <Form.Input label='Unit/Apt/Suite #' width={4}
            name='unit' value={forms.unit}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Input label='City' width={7}
            required
            name='city' value={forms.city}
            onChange={handleChange} />
          <Form.Input label='State' width={5}
            required
            name='state' value={forms.state}
            onChange={handleChange} />
          <Form.Input label='Zipcode' width={4}
            required
            name='zipcode' value={forms.zipcode}
            onChange={handleChange} />
        </Form.Group>
        {errorMessage.length
          ? <Message
            negative
            header='There was some errors with your submission'
            list={errorMessage}
          /> : null}
        <Form.Group>
          <LoaderButton
            style={{ marginLeft: '7px' }}
            content="Save"
            isLoading={isLoading}
            color="green" size="small" />
          {!isLoading && <Button
            content="Cancel"
            color="orange" size="small"
            onClick={handleCancelClick} />}
        </Form.Group>
      </StyledForm>
    </React.Fragment>
  )
}

export default ShippingAddressForm
