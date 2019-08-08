import React, { useState, useEffect } from 'react'
import { Checkbox, Header, Modal, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'
import theme from '../../theme'

const Div = styled.div`
  border: 1px solid ${theme.color};
  border-radius: 4px;
  margin: 10px;
  padding: 10px;
`
const Container = styled.div`
  padding-bottom: 1em;

  .sub-container {
    padding: 1em 0 0 1em;
  }
`
const Flex = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: ${p => p.justifyContent};
`
const ColorBox = styled.div`
  width: 30px;
  height: 17px;
  border: ${p => p.color === 'white' ? '1px solid black' : ''};
  border-radius: 3px;
  margin-left: 5px;
  background-color: ${p => p.color};
`
const modalStyle = {
  width: '80%'
}

const MobileFilter = (props) => {
  const [filterCounts, setFilterCounts] = useState(0)

  useEffect(() => {
    setFilterCounts(props.colorFilters.length + props.sizeFilters.length)
  }, [props.colorFilters, props.sizeFilters])

  return (
    <Div>
      <Flex justifyContent='space-between' >
        <div>{props.filteredProducts.length} Results</div>
        <Modal
          style={modalStyle}
          dimmer="inverted"
          trigger={<div>
            {filterCounts ? `Filters (${filterCounts})` : 'Filter'}
            <Icon name="angle down" size="large" />
          </div>}
          size="mini">
          <Modal.Header>
            Filters
            </Modal.Header>
          <Modal.Content>
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
            </Container>
          </Modal.Content>
        </Modal>

      </Flex>
    </Div >
  )
}

export default MobileFilter
