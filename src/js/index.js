import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Binding loaders enable css loads.
import 'css/app.css'

// Load React apps for page.
import App from 'js/components/App'
import Sheet from 'js/components/Sheet'

// Load reducers for the store.
import charGen from 'js/reducers/charGen'

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(charGen)

// Moved to reducer file for now.
// store.dispatch({ type: 'CREATE_RANDOM' })

// Render the React character builder app.
// react-redux's Provider will live-update the components after state updates.
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
)

// Render character sheet itself.
render(
  <Provider store={store}>
    <Sheet />
  </Provider>,
  document.getElementById('sheet')
)

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: 'CHANGE_NAME', name: 'Test O\'Cles' })

// FIXME for debug only, remove.
// Using webpack-dev-server: window.frames[0].store
// window.frames[0].store.dispatch({ type: 'CHANGE_NAME', name: 'Evil Bert' })
window.store = store
