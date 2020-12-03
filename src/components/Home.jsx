import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
	console.log('Home comp.')
	return <>
		<h1>Тестове завдання для Yalantis React.js School</h1>
		<div>
			<Link to="/employees">Employees page</Link>
		</div>
	</>
}

export default Home
