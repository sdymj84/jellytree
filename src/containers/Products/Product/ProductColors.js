import React, { useState } from 'react'
import { Image } from "semantic-ui-react";
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
`

const ProductColors = () => {
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleColorClick = (e, i) => {
    setSelectedIndex(i)
  }
  return (
    <div>
      <div>Color : <span className="size-color-name">Pink</span></div>
      <Color selectedIndex={selectedIndex}>
        {_.times(8, i =>
          <Image key={i} src="https://picsum.photos/100"
            onClick={(e) => handleColorClick(e, i)} />
        )}
      </Color>
    </div>
  )
}

export default ProductColors
