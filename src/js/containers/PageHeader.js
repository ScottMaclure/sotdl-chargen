import React from 'react'
import { connect } from 'react-redux'

const defaultNpmData = {}

const MainHeader = ({npm = defaultNpmData}) => (
  <div className='mainHeader'>
    <h1>{npm.name} v{npm.version}</h1>
  </div>
)

// Inbound data
const mapStateToProps = (state) => {
  return {
    npm: Object.assign({}, state.npm)
  }
}

// Bind redux store to react component.
const PageHeader = connect(
  mapStateToProps
)(MainHeader)

export default PageHeader
