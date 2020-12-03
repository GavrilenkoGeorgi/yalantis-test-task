import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Employees } from './components'

export const App = () => {
	return <Router>
		<Switch>
			<Route path="/employees">
				<Employees />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	</Router>
}

export default App
