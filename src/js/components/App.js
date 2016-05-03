// TODO container and component in one. Split later.

import React from 'react'
import { connect } from 'react-redux'

import '../../css/CharacterGenerator.css'

import Select from './Select.js'

const CharacterGenerator = ({ appData, ancestryData, charData, onChangeAncestry, onChangeValue }) => (
	<div className="characterGenerator">

		<div className="row">
			<label for="ancestry">Ancestry</label>
			<Select id="ancestry"
				options={appData.ancestries} value={charData.ancestry}
				onChange={(event) => onChangeAncestry(event.target.value)}
			/>
		</div>

		<div className="row">
			<label for="name">Name</label>
			<Select id="name"
				options={ancestryData.commonNames} value={charData.name}
				onChange={(event) => onChangeValue('name', event.target.value)}
			/>
		</div>

		<div className="row">
			<label for="background">Background</label>
			<Select id="background"
				options={ancestryData.background} value={charData.background}
				onChange={(event) => onChangeValue('background', event.target.value)}
			/>
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
	onChangeAncestry: (value) => {
		dispatch({ type: 'CHANGE_ANCESTRY', value: value })
	},
	onChangeValue: (name, value) => {
		dispatch({ type: 'CHANGE_SIMPLE_VALUE', name: name, value: value })
	}
})

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(CharacterGenerator)

export default App