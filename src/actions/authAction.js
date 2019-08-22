import urls from '../urls'
import axios from 'axios'

export const addAddress = async (user, newAddress, dispatchUser) => {
  try {
    // Save new address to user DB
    console.log(user)
    const newUser = {
      ...user,
      addresses: [newAddress, ...user.addresses]
    }
    await axios.post(urls.setUser, { user: newUser })

    // Update state via reducer
    dispatchUser({
      type: 'ADD_ADDRESS_SUCCESS',
      payload: { newAddress }
    })
  } catch (e) {
    console.log(e)
    dispatchUser({
      type: 'ADD_ADDRESS_ERROR',
      payload: { error: e.response.message }
    })
  }
}