import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Checkout from './Checkout'

describe('Checkout test', () => {
  test('should show text correctly', () => {
    const { getByText } = render(<Checkout />)
    expect(getByText('Checkout')).toBeInTheDocument()
  })

  afterEach(cleanup)

})
