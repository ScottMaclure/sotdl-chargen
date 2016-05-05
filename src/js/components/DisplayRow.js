import React from 'react'

const DisplayRow = ({label = '???', value = '???'}) => (
  <div className='row'>
    <div className='label'>{label}:</div>
    <div className='value'>{value}</div>
  </div>
)

export default DisplayRow
