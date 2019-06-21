import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border-top: 1px solid grey;
`
const Content = styled.div`
  width: 80%;
  margin: auto;
  padding: 2em;
  font-size: 0.9em;

  .footer-info div {
    display: inline-block;
    padding: 0 10px
    margin-top: 10px;
    border-right: 1px solid lightgrey;
    
    :last-child {
      border-right: none;
    }

    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  
`

const Footer = () => {
  return (
    <Container>
      <Content>
        <div>
          <span>2019 JELLYTREE. All right reserved.</span>
          <span className="footer-info">
            <div>Privacy Policy</div>
            <div>Terms of Use</div>
          </span>
        </div>
      </Content>
    </Container>
  )
}

export default Footer
