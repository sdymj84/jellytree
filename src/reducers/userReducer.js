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
    case 'REMOVE_ADDRESS':
      break
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