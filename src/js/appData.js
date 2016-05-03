// Load all data needed for app and character.
import appData from '../data/app.json'
import humanData from '../data/human.json'

// Combine all json resources into a single object.
appData.human = humanData

export default appData