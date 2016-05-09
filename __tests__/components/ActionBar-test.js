jest.unmock('../../src/js/components/ActionBar.js')

import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import ActionBar from '../../src/js/components/ActionBar.js'

describe('ActionBar Component', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()
  let instance = null
  let attributes = {}
  let viewButton = null

  describe('for view mode', () => {
    beforeEach(() => {
      attributes = {
        mode: 'view',
        onEdit: jasmine.createSpy(),
        onView: jasmine.createSpy(),
        onCreate: jasmine.createSpy()
      }

      instance = shallowRenderer.render(
        <ActionBar {...attributes} />
      )
    })

    it('renders the container element', () => {
      expect(instance.props.className).toEqual('actionBar')
      expect(instance.type).toEqual('div')
    })

    it('renders three buttons', () => {
      const buttons = instance.props.children.filter(child => {
        return child.type === 'button'
      })
      expect(buttons.length).toEqual(3)
    })

    it('triggers no event functions yet', () => {
      expect(attributes.onEdit).not.toHaveBeenCalled()
      expect(attributes.onView).not.toHaveBeenCalled()
      expect(attributes.onCreate).not.toHaveBeenCalled()
    })

    describe('when onClick is called on viewButton', () => {
      let viewButton = null

      beforeEach(() => {
        viewButton = instance.props.children.find(elem => (
          elem.props.className.includes('viewButton')
        ))
        viewButton.props.onClick()
      })

      it('triggers onEdit', () => {
        expect(attributes.onEdit).toHaveBeenCalled()
      })
    })
  })
})

