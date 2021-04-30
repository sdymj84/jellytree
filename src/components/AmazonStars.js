import React from 'react'
// import ReactStars from 'react-stars'
// import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  align-items: center;
`
// const Count = styled.div`
//   margin: 0 0 1px 3px;
//   color: #329ec9;
//   font-family: 'Exo 2', 'Exo';
//   :hover {
//     text-decoration: underline;
//     cursor: pointer;
//     color: tomato;
//   }
// `

const AmazonStars = () => {
  return (
    <Flex>
      {/* <Icon name="amazon" size="large" /> */}
      {/* <ReactStars
        count={5}
        size={22}
        color1={'#e5e5e5'}
        color2={'#ffd700'}
        edit={false}
        value={3.5} />
      <Count>120</Count> */}
    </Flex>
  )
}

export default AmazonStars
