import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer, {exampleInitialState} from './reducer'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export function makeStore (initialState = exampleInitialState) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}