import React from 'react'
import { Checkbox, Header } from 'semantic-ui-react'
import styled from 'styled-components'

const Container = styled.div`
  padding-bottom: 1em;

  .ui.checkbox {
    display: block;
  }
  .colorbox {
    width: 30px;
    height: 17px;
    border-radius: 3px;
    margin-left: 5px;
  }
  .black {
    background-color: black;
  }
  .white {
    background-color: white;
    border: 1px solid black;
  }
  .yellow {
    background-color: yellow;
  }
  .blue {
    background-color: blue;
  }
  .red {
    background-color: red;
  }
  .green {
    background-color: green;
  }

  .sub-container {
    padding: 2em 0;
  }
`
const Flex = styled.div`
  display: flex;
  align-items: flex-start;
`

const Filter = () => {
  return (
    <Container>
      <div className="sub-container">
        <Header as='h3'>Color</Header>
        <Flex>
          <Checkbox label="White" />
          <div className="colorbox white"></div>
        </Flex>
        <Flex>
          <Checkbox label="Black" />
          <div className="colorbox black"></div>
        </Flex>
        <Flex>
          <Checkbox label="Yellow" />
          <div className="colorbox yellow"></div>
        </Flex>
        <Flex>
          <Checkbox label="Blue" />
          <div className="colorbox blue"></div>
        </Flex>
        <Flex>
          <Checkbox label="Red" />
          <div className="colorbox red"></div>
        </Flex>
        <Flex>
          <Checkbox label="Green" />
          <div className="colorbox green"></div>
        </Flex>
      </div>
      <div className="sub-container">
        <Header as='h3'>Size</Header>
        <Checkbox label="Small (0-3M)" />
        <Checkbox label="Medium (3-6M)" />
        <Checkbox label="Large (6-12M)" />
        <Checkbox label="X-Large (12-24M)" />
      </div>
    </Container >
  )
}

export default Filter
