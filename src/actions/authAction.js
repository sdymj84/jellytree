import urls from '../urls'
import axios from 'axios'
import uuidv1 from 'uuid/v1'
import _ from 'lodash'

export const addAddress = async (user, address, dispatchUser) => {
  const id = uuidv1()
  try {
    const newAddress = {
      ...address, id
    }
    // Save new address to user DB
    const newUser = {
      ...user,
      addresses: [newAddress, ...user.addresses]
    }
    console.log('add address')
    await axios.post(urls.setUser, { user: newUser })

    // Update user info in session too
    sessionStorage.setItem('user', JSON.stringify(newUser))

    // Update state via reducer
    dispatchUser({
      type: 'ADD_ADDRESS_SUCCESS',
      payload: { address: newAddress }
    })
    return { newUser, id }
  } catch (e) {
    console.log(e)
    dispatchUser({
      type: 'ADD_ADDRESS_ERROR',
      payload: { error: e.response.message }
    })
  }
}


export const setShippingAddress = async (user, id, dispatchUser) => {
  let address = _.find(user.addresses, { 'id': id })
  address = { ...address, id }

  try {
    // Set the address to shipping address
    const newUser = {
      ...user,
      shippingAddress: address
    }
    console.log('set shipping address')
    await axios.post(urls.setUser, { user: newUser })

    // Update user info in session too
    sessionStorage.setItem('user', JSON.stringify(newUser))

    // Update state via reducer
    dispatchUser({
      type: 'SET_SHIPPING_ADDRESS_SUCCESS',
      payload: { address }
    })
  } catch (e) {
    console.log(e)
    dispatchUser({
      type: 'SET_SHIPPING_ADDRESS_ERROR',
      payload: { error: e.response.message }
    })
  }
}


export const removeAddress = async (user, id, dispatchUser) => {
  try {
    // Save new address to user DB
    const newUser = {
      ...user,
      addresses: user.addresses.filter(addr =>
        addr.id !== id),
      shippingAddress: user.shippingAddress.id === id
        ? ""
        : user.shippingAddress
    }
    console.log('remove address')
    console.log(user.addresses.length)
    await axios.post(urls.setUser, { user: newUser })

    // Update user info in session too
    sessionStorage.setItem('user', JSON.stringify(newUser))

    // Update state via reducer
    dispatchUser({
      type: 'REMOVE_ADDRESS_SUCCESS',
      payload: { id }
    })
  } catch (e) {
    console.log(e)
    dispatchUser({
      type: 'REMOVE_ADDRESS_ERROR',
      payload: { error: e.response.message }
    })
  }
}