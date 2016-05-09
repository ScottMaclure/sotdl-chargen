import React from 'react'

import '../../css/actionBar.css'

const getViewStyle = mode => ({
  display: mode !== 'view' ? 'none' : ''
})

const getEditStyle = mode => ({
  display: mode !== 'edit' ? 'none' : ''
})

const ActionBar = ({ mode, onEdit, onView, onCreate }) => (
  <div className='actionBar'>
    <button className='modeButton viewButton' onClick={onEdit} style={getViewStyle(mode)}>View/Edit</button>
    <button className='modeButton editButton' onClick={onView} style={getEditStyle(mode)}>Edit/View</button>
    <span className='spacer'></span>
    <button className='createButton' onClick={onCreate}>New Random</button>
  </div>
)

export default ActionBar
