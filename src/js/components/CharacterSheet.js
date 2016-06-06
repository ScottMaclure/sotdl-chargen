import React from 'react'

import capitalize from 'js/utils/capitalize'
import isPopulatedArray from 'js/utils/isPopulatedArray'

import Fieldset from 'js/components/Fieldset'
import DisplayRow from 'js/components/DisplayRow'

import 'css/characterSheet.css'

// TODO Component.
const renderNotes = (notes) => {
  // Only rnder if there ARE notes.
  if (!isPopulatedArray(notes)) {
    return
  }

  return <div key='notes' className='notes'>
    {notes.map((note, index) => (
      <div key={'note' + index}><small>{note}</small></div>
    ))}
  </div>
}

const renderAttributeNotes = attributes => {
  let notes = []

  if (attributes.oneIncreased) {
    notes.push(capitalize(attributes.oneIncreased) + ' increased.')
  } else {
    notes.push(attributes.notes)
  }

  let oneAdjustNote = 'You may adjust one attribute to another.'
  if (attributes.oneAdjustFrom && attributes.oneAdjustTo) {
    oneAdjustNote = 'You adjusted ' + capitalize(attributes.oneAdjustFrom) + ' to ' + capitalize(attributes.oneAdjustTo)
  }
  notes.push(oneAdjustNote)

  return renderNotes(notes)
}

const renderObject = (obj, includeKeys = []) => {
  return Object.keys(obj).map(key => {
    if (includeKeys.indexOf(key) !== -1) {
      return <DisplayRow key={key} label={key} value={obj[key]} />
    }
  })
}

const renderSimpleObject = obj => (
  Object.keys(obj).map(key => (
    <DisplayRow key={key} label={key} value={obj[key]} />
  ))
)

const getStyles = charData => ({
  display: charData.mode !== 'view' ? 'none' : ''
})

// Component
const CharacterSheet = ({ appData, charData }) => (
  <div className='characterSheet' style={getStyles(charData)}>

    <h2>Character Sheet</h2>

    <Fieldset legend='Info' content={
      <div className='content'>
        <DisplayRow key='name' label='Name' value={charData.name} />
        <DisplayRow key='level' label='Level' value={charData.level} />
        <DisplayRow key='ancestry' label='Ancestry' value={charData.ancestry} />
        {renderSimpleObject(charData.aspects)}
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
          <DisplayRow key={key} label={key} value={charData.characteristics[key]} />
        ))}
      </div>
    } />

  </div>
)

export default CharacterSheet
