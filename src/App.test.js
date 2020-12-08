import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'

import axiosMock from 'axios'
import mockResponseData from './fixtures/users'
import App from './App'

describe('<App /> component', () => {

	beforeEach(() => {
		axiosMock.get.mockResolvedValue({ data: mockResponseData })
		render(
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>)
	})

	it('renders employees page', async () => {
		await waitFor(() => {
			expect(screen.getByText(/Завантажити список співробітників/)).toBeInTheDocument()
		})
	})
})
