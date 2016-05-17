jest.unmock('../../src/js/utils/capitalize.js')

import capitalize from '../../src/js/utils/capitalize.js'

describe('capitalize', () => {
  // Basic check
  it('has loaded the module', () => {
    expect(typeof capitalize).toBe('function')
  })
  it('capitalizes a basic string', () => {
    expect(capitalize('scott')).toEqual('Scott')
  })
  it('does nothing to TestString', () => {
    expect(capitalize('TestString')).toEqual('TestString')
  })
})
