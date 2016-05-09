jest.unmock('../../src/js/components/ActionBar.js')

import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import ActionBar from '../../src/js/components/ActionBar.js'

describe('ActionBar Component', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()
  let instance = null
  let attributes = null

  beforeEach(() => {
    // For convenience - just change what you need.
    attributes = {
      mode: 'view',
      onEdit: jasmine.createSpy(),
      onView: jasmine.createSpy(),
      onCreate: jasmine.createSpy()
    }
  })

  describe('for view mode', () => {
    beforeEach(() => {
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

    describe('for viewButton', () => {
      let viewButton = null

      beforeEach(() => {
        viewButton = instance.props.children.find(elem => (
          elem.props.className.includes('viewButton')
        ))
      })

      it('is not hidden from the User', () => {
        expect(viewButton.props.style.display).toEqual('')
      })

      describe('when onClick is triggered', () => {
        beforeEach(() => {
          viewButton = instance.props.children.find(elem => (
            elem.props.className.includes('viewButton')
          ))
          viewButton.props.onClick()
        })

        it('triggers onEdit', () => {
          expect(attributes.onEdit).toHaveBeenCalled()
        })

        it('triggers no other event functions', () => {
          expect(attributes.onView).not.toHaveBeenCalled()
          expect(attributes.onCreate).not.toHaveBeenCalled()
        })
      })
    })

    describe('when onClick is called on editButton', () => {
      let editButton = null

      beforeEach(() => {
        editButton = instance.props.children.find(elem => (
          elem.props.className.includes('editButton')
        ))
        editButton.props.onClick()
      })

      it('is hidden from the User', () => {
        expect(editButton.props.style.display).toEqual('none')
      })

      it('triggers onView', () => {
        expect(attributes.onView).toHaveBeenCalled()
      })

      it('triggers no other event functions', () => {
        expect(attributes.onEdit).not.toHaveBeenCalled()
        expect(attributes.onCreate).not.toHaveBeenCalled()
      })
    })

    describe('when onClick is called on createButton', () => {
      let createButton = null

      beforeEach(() => {
        createButton = instance.props.children.find(elem => (
          elem.props.className.includes('createButton')
        ))
        createButton.props.onClick()
      })

      it('triggers createButton', () => {
        expect(attributes.onCreate).toHaveBeenCalled()
      })

      it('triggers no other event functions', () => {
        expect(attributes.onEdit).not.toHaveBeenCalled()
        expect(attributes.onView).not.toHaveBeenCalled()
      })
    })
  })

  describe('for edit mode', () => {
    beforeEach(() => {
      attributes.mode = 'edit'
      instance = shallowRenderer.render(
        <ActionBar {...attributes} />
      )
    })

    it('hides the view button', () => {
      const viewButton = instance.props.children.find(elem => (
        elem.props.className.includes('viewButton')
      ))
      expect(viewButton.props.style.display).toEqual('none')
    })

    it('shows the edit button', () => {
      const editButton = instance.props.children.find(elem => (
        elem.props.className.includes('editButton')
      ))
      expect(editButton.props.style.display).toEqual('')
    })
  })
})

