// TODO container and component in one. Split later.

import React from 'react'
import { connect } from 'react-redux'

import '../../css/characterSheet.css'

// Component
const CharacterSheet = ({ charData }) => (
	<div className="characterSheet">

		<fieldset>
			<legend>Info</legend>
			<div className="row">
				<div className="label">Name:</div>
				<div className="value">{charData.name || '???'}</div>
			</div>
			<div className="row">
				<div className="label">Ancestry:</div>
				<div className="value">{charData.ancestry}</div>
			</div>
			<div className="row">
				<div className="label">Background:</div>
				<div className="value">{charData.background || '???'}</div>
			</div>
		</fieldset>

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