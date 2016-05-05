// TODO container and component in one. Split later.

import React from 'react'
import { connect } from 'react-redux'

import '../../css/characterSheet.css'

import Fieldset from './Fieldset.js'
import DisplayRow from './DisplayRow.js'

const skipAttributes = ['notes', 'increaseOne']

const isNonEmptyArray = (obj) => (
  typeof obj === 'object' && obj.length > 0
)

const renderNotes = (notes) => {
  // Apologies.
  if (!isNonEmptyArray(notes)) {
    return
  }

  return <div className='notes'>
    {notes.map((note) => (
      <small>{note}</small>
    ))}
  </div>
}

const getStyles = (charData) => ({
  display: charData.mode !== 'view' ? 'none' : ''
})

// Component
const CharacterSheet = ({ charData }) => (
  <div className='characterSheet' style={getStyles(charData)}>

    <h2>Character Sheet</h2>

    <Fieldset legend='Info' content={
      <div className='content'>
        <DisplayRow label='Name' value={charData.name} />
        <DisplayRow label='Level' value={charData.level} />
        <DisplayRow label='Ancestry' value={charData.ancestry} />
        <DisplayRow label='Background' value={charData.background} />
      </div>
    } />

    <Fieldset legend='Attributes' content={
      <div className='content'>
        {Object.keys(charData.attributes).map(key => {
          if (skipAttributes.indexOf(key) === -1) {
            return <DisplayRow label={key} value={charData.attributes[key]} />
          }
        })}
        {renderNotes(charData.attributes.notes)}
      </div>
    } />

    <Fieldset legend='Characteristics' content={
      <div className='content'>
        {Object.keys(charData.characteristics).map(key => (
          <DisplayRow label={key} value={charData.characteristics[key]} />
        ))}
      </div>
    } />

  </div>
)

// Inbound data
const mapStateToProps = (state) => {
  return {
    charData: Object.assign({}, state.char)
  }
}

// Bind redux store to react component.
const Sheet = connect(
  mapStateToProps
)(CharacterSheet)

export default Sheet
