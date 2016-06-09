import droll from 'droll'

/**
 * Given an "aspect" data structure:
 *
 * {
 *   "dieRoll": "3d6",
 *   "values": [
 *     {
 *       "min": 1, "max": 3,
 *       "value": "You are a child, 8 years old or younger.",
 *       "effect": "corruption+2"
 *     }
 *   ]
 * }
 *
 * Use the "dieRoll" property to randomly generate a number, then find the
 * correct aspect object and return.
 * Return the object so that other code can reference BOTH value AND effect.
 */
const getRandomAspect = aspect => {
  const total = droll.roll(aspect.dieRoll).total
  return aspect.values.find(value => (
    // Min and max can be equal.
    total >= value.min && total <= value.max
  ))
}

export default getRandomAspect
