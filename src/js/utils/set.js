/**
 * Dynamically set a nested property in an array.
 */
const set = (obj, path, value) => {
  // a moving reference to internal objects within obj
  let schema = obj
  let pList = path.split('.')
  let len = pList.length
  for (var i = 0; i < len - 1; i++) {
    let elem = pList[i]
    if (!schema[elem]) schema[elem] = {}
    schema = schema[elem]
  }
  schema[pList[len - 1]] = value
}

export default set
