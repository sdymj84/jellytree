import urls from '../urls'
import axios from 'axios'
import uuidv1 from 'uuid/v1'

export const addAddress = async (user, address, dispatchUser) => {
  try {
    const newAddress = {
      ...address,
      id: uuidv1(),
    }
    // Save new address to user DB
    const newUser = {
      ...user,
      addresses: [newAddress, ...user.addresses]
    }
    console.log('add address')
    await axios.post(urls.setUser, { user: newUser })

    // Update state via reducer
    dispatchUser({
      type: 'ADD_ADDRESS_SUCCESS',
      payload: { address: newAddress }
    })
    return newUser
  } catch (e) {
    console.log(e)
    dispatchUser({
      type: 'ADD_ADDRESS_ERROR',
      payload: { error: e.response.message }
    })
  }
}
// TODO: fix issue - when adding new address, 
//        id is not added to shipping address
export const setShippingAddress = async (user, address, dispatchUser) => {
  try {
    // Set the address to shipping address
    const newUser = {
      ...user,
      shippingAddress: address
    }
    console.log('set shipping address', user)
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
      shippingAddress: user.shippingAddress.id
    }
    console.log('remove address')
    await axios.post(urls.setUser, { user: newUser })

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