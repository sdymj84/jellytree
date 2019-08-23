import React from 'react'
import { Radio, Form } from 'semantic-ui-react'


const AddrRadioGroup = ({
  addresses, isLoading, handleAddrChange,
  selectedAddrId }) => {

  return (
    <Form>
      {addresses.map(addr =>
        <Form.Field key={addr.id}
          style={{ marginBottom: '0' }}
          className={selectedAddrId === addr.id
            ? 'selected' : ''}>
          <Radio
            name="addrSelector"
            label={addr.firstName + ' ' +
              addr.middleName + ' ' +
              addr.lastName}
            checked={selectedAddrId === addr.id}
            onChange={handleAddrChange}
            value={addr.id}>
          </Radio>
          <span className="address">
            {addr.streetName + ', ' +
              'Unit/Apt#' +
              addr.unit + ', ' +
              addr.city + ', ' +
              addr.state + ' ' +
              addr.zipcode}
          </span>
        </Form.Field>
      )}
    </Form>
  )
}

export default AddrRadioGroup
