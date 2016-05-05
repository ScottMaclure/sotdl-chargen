// TODO container and component in one. Split later.

import React from 'react'
import { connect } from 'react-redux'

import '../../css/characterGenerator.css'

import ActionBar from './ActionBar.js'
import Select from './Select.js'

const getStyles = (charData) => ({
  display: charData.mode !== 'edit' ? 'none' : ''
})

const AppComponent = ({
  appData, ancestryData, charData,
  changeAncestry, changeValue, setEditMode, setViewMode, createRandomCharacter
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

    </div>

  </div>

)

// Inbound data
const mapStateToProps = (state) => {
  return {
    appData: state.app,
    ancestryData: state.app[state.char.ancestry.toLowerCase()],
    charData: state.char
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeAncestry: (value) => {
    dispatch({ type: 'CHANGE_ANCESTRY', value: value })
  },
  changeValue: (name, value) => {
    dispatch({ type: 'CHANGE_SIMPLE_VALUE', name: name, value: value })
  },
  setEditMode: () => {
    dispatch({ type: 'CHANGE_SIMPLE_VALUE', name: 'mode', value: 'edit' })
  },
  setViewMode: () => {
    dispatch({ type: 'CHANGE_SIMPLE_VALUE', name: 'mode', value: 'view' })
  },
  createRandomCharacter: () => {
    dispatch({ type: 'CREATE_RANDOM' })
  }
})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default App
