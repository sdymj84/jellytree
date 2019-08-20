## user state
- auth : uid, email, displayName, emailVerified, isAnonymous,
        metadata.creationTime, metadata.lastSignInTime
- db.user : uid, email, firstName, middleName, lastName,
        phoneNumber,
        addresses: [
          {
            streetName, unitNumber,
            city, state, zipcode, country,
          },
        ],
        shippingAddress: {},
        payment method: [
          {
            name, cardNumber,
            expireMonth, expireYear, cvc,
            billingAddress: {}
          },
        ],
        cart: [
          {}
        ]
- etc : hasAddress, hasPayment,



## Flow

### Sign in
1. get uid from auth
2. get doc from user db where 'uid' === uid
    - if there is user  // existing user signin
      - get user info from the doc
      - store it in user state
    - else              // new user signup
      - get user info from auth
      - create user state with all user info
        (unknown info is saved as "")
      - create doc in user db with user state

3. get cart from session storage
    - if there is cart (user add cart anonymously and login)
      - query all cart products from cart db where 'uid' === uid
      - ask user if desired to merge cart or move to saveForLater
        - if selected saveForLater
          - move user cart products to saveForLater db
      - store session cart (with uid) in cart db
      - delete session cart
    - else (user login without adding cart)
      - get cart products from cart db where 'uid' === uid
