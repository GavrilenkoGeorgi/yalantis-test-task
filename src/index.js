import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter basename="/yalantis-test-task">
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
