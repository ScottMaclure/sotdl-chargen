import React from 'react'
import { connect } from 'react-redux'

const CharacterGenerator = ({ appData, charData }) => (
	<div class="character-generator">
		<pre><code>{JSON.stringify(appData)}</code></pre>
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