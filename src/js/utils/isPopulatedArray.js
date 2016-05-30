// TODO Replace with lodash equivalent.
const isPopulatedArray = (obj) => (
  typeof obj === 'object' && obj.length > 0
)

export default isPopulatedArray
