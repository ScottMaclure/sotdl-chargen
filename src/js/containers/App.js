import { connect } from 'react-redux'

import CharacterEdit from 'js/components/CharacterEdit'

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
  },
  setIncreaseOne: (value) => {
    dispatch({ type: 'INCREASE_ONE', value: value })
  },
  setAdjustOne: (value) => {
    console.log('setAdjustOne, value:', value)
  }
})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterEdit)

export default App
