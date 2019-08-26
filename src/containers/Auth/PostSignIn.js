import React, {
  useContext, useCallback,
  useEffect, useState
} from 'react'
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import ConfirmModal from '../../components/ConfirmModal';
import urls from '../../urls'
import axios from 'axios'

const PostSignIn = () => {
  const { auth, db, dispatchUser } = useContext(AuthContext)
  const { cartProducts, dispatchCartProducts,
    dispatchSaveForLaterProducts } = useContext(CartContext)
  const [modalShow, setModalShow] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const handleModalClose = () => {
    setModalShow(false)
  }


  const [isLoading, setIsLoading] = useState(false)
  const moveToSaveForLater = async (userCartProducts) => {
    try {
      setIsLoading(true)
      await axios.put(urls.batchMoveToSaveForLater, {
        cartProducts: userCartProducts
      })
      setIsLoading(false)

      userCartProducts.forEach(product => {
        dispatchCartProducts({
          type: 'REMOVE_PRODUCT_SUCCESS',
          payload: { id: product.id }
        })
        dispatchSaveForLaterProducts({
          type: 'ADD_PRODUCT_SUCCESS',
          payload: { newSaveForLaterProducts: product }
        })
      })
    } catch (e) {
      setIsLoading(false)
      console.log("Error while moving to Save For Later : ",
        e.response.data.message)
    }
  }


  // const [uid, setUid] = useState("")
  const [cartSnapshot, setCartSnapshot] = useState("")
  const [sessionCart, setSessionCart] = useState(
    JSON.parse(sessionStorage.getItem('cart')) || []
  )


  const signIn = useCallback(async (authUser) => {
    const { uid } = authUser
    // setUid(uid)
    if (!db) { return }

    const userSnapshot = await db.collection('users')
      .where('uid', '==', uid).get()

    // New user signed up
    if (userSnapshot.empty) {
      console.log('welcome new user')
      const nameArray = authUser.displayName.split(' ')
      const newUser = {
        uid: uid,
        email: authUser.email,
        displayName: authUser.displayName,
        emailVerified: authUser.emailVerified,
        isAnonymous: authUser.isAnonymous,
        creationTime: authUser.metadata.creationTime,
        lastSignInTime: authUser.metadata.lastSignInTime,
        firstName: nameArray[0],
        lastName: nameArray[nameArray.length - 1],
        phoneNumber: '',
        addresses: [],
        shippingAddress: {},
        paymentMethod: [],
        cart: [],
        hasAddress: false,
        hasPayment: false,
      }
      dispatchUser({
        type: 'SET_USER',
        payload: { user: newUser }
      })
      sessionStorage.setItem('user', JSON.stringify(newUser))
      try {
        await db.collection('users').doc(uid).set(newUser)
      } catch (e) {
        console.log("Error adding user data to DB", e)
      }
    }

    // Existing user signed in
    else {
      console.log('hello again')
      userSnapshot.forEach(userDoc => {
        dispatchUser({
          type: 'SET_USER',
          payload: { user: userDoc.data() }
        })
        sessionStorage.setItem('user', JSON.stringify(userDoc.data()))
      })
    }


    try {
      // const sessionCart = JSON.parse(sessionStorage.getItem('cart')) || []
      // setSessionCart(sessionCart)

      // No session cart : user login without adding cart
      if (!sessionCart.length) {
        console.log("user logged in without adding cart")
      }
      // There's session cart : user added cart and login
      else {
        console.log("user added cart anonymously and logged in")
        const cartSnapshot = await db.collection('cart')
          .where('uid', '==', uid).get()
        setCartSnapshot(cartSnapshot)

        // No user cart : just copy session cart to user cart
        if (cartSnapshot.empty) {
          console.log("Your user cart is empty, saving session cart to db")
          handleMoveSessionToDB(false, uid)
        }
        // There's user cart : merge? or saveToLater?
        else {
          setModalShow(true)
          setModalMessage("You have previously saved cart products, " +
            "would you like to merge with the new ones?")
        }
      }
    } catch (e) {
      console.log("Error getting user data from DB", e)
    }
    // eslint-disable-next-line
  }, [db, dispatchUser])


  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        if (authUser) {
          signIn(authUser)
        } else {
          dispatchUser({
            type: 'SET_USER',
            payload: { user: authUser }
          })
          sessionStorage.setItem('user', null)
        }
      })
      return () => {
        unsubscribe()
      }
    }
  }, [auth, signIn, dispatchUser])


  const handleMoveCartToSaveForLater = (cartProducts) => {
    // Select saveToLater
    console.log("moved user cart to saveForLater in db > save session cart to db")
    const userCartProducts = []
    cartSnapshot.forEach(cartDoc => {
      userCartProducts.push(cartDoc.data())
    })

    moveToSaveForLater(userCartProducts)
    handleMoveSessionToDB(true)
  }


  const handleMoveSessionToDB = async (isCartMoved, uid) => {
    // Store session cart (with uid) in cart db
    const newSessionCart = await Promise.all(sessionCart.map(async product => {
      await db.collection('cart').doc(product.id).set({
        ...product, uid
      })
      return { ...product, uid }
    }))

    dispatchCartProducts({
      type: 'INITIAL_PRODUCTS_SUCCESS',
      payload: {
        cartProducts: newSessionCart.concat(isCartMoved ? cartProducts : [])
      }
    })
    // Delete session cart
    sessionStorage.setItem('cart', JSON.stringify([]))

    handleModalClose()
  }



  return (
    <ConfirmModal
      modalShow={modalShow}
      modalMessage={modalMessage}
      handleNoClick={() => {
        handleMoveCartToSaveForLater()
        handleMoveSessionToDB()
      }}
      isLoading={isLoading}
      handleYesClick={handleMoveSessionToDB}
      noButton="I want to purchase the new ones only. I'll save these for later"
      yesButton="Merge with new ones. I'll purchase altogether!"
      iconName='warning circle' />
  )
}

export default PostSignIn
