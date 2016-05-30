jest.unmock('js/components/MainHeader')

import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import MainHeader from 'js/components/MainHeader'

describe('MainHeader Component', () => {
  const shallowRenderer = ReactTestUtils.createRenderer()
  let instance = null
  let attributes = null

  describe('For valid inputs', () => {
    beforeEach(() => {
      attributes = {
        name: 'TESTNAME',
        version: 'TESTVERSION'
      }
      instance = shallowRenderer.render(
        <MainHeader npm={attributes} />
      )
    })

    it('renders the component', () => {
      expect(instance.props.className).toEqual('mainHeader')
      expect(instance.type).toEqual('div')
    })

    describe('for the npm data', () => {
      let headerElem = null
      let npmChildren = null

      beforeEach(() => {
        headerElem = instance.props.children
        npmChildren = headerElem.props.children
      })

      it('renders a header element', () => {
        expect(headerElem.type).toEqual('h1')
      })

      it('renders the name property', () => {
        expect(npmChildren[0]).toEqual('TESTNAME')
      })

      it('renders the version property', () => {
        expect(npmChildren[2]).toEqual('TESTVERSION')
      })
    })
  })
})
