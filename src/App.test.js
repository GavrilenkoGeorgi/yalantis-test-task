import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('<App /> component', () => {

	beforeEach(() => {
		render(<App />)
	})

	it('renders title and link to employees page', () => {
		expect(screen.getByText(/Тестове завдання/i)).toBeInTheDocument()
		const linkElement = screen.getByText(/Employees page/i)
		expect(linkElement).toBeInTheDocument()
		expect(linkElement).toHaveAttribute('href', '/employees')
	})
})
