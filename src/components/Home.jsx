import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
	return <section className="home-container">
		<h1>Тестове завдання для Yalantis React.js School (online)</h1>
		<article className="greeting">
			<Link to="/employees">Employees page</Link>
			<p>(Завантажити список співробітників з сервера,
				при потраплянні на сторінку <Link to="/employees">employees</Link>)</p>
		</article>
	</section>
}

export default Home
