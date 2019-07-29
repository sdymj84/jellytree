import React from 'react'
import { Checkbox, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'

const Container = styled.div`
  padding-bottom: 1em;

  .sub-container {
    padding: 2em 0;
  }
`
const Flex = styled.div`
  display: flex;
  align-items: flex-start;
`
const ColorBox = styled.div`
  width: 30px;
  height: 17px;
  border: ${p => p.color === 'white' ? '1px solid black' : ''};
  border-radius: 3px;
  margin-left: 5px;
  background-color: ${p => p.color};
`

const Filter = (props) => {
  return (
    <Container>
      <div className="sub-container">
        <Header as='h3'>Color</Header>
        {_.map(props.colorMap, color =>
          <Flex key={color}>
            <Checkbox
              label={color}
              onChange={props.handleColorFilter}
              checked={_.indexOf(props.colorFilters, color) !== -1} />
            <ColorBox color={color.toLowerCase()} />
          </Flex>
        )}
      </div>
      <div className="sub-container">
        <Header as='h3'>Size</Header>
        {_.map(props.sizeMap, size =>
          <Checkbox
            style={{ display: 'block' }}
            key={size}
            label={size}
            onChange={props.handleSizeFilter}
            checked={_.indexOf(props.sizeFilters, size) !== -1} />
        )}
      </div>
    </Container >
  )
}

export default Filter
