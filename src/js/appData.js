// Load all data needed for app and character.
import appData from '../data/app.json'
import humanData from '../data/human.json'
import orcData from '../data/orc.json'

// Combine all ancestry json resources into the app data object.
appData.human = humanData
appData.orc = orcData

export default appData