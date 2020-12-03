import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import employeesReducer from '../reducers/employeesReducer'

const store = createStore(
	employeesReducer,
	composeWithDevTools(
		applyMiddleware(thunk))
)

export default store
