// TODO container and component in one. Split later.

import React from 'react'
import { connect } from 'react-redux'

import '../../css/characterSheet.css'

import capitalize from '../utils/capitalize.js'

import Fieldset from './Fieldset.js'
import DisplayRow from './DisplayRow.js'

const isPopulatedArray = (obj) => (
  typeof obj === 'object' && obj.length > 0
)

// TODO Component.
const renderNotes = (notes) => {
  // Only rnder if there ARE notes.
  if (!isPopulatedArray(notes)) {
    return
  }

  return <div className='notes'>
    {notes.map(note => (
      <small>{note}</small>
    ))}
  </div>
}

const renderAttributeNotes = attributes => {
  if (attributes.oneIncreased) {
    // TODO Where to keep this data?
    return renderNotes([capitalize(attributes.oneIncreased) + ' increased.'])
  }
  return renderNotes(attributes.notes)
}

const renderObject = (obj, includeKeys = []) => {
  return Object.keys(obj).map(key => {
    if (includeKeys.indexOf(key) !== -1) {
      return <DisplayRow label={key} value={obj[key]} />
    }
  })
}

const getStyles = charData => ({
  display: charData.mode !== 'view' ? 'none' : ''
})

// Component
const CharacterSheet = ({ appData, charData }) => (
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
        {renderObject(charData.attributes, appData.attributes)}
        {renderAttributeNotes(charData.attributes)}
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
    appData: Object.assign({}, state.app),
    charData: Object.assign({}, state.char)
  }
}

// Bind redux store to react component.
const Sheet = connect(
  mapStateToProps
)(CharacterSheet)

export default Sheet
