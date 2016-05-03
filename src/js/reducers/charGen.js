/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

// Load all generic data needed.
import appData from '../appData.js'

// TODO load from localStorage if exists? merge? clobber?
// This is default character data structure for a new character,
// before random allocations.
import charData from '../../data/char.json'

const initialState = {
	app: appData,
	char: charData
}

const getRandomItem = (array) => {
	return array[Math.floor(Math.random() * array.length)]
}

const initRandomCharacter = (state) => {
	console.log('ancestries:', state.app.ancestries)
	state.char.ancestry = getRandomItem(state.app.ancestries)
}

// Init new characters with random values.
initRandomCharacter(initialState)

// root reducer
// TODO split this up into smaller parts as I develop the app.
export default function charGen(state = initialState, action) {

	var newState = Object.assign({}, state);

	switch (action.type) {
		case 'CREATE_RANDOM':
			initRandomCharacter(newState)
		case 'CHANGE_NAME':
			newState.char.name = action.name
	}

	console.log('newState:', newState)

	return newState

}