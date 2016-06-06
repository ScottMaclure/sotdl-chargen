jest.unmock('js/components/CharacterSheet')
jest.unmock('js/utils/findChild')
// TODO This is annoying - have to unmock nested imports.
jest.unmock('js/utils/isPopulatedArray')

import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

import findChild from 'js/utils/findChild'

import CharacterSheet from 'js/components/CharacterSheet'

describe('for CharacterSheet', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()
  let instance = null
  let attributes = null

  describe('for valid inputs in view mode', () => {
    beforeEach(() => {
      attributes = {
        mode: 'view',
        appData: {
          attributes: [
            'strength'
          ]
        },
        charData: {
          attributes: {
            strength: 10
          },
          characteristics: {
            'damage': 0
          }
        }
      }

      instance = shallowRenderer.render(
        <CharacterSheet {...attributes} />
      )
    })

    it('renders the component', () => {
      expect(instance.props.className).toEqual('characterSheet')
      expect(instance.type).toEqual('div')
    })

    it('renders visibly', () => {
      expect(instance.props.style.display).toEqual('none')
    })

    it('renders a header', () => {
      const component = findChild(instance, 'type', 'h2')
      expect(component.props.children).toEqual('Character Sheet')
    })

    it('renders the attributes component', () => {
      const component = findChild(instance, 'props.legend', 'Attributes')
      expect(component).toBeDefined()
    })

    describe('for the info component', () => {
      let info = null

      beforeEach(() => {
        info = findChild(instance, 'props.legend', 'Info')
      })

      it('renders the info component', () => {
        expect(info).toBeDefined()
      })

      it('renders the personality element', () => {
        // inside the content component
        const element = findChild(info.props.content, 'props.label', 'Personality')
        expect(element).toBeDefined()
      })
    })
  })
})
