import React from 'react'

import ActionBar from 'js/components/ActionBar'
import Select from 'js/components/Select'

import 'css/characterGenerator.css'

const renderSizes = (sizes, charSize, changeValue) => {
  if (!(sizes instanceof Array) || sizes.length < 2) {
    return
  }
  return <div className='row'>
    <label for='Size'>Size</label>
    <Select id='size'
      options={sizes} value={charSize}
      onChange={(event) => changeValue('characteristics.size', event.target.value)}
    />
  </div>
}

const renderIncreaseOne = (appData, charAttr, setIncreaseOne) => (
  <div className='row'>
    <label for='increaseOne'>Increase One</label>
    <Select id='increaseOne'
      options={[].concat(appData.pleaseSelect, appData.attributes)} value={charAttr.oneIncreased}
      onChange={(event) => setIncreaseOne(event.target.value)}
    />
  </div>
)

const getStyles = (charData) => ({
  display: charData.mode !== 'edit' ? 'none' : ''
})

const getListWithoutSelected = (arr, value) => {
  if (!arr || arr.length === 0) {
    return arr
  }
  return arr.filter(elem => elem !== value)
}

const CharacterEdit = ({
  appData, ancestryData, charData,
  changeAncestry, changeValue, setEditMode, setViewMode, createRandomCharacter,
  setIncreaseOne, adjustOneFrom, adjustOneTo
}) => (

  <div className='app'>

    <ActionBar mode={charData.mode} onEdit={setEditMode} onView={setViewMode} onCreate={createRandomCharacter} />

    <div className='characterGenerator' style={getStyles(charData)}>

      <h2>Character Creation (Orc or Human)</h2>

      <div className='row'>
        <label for='ancestry'>Ancestry</label>
        <Select id='ancestry'
          options={appData.ancestries} value={charData.ancestry}
          onChange={(event) => changeAncestry(event.target.value)}
        />
      </div>

      {/* All ancestries can raise one attribute by lowering another. */}
      <div className='row adjustOne'>
        <label for='ancestry'>Adjust One Attribute</label>
        <span>From:</span>
        <Select id='adjustOneFrom'
          options={[].concat(appData.pleaseSelect, appData.attributes)} value={charData.attributes.oneAdjustFrom}
          onChange={(event) => adjustOneFrom(event.target.value === appData.pleaseSelect ? void 0 : event.target.value)}
        />
        <span className='adjustOneToLabel'>To:</span>
        <Select id='adjustOneTo'
          options={[].concat(appData.pleaseSelect, getListWithoutSelected(appData.attributes, charData.attributes.oneAdjustFrom))} value={charData.attributes.oneAdjustTo}
          onChange={(event) => adjustOneTo(event.target.value === appData.pleaseSelect ? void 0 : event.target.value)}
        />
      </div>

      {ancestryData.attributes.increaseOne ? renderIncreaseOne(appData, charData.attributes, setIncreaseOne) : null}

      <div className='row'>
        <label for='name'>Name</label>
        <Select id='name'
          options={ancestryData.commonNames} value={charData.name}
          onChange={(event) => changeValue('name', event.target.value)}
        />
      </div>

      <div className='row'>
        <label for='background'>Background</label>
        <Select id='background'
          options={ancestryData.background} value={charData.background}
          onChange={(event) => changeValue('background', event.target.value)}
        />
      </div>

      {renderSizes(ancestryData.characteristics.size, charData.characteristics.size, changeValue)}

    </div>

  </div>

)

export default CharacterEdit
