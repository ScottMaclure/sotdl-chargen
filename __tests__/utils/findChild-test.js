jest.unmock('js/utils/findChild')
// TODO This is annoying - have to unmock nested imports.
jest.unmock('js/utils/isPopulatedArray')

import findChild from 'js/utils/findChild'

describe('for findChild', () => {
  let component = void 0

  describe('for a valid object', () => {
    beforeEach(() => {
      component = {
        props: {
          children: [
            { props: { legend: 'aaa', wow: 'a11' } },
            { props: { legend: 'bbb', wow: 'b22' } },
            { props: { legend: 'ccc', wow: 'c33' } }
          ]
        }
      }
    })

    it('finds a child', () => {
      let child = findChild(component, 'props.legend', 'bbb')
      expect(child).toBeDefined()
      expect(child.props.wow).toEqual('b22')
    })

    it('does not find a missing child', () => {
      let child = findChild(component, 'props.legend', 'zzz')
      expect(child).not.toBeDefined()
    })

    it('finds the first child if no args are passed', () => {
      let child = findChild(component)
      expect(child).toBeDefined()
      expect(child.props.wow).toEqual('a11')
    })
  })

  describe('for a invalid object', () => {
    beforeEach(() => {
      component = {}
    })

    it('finds no child', () => {
      let child = findChild(component, 'props.legend', 'bbb')
      expect(child).not.toBeDefined()
    })

    it('does not find a missing child', () => {
      let child = findChild(component, 'props.legend', 'zzz')
      expect(child).not.toBeDefined()
    })

    it('finds no child if no args are passed', () => {
      let child = findChild(component)
      expect(child).not.toBeDefined()
    })
  })
})
