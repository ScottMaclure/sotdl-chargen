import React from 'react'

const FieldSet = ({legend, content}) => (
  <fieldset>
    <legend>{legend}</legend>
    {content}
  </fieldset>
)

export default FieldSet
