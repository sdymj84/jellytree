import React from 'react'
import { Table, Image } from 'react-bootstrap'
import styled from 'styled-components'
import theme from '../../theme'


const StyledTable = styled(Table)`
  td {
    padding: 10px;
    width: 15%;
    min-width: 150px;
    text-align: center;
    border: 1px solid white;
  }
  tr:nth-child(n+3) td:nth-child(2n) {
    background-color: #e3f7eb;
  }
  tr:nth-child(n+3) td:first-child {
     background-color: #F7F7F7;
  }
  tr:nth-child(2) {
    color: ${theme.contrastColor}
  }

  .title {
    cursor: pointer;
    :hover {
      color: green;
      text-decoration: underline;
    }
  }

  img {
    cursor: pointer;
  }
`

const ProductsTable = ({ props }) => {
  return (
    <StyledTable responsive="xl">
      <tbody>
        <tr>
          <td></td>
          {props.map((item, i) =>
            <td key={i}>
              <Image src={item.image} />
            </td>
          )}
        </tr>
        <tr>
          <td></td>
          {props.map((item, i) =>
            <td key={i} className="title">
              {item.title}
            </td>
          )}
        </tr>
        <tr>
          <td>Material</td>
          {props.map((item, i) =>
            <td key={i}>
              {item.material}
            </td>
          )}
        </tr>
        <tr>
          <td>Age/Size</td>
          {props.map((item, i) =>
            <td key={i}>
              {item.ageSize}
            </td>
          )}
        </tr>
        <tr>
          <td>Color</td>
          {props.map((item, i) =>
            <td key={i}>
              {item.color}
            </td>
          )}
        </tr>
      </tbody>
    </StyledTable>
  )
}

export default ProductsTable
