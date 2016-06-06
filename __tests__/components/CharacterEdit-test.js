jest.unmock('js/components/CharacterEdit')
jest.unmock('js/utils/findChild')
// TODO This is annoying - have to unmock nested imports.
jest.unmock('js/utils/isPopulatedArray')

import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

import findChild from 'js/utils/findChild'

import CharacterEdit from 'js/components/CharacterEdit'
import ActionBar from 'js/components/ActionBar'

describe('CharacterEdit', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()
  let instance = null
  let attributes = {
    appData: {
      pleaseSelect: 'puhleeze',
      ancestries: [
        'a', 'b', 'c'
      ]
    },
    ancestryData: {
      attributes: {
        increaseOne: true
      },
      characteristics: {
        size: 1
      },
      personality: {
        values: [
          {
            value: 'Test personality.'
          }
        ]
      }
    },
    charData: {
      attributes: {
        oneIncreased: null
      },
      characteristics: {
        size: 1
      },
      mode: null
    }
  }

  describe('for valid inputs in edit mode', () => {
    beforeEach(() => {
      attributes.charData.mode = 'edit'
      instance = shallowRenderer.render(
        <CharacterEdit {...attributes} />
      )
    })

    it('renders the component', () => {
      expect(instance.type).toEqual('div')
      expect(instance.props.className).toEqual('app')
    })

    it('renders an ActionBar', () => {
      let child = findChild(instance, 'type', ActionBar)
      expect(child.type).toBe(ActionBar)
    })

    describe('for the edit element', () => {
      let editElement = null

      beforeEach(() => {
        editElement = findChild(instance, 'props.className', 'characterGenerator')
      })

      it('renders the edit element', () => {
        expect(editElement).toBeDefined()
      })

      it('displays the edit element', () => {
        expect(editElement.props.style.display).not.toEqual('none')
      })

      it('renders a heading', () => {
        let element = findChild(editElement, 'type', 'h2')
        expect(element).toBeDefined()
      })

      // TODO more checks here
    })
  })
})
