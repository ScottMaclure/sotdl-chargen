// TODO container and component in one. Split later.

import React from 'react'
import { connect } from 'react-redux'

import '../../css/CharacterGenerator.css'

import Select from './Select.js'

const CharacterGenerator = ({ appData, charData }) => (
	<div className="characterGenerator">

		<div className="row">
			<label for="ancestry">Ancestry</label>
			<Select key="ancestry" options={appData.ancestries} value={charData.ancestry}/>
		</div>

		<div className="row">
			<label for="background">Background</label>
			<Select key="background" options={appData[charData.ancestry].background} value={charData.background}/>
		</div>

	</div>
)

// Inbound data
const mapStateToProps = (state) => {
	return {
		appData: state.app,
		charData: state.char
	}
}

const App = connect(
	mapStateToProps
)(CharacterGenerator)

export default App