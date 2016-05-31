import React from 'react'

import Select from 'js/components/Select'

import 'css/adjustOne.css'

const getListWithoutSelected = (arr, value) => {
  if (!arr || arr.length === 0) {
    return arr
  }
  return arr.filter(elem => elem !== value)
}

// All ancestries can raise one attribute by lowering another.
const AdjustOne = ({ appData, charData, adjustOneFrom, adjustOneTo }) => (
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
)

export default AdjustOne
