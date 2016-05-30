import React from 'react'

const defaultNpmData = {}

const MainHeader = ({npm = defaultNpmData}) => (
  <div className='mainHeader'>
    <h1>{npm.name} v{npm.version}</h1>
  </div>
)

export default MainHeader
