import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import store from '../store/store'

import { setEmployeesArray, setEmployeeCheckedStatus } from '../reducers/employeesReducer'
import groups from '../fixtures/parsedGroups.json'
import BirthdaysList from './BirthdaysList'

describe('<BirthdaysList /> component', () => {

	const [ group ] = groups
	const [ employee ] = group.employees
	let view

	beforeEach(() => {
		store.dispatch(setEmployeesArray(groups))

		view = render(
			<Provider store={store}>
				<BirthdaysList />
			</Provider>
		)
	})

	it('renders default empty list message', () => {
		expect(screen.getByText('Employees birthday')).toBeInTheDocument()
		expect(screen.getByText('No selected employees')).toBeInTheDocument()
	})

	it('shows user in the list if it he was checked', async () => {
		const { rerender } = view
		store.dispatch(setEmployeeCheckedStatus(group.letter, employee.id))
		rerender(
			<Provider store={store}>
				<BirthdaysList />
			</Provider>
		)

		await waitFor(() => {
			expect(screen.getByText(`${employee.lastName} ${employee.firstName} -`)).toBeInTheDocument()
			expect(screen.getByText('23 March, 2019 year')).toBeInTheDocument()
		})

	})
})
