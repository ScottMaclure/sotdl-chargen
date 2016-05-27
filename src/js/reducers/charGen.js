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

import set from 'js/utils/set'

// Load project data from package.json, and strip down to only necessary items.
import npmData from '../../../package.json'

// Load all generic data needed.
import appData from 'js/appData'

// TODO load from localStorage if exists? merge? clobber?
// This is default character data structure for a new character,
// before random allocations.
import charData from 'data/char.json'

const initialState = {
  // 'package' is a reserved word.
  npm: npmData,
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

const assignCharacteristic = (charAttributes, value, baseAttributeNames) => {
  // If the value is a straight up attribute name, return that.
  if (baseAttributeNames.indexOf(value) !== -1) {
    return charAttributes[value]
  }

  // Check for addition values, like intellect+1.
  let arr = value.split('+')
  if (arr.length === 2) {
    return charAttributes[arr[0]] + parseInt(arr[1])
  }

  // Do nothing by default, quarterHealth we're leaving to later.
  return value
}

const calcHealingRate = (health, healingRate) => {
  if (healingRate === 'quarterHealth') {
    return Math.floor(parseInt(health) / 4)
  } else {
    throw Error('Unknown healingRate value: ' + healingRate)
  }
}

// TODO Split this out ito a reducer.
// Called when ancestry changes, so basically a "new" character.
const assignCharacteristics = (char, ancestryCharacteristics, baseAttributeNames) => {
  // Iterate through ancestryCharacteristics object, creating char characteristics.
  let newCharacteristics = Object.keys(ancestryCharacteristics).reduce((obj, key) => {
    let value = ancestryCharacteristics[key]
    let err = Error('Unsupported value for key: ' + key)

    switch (typeof value) {
      case 'number':
        // plain old number. e.g. speed, insanity, etc.
        obj[key] = value
        break
      case 'string':
        // more complex. defer to function.
        obj[key] = assignCharacteristic(char.attributes, value, baseAttributeNames)
        break
      case 'object':
        if (value instanceof Array) {
          // Default to first item.
          obj[key] = value.join(' or ')
        } else {
          throw err
        }
        break
      default:
        throw err
    }

    return obj
  }, {})

  // Handle quarterHealth, after health has been assigned.
  newCharacteristics.healingRate = calcHealingRate(newCharacteristics.health, ancestryCharacteristics.healingRate)

  return newCharacteristics
}

const assignAncestryToCharacter = (state, ancestryData) => {
  state.char.name = getRandomItem(ancestryData.commonNames)
  state.char.background = getRandomItem(ancestryData.background)
  state.char.attributes = Object.assign({}, ancestryData.attributes)
  state.char.characteristics = assignCharacteristics(state.char, ancestryData.characteristics, state.app.attributes)
}

const initRandomCharacter = (state) => {
  console.error('FIXME forcing ancestry to Human/Orc during dev.')
  state.char.ancestry = getRandomItem(['Human', 'Orc'])
  // state.char.ancestry = getRandomItem(state.app.ancestries)
  assignAncestryToCharacter(state, getAncestryDefaultData(state))
}

const increaseOneAttribute = (attributes, attribute) => {
  let newAttributes = Object.assign({}, attributes)
  newAttributes[attribute] += 1
  newAttributes.oneIncreased = attribute
  return newAttributes
}

const getAncestryDefaultData = state => {
  return state.app[state.char.ancestry.toLowerCase()]
}

// Init new characters with random values.
initRandomCharacter(initialState)

// root reducer
// TODO split this up into smaller parts as I develop the app.
export default function charGen (state = initialState, action) {
  // Create copy of current state, to ensure UI updates.
  let newState = {
    npm: Object.assign({}, state.npm),
    app: Object.assign({}, state.app),
    char: Object.assign({}, state.char)
  }

  switch (action.type) {
    case 'CREATE_RANDOM':
      initRandomCharacter(newState)
      break
    case 'CHANGE_ANCESTRY':
      newState.char.ancestry = action.value
      assignAncestryToCharacter(newState, getAncestryDefaultData(newState))
      break
    case 'CHANGE_SIMPLE_VALUE':
      set(newState.char, action.name, action.value)
      break
    case 'INCREASE_ONE':
      // Every time we increase, we reset to ancestry defaults.
      let ancestryData = getAncestryDefaultData(newState)
      newState.char.attributes = increaseOneAttribute(ancestryData.attributes, action.value)
      break
  }

  // TODO Debug helper. Remove later.
  console.log('newState:', newState)

  return newState
}
