import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'

describe('<Home /> component', () => {

	beforeEach(() => {
		render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		)
	})

	it('renders home page', () => {
		expect(screen.getByText(/Тестове завдання/i)).toBeInTheDocument()
		expect(screen.getByText('Employees page')).toHaveAttribute('href', '/employees')
	})
})
