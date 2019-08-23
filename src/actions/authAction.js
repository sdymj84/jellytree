import urls from '../urls'
import axios from 'axios'

export const addAddress = async (user, address, dispatchUser) => {
  try {
    // Save new address to user DB
    const newUser = {
      ...user,
      addresses: [address]
    }
    await axios.post(urls.setUser, { user: newUser })

    // Update state via reducer
    dispatchUser({
      type: 'ADD_ADDRESS_SUCCESS',
      payload: { address }
    })
  } catch (e) {
    console.log(e)
    dispatchUser({
      type: 'ADD_ADDRESS_ERROR',
      payload: { error: e.response.message }
    })
  }
}