jest.unmock('js/utils/isPopulatedArray')

import isPopulatedArray from 'js/utils/isPopulatedArray'

describe('for isPopulatedArray', () => {
  it('return true for a populated array', () => {
    expect(isPopulatedArray([1, 2, 3])).toBe(true)
  })

  it('return true for a single element array', () => {
    expect(isPopulatedArray([1])).toBe(true)
  })

  it('returns false for an empty array', () => {
    expect(isPopulatedArray([])).toBe(false)
  })

  it('returns false for a undefined', () => {
    expect(isPopulatedArray(void 0)).toBe(false)
  })

  it('returns false for an object', () => {
    expect(isPopulatedArray({ foo: 'bar' })).toBe(false)
  })

  it('returns false for a string', () => {
    expect(isPopulatedArray('nope')).toBe(false)
  })
})
