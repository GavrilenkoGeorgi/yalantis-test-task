import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './store/store'

import axiosMock from 'axios'
import mockResponseData from './fixtures/users'
import App from './App'

describe('<App /> component', () => {

	beforeEach(() => {
		axiosMock.get.mockResolvedValue({ data: mockResponseData })
		render(
			<Provider store={store}>
				<App />
			</Provider>)
	})

	it('renders employees page', async () => {
		await waitFor(() => {
			expect(screen.getByText('Employees')).toBeInTheDocument()
			expect(screen.getByText('Employees birthday')).toBeInTheDocument()
		})
	})
})
