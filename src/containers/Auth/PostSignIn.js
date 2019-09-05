import React, {
  useContext, useCallback,
  useEffect, useState
} from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import ConfirmModal from '../../components/ConfirmModal';
import { connect } from "react-redux";
import { addCartProduct, deleteCartProduct } from '../../actions/cartActions';
import { addSaveForLaterProduct } from '../../actions/saveForLaterActions';

const PostSignIn = (props) => {
  const { auth, db, user, dispatchUser } = useContext(AuthContext)
  const [modalShow, setModalShow] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const handleModalClose = () => {
    setModalShow(false)
  }


  const [uid, setUid] = useState("")
  const [cartSnapshot, setCartSnapshot] = useState("")
  const [sessionCart] = useState(() =>
    JSON.parse(sessionStorage.getItem('cart')) || []
  )


  const signIn = useCallback(async (authUser) => {
    if (!db || !uid) { return }

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
          handleMoveSessionToDB(user)
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
  }, [db, dispatchUser, uid])


  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        if (authUser) {
          setUid(authUser.uid)
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


  const handleMoveCartToSaveForLater = () => {
    // Select saveToLater
    console.log("moved user cart to saveForLater in db > save session cart to db")

    cartSnapshot.forEach(cartDoc => {
      const product = cartDoc.data()
      props.addSaveForLaterProduct(product)
      props.deleteCartProduct(user, product.id)
    })
  }

  const handleMoveSessionToDB = async (user) => {
    // Store session cart to cart db (after adding uid)
    await Promise.all(sessionCart.map(async product => {
      await props.addCartProduct(user, { ...product, uid })
    }))

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
        handleMoveSessionToDB(user)
      }}
      handleYesClick={() => handleMoveSessionToDB(user)}
      noButton="I want to purchase the new ones only. I'll save these for later"
      yesButton="Merge with new ones. I'll purchase altogether!"
      iconName='warning circle' />
  )
}




const mapDispatchToProps = (dispatch) => ({
  addCartProduct: (user, product) => dispatch(addCartProduct(user, product)),
  addSaveForLaterProduct: (product) => dispatch(addSaveForLaterProduct(product)),
  deleteCartProduct: (user, id) => dispatch(deleteCartProduct(user, id)),
})

export default connect(
  null, mapDispatchToProps
)(PostSignIn)
