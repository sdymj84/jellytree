/*
availableColors 
  - variations objects which is stock > 0 and unique colors
  - color option UI shows based on this array
selectedColor
  - best selling variation is set to initial selected color
    (pre-calculated on parent component)
  - 
productInfo
  - whole product info
selectedSize
handleColorChange
*/


import React, { useState } from 'react'
import { Image, Popup } from "semantic-ui-react";
import styled from 'styled-components'
import _ from 'lodash'

const Color = styled.div`
  display: flex;
  flex-wrap: wrap;
  img {
    width: 50px;
    margin: 0.5em 0.5em 0.5em 0;
    border-radius: 50%;
    border: 1px solid grey;
    flex: 0 0 50px;
    :hover {
      cursor: pointer;
    }
  }
  img:nth-child(${p => p.selectedIndex + 1}) {
    border: 2px solid tomato;
    padding: 1px;
  }
  .disabled {
    opacity: 0.5;
    :hover {
      
    }
  }
`

const ProductColors = (props) => {
  const initialSelectedIndex = _.findIndex(props.availableColors,
    obj => obj.color === props.selectedColor)
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)

  let colorOptions = props.availableColors.map(product => ({
    value: product.color,
    disabled: false,
  }))

  let availableColorOptions = []
  if (props.selectedSize !== "") {
    availableColorOptions = props.productInfo.variations.map(product => {
      if (product.size === props.selectedSize && product.stock !== 0) {
        return { value: product.color }
      } else {
        return ""
      }
    }).filter(product => product !== "")

    _.forEach(colorOptions, option => {
      option.disabled = !(_.findIndex(availableColorOptions, { 'value': option.value }) + 1)
    })
  }

  const handleColorClick = (e, i) => {
    setSelectedIndex(i)
    props.handleColorChange(i)
  }

  return (
    <div>
      <div>Color : <span className="size-color-name">{props.selectedColor}</span></div>
      <Color selectedIndex={selectedIndex}>
        {_.times(colorOptions.length, i =>
          <Popup
            key={i}
            content='Not available in selected size'
            position="top center"
            disabled={!colorOptions[i].disabled}
            trigger={
              <Image src="https://picsum.photos/100"
                className={colorOptions[i].disabled ? 'disabled' : ''}
                alt={colorOptions[i].value}
                title={colorOptions[i].value}
                onClick={(e) => handleColorClick(e, i)} />}
          />
        )}
      </Color>
    </div>
  )
}

export default ProductColors
