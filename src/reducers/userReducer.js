const userReducer = (user, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload.user

    case 'ADD_ADDRESS_SUCCESS':
      return {
        ...user,
        addresses: [action.payload.address, ...user.addresses]
      }
    case 'ADD_ADDRESS_ERROR':
      console.log(action.payload.error)
      return user

    case 'MODIFY_ADDRESS':
      return {
        ...user,
        addresses: [action.payload.address]
      }
    case 'REMOVE_ADDRESS_SUCCESS':
      return {
        ...user,
        addresses: user.addresses.filter(addr =>
          addr.id !== action.payload.id),
        shippingAddress: user.shippingAddress.id === action.payload.id
          ? ""
          : user.shippingAddress
      }
    case 'REMOVE_ADDRESS_ERROR':
      console.log(action.payload.error)
      return user

    case 'SET_SHIPPING_ADDRESS_SUCCESS':
      return {
        ...user,
        shippingAddress: action.payload.address
      }
    case 'SET_SHIPPING_ADDRESS_ERROR':
      console.log(action.payload.error)
      return user

    case 'ADD_PAYMENT':
      break
    case 'MODIFY_PAYMENT':
      break
    case 'REMOVE_PAYMENT':
      break
    default:
      break;
  }
}

export default userReducer