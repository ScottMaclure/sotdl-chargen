// TODO container and component in one. Split later.

import React from 'react'
import { connect } from 'react-redux'

import '../../css/characterSheet.css'

import Fieldset from './Fieldset.js'
import DisplayRow from './DisplayRow.js'

// Component
const CharacterSheet = ({ charData }) => (
	<div className="characterSheet">
		<Fieldset legend="Info" content={
			<div className="content">
				<DisplayRow label="Name" value={charData.name}/>
				<DisplayRow label="Ancestry" value={charData.ancestry}/>
				<DisplayRow label="Background" value={charData.background}/>
			</div>
		}/>
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