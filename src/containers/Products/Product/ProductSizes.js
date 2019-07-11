import React from 'react'
import { Dropdown } from "semantic-ui-react";
import styled from 'styled-components'
import _ from 'lodash'

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
  let sizeOptions = props.sizes.map(product => ({
    key: product.size,
    text: product.size,
    value: product.size,
    disabled: true,
  }))
  const availableSizeOptions = props.products.map(product => {
    if (product.color === props.selectedColor && product.stock !== 0) {
      return { value: product.size }
    } else {
      return ""
    }
  }).filter(product => product !== "")

  _.forEach(sizeOptions, option => {
    option.disabled = !(_.findIndex(availableSizeOptions, { 'value': option.value }) + 1)
  })

  return (
    <div {...props.scrollHtmlAttributes}>
      <Title sizeNotSelected={props.sizeNotSelected}>
        Size : <span className="size-color-name">
          {props.selectedSize || 'Select size to see price'}
        </span>
      </Title>
      <Dropdown
        placeholder='Select'
        selection
        clearable
        options={sizeOptions}
        onChange={props.handleSizeChange}
        selectOnBlur={false}
        value={props.selectedSize}
        text={props.selectedSize || "Select"}
      />
    </div>
  )
}

export default ProductSizes
