jest.unmock('js/components/AdjustOne')

import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import AdjustOne from 'js/components/AdjustOne'

const shallowRenderer = ReactTestUtils.createRenderer()

describe('AdjustOne test suite', () => {
  let instance = null
  let attributes = null

  beforeEach(() => {
    // For convenience - just change what you need.
    attributes = {
      appData: {
        pleaseSelect: 'please selectzor',
        attributes: ['a', 'b', 'c']
      },
      charData: {
        attributes: {
          oneAdjustFrom: undefined,
          oneAdjustTo: undefined
        }
      },
      adjustOneFrom: jasmine.createSpy(),
      adjustOneTo: jasmine.createSpy()
    }

    instance = shallowRenderer.render(
      <AdjustOne {...attributes} />
    )
  })

  it('renders the container element', () => {
    expect(instance.props.className).toEqual(jasmine.stringMatching('adjustOne'))
    expect(instance.type).toEqual('div')
  })

  describe('when events are triggered', () => {
    let adjustOneFromElem
    let adjustOneToElem
    let mockEvent

    beforeEach(() => {
      adjustOneFromElem = instance.props.children.find(elem => (
        elem.props.className && elem.props.className.includes('adjustOneFrom')
      ))

      adjustOneToElem = instance.props.children.find(elem => (
        elem.props.className && elem.props.className.split(' ').includes('adjustOneTo')
      ))

      mockEvent = {
        target: {
          value: 'a'
        }
      }
    })

    it('has an adjustOneFromElem', () => {
      expect(adjustOneFromElem).toBeDefined()
    })

    it('has an adjustOneToElem', () => {
      expect(adjustOneToElem).toBeDefined()
    })

    describe('when adjustOneFromElem is changed', () => {
      beforeEach(() => {
        adjustOneFromElem.props.onChange(mockEvent)
      })

      it('calls adjustOneFrom function', () => {
        expect(attributes.adjustOneFrom).toHaveBeenCalled()
      })
    })

    describe('when adjustOneToElem is changed', () => {
      beforeEach(() => {
        adjustOneToElem.props.onChange(mockEvent)
      })

      it('calls adjustOneToElem function', () => {
        expect(attributes.adjustOneTo).toHaveBeenCalled()
      })
    })
  })
})
