import React from 'react'
import { Button } from 'semantic-ui-react'

const LoaderButton = ({ isLoading, ...rest }) => {
  return (
    <Button
      {...rest}
      disabled={isLoading}
      loading={isLoading}
    />
  )
}

export default LoaderButton
