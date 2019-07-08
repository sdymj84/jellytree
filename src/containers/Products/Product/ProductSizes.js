import React from 'react'
import { Dropdown } from "semantic-ui-react";
import styled from 'styled-components'

const sizeOptions = [
  {
    key: 'S / 3-6 Months',
    text: 'S / 3-6 Months',
    value: 'S / 3-6 Months',
  },
  {
    key: 'M / 6-12 Months',
    text: 'M / 6-12 Months',
    value: 'M / 6-12 Months',
  },
]

const Title = styled.div`
  animation: ${p => p.sizeNotSelected ? 'shake 1.5s' : ''};
  color: ${p => p.sizeNotSelected ? 'red' : ''};
  @keyframes shake {
    5%, 95% {
      transform: translate3d(-2px, 0, 0);
    }
    
    10%, 90% {
      transform: translate3d(4px, 0, 0);
    }

    15%, 25%, 35%, 45%, 55%, 65%, 75%, 85% {
      transform: translate3d(-6px, 0, 0);
    }

    20%, 30%, 40%, 50%, 60%, 70%, 80% {
      transform: translate3d(6px, 0, 0);
    }
  }
`

const ProductSizes = (props) => {
  return (
    <div {...props.scrollHtmlAttributes}>
      <Title sizeNotSelected={props.sizeNotSelected}>
        Size : <span className="size-color-name">Select Size to see price</span>
      </Title>
      <Dropdown
        placeholder='Select'
        selection
        options={sizeOptions}
        onChange={props.handleSizeChange}
        value={props.selectedSize}
      />
    </div>
  )
}

export default ProductSizes
