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

/**
 * Work with arrays of strings or arrays of options.
 * TODO Handle non-singular results (i.e. 20 options for a 1d20 roll).
 */
const getRandomItem = (array) => {
  let val = array[Math.floor(Math.random() * array.length)]
  return val.value || val
}

const setAncestryData = (state) => {
  // Now we know the ancestry, we can work everything else out.
  let ancestryData = state.app[state.char.ancestry.toLowerCase()]

  state.char.name = getRandomItem(ancestryData.commonNames)
  state.char.background = getRandomItem(ancestryData.background)

  state.char.attributes = Object.assign({}, ancestryData.attributes)
}

const initRandomCharacter = (state) => {
  console.error('FIXME forcing ancestry to Human/Orc during dev.');
  state.char.ancestry = getRandomItem(['Human', 'Orc'])
  // state.char.ancestry = getRandomItem(state.app.ancestries)
  setAncestryData(state)
}

// Init new characters with random values.
initRandomCharacter(initialState)

// root reducer
// TODO split this up into smaller parts as I develop the app.
export default function charGen (state = initialState, action) {
  let newState = {
    app: Object.assign({}, state.app),
    char: Object.assign({}, state.char)
  }

  switch (action.type) {
    case 'CREATE_RANDOM':
      initRandomCharacter(newState)
      break
    case 'CHANGE_ANCESTRY':
      newState.char.ancestry = action.value
      setAncestryData(newState)
      break
    case 'CHANGE_SIMPLE_VALUE':
      newState.char[action.name] = action.value
      break
  }

  console.log('newState:', newState)

  return newState
}
