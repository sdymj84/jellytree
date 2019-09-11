# JellyTree e-commerce website for babies and toddlers

## Skills Title
- React, React Hooks, React Router, Redux
- Firebase : Firestore (NoSQL), Function (NodeJS), Storage, Auth, Hosting
- Design : semantic-ui-react, styled-components, react-pose
---

## Skills Summary
#### React
- Create resuable React components
- Redirect without server refresh using React Router
- Make all functional components with React Hooks
- Use context to deliver global data and functions between components without passing down to children
- useState, useEffect, useReducer for managing data effectively
- Connect DB on front-end side for realtime database update
  - Whenever product stock changes by purchase or update from CMS, stock change updates UI without refresh or any manual update
  - Gets API key from server to configure Database in front-end 
  (for security reason)
- Manage data efficiently with Redux

#### Back-End
- Use 3-tier system architecture (React / Firebase(NodeJS) / Firestore(DB))
- Write server side logic such as connecting DB, form validation, manipulating data on Firebase functions
- Design database with NoSQL - firestore
- Host on firebase and connect to custom domain

#### Design
- Use semantic-ui-react library for beautiful and powerful design
- Customize styles with styled-components and use props in the style
- Upgrade user experience with neat animation using react-pose and css animation
- Conditionally render customized UI for mobile devices
---

## Issues/Difficulties
- Update React state after component unmounted - usually happens when invoke async API call and set state

- Semantic UI and Bootstrap have conflict styles on Modal : npm install bootstrap > modify bootstrap.css or scss/_modal.scss file > import in index.js before any other stylesheet

- Figuring out all scenarios from user sign in was difficult 
  - user signup
  - signin
  - new cart > signup
  - new cart > signin
  - new cart > signin with old cart

- Structure changes
  - Issue: Used React Context API / Hooks for all data and it caused exceeded amount of unnessarity re-renders
  - Resolution: Changed Cart context to Redux