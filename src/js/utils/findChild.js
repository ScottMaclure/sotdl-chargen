import lodashGet from 'lodash/get'
import isArray from 'lodash/isArray'

import isPopulatedArray from 'js/utils/isPopulatedArray'

/**
 * Quick function to help find react components independent of ordering.
 * @param  {ReactElement} component React component instance.
 * @param  {String} keypath Could be 'type' or 'props.legend'.
 * @param  {String} val The value to check against.
 * @return {ReactElement} The found element, or undefined.
 */
const findChild = (component, keypath, val) => {
  let children = lodashGet(component, 'props.children', [])
  if (!isPopulatedArray(children)) {
    return undefined
  }
  return component.props.children.find(elem => {
    // When rendering, we can nest arrays of components.
    if (isArray(elem)) {
      return findChild({
        props: {
          children: elem
        }
      }, keypath, val)
    }
    // Normal element child.
    return lodashGet(elem, keypath) === val
  })
}

export default findChild
