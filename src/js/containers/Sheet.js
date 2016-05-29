import { connect } from 'react-redux'

import CharacterSheet from 'js/components/CharacterSheet'

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
