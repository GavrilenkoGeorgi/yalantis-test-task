import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, Employees } from './components'

export const App = () => {
	return <Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/employees" component={Employees} />
	</Switch>
}

export default App
