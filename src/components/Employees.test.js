import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import Employees from './Employees'
import store from '../store/store'
import { setEmployeesArray, setEmployeeCheckedStatus } from '../reducers/employeesReducer'

import groups from '../fixtures/parsedGroups.json'

describe('<Employees /> component', () => {
	const [ firstGroup, secondGroup ] = groups
	const [ employee ] = secondGroup.employees
	let view

	beforeEach(() => {
		store.dispatch(setEmployeesArray(groups))

		view = render(
			<Provider store={store}>
				<Employees />
			</Provider>
		)
	})

	it('renders list of employees component', () => {
		expect(screen.getByText(`${employee.lastName} ${employee.firstName}`)).toBeInTheDocument()
		expect(screen.getByText(firstGroup.letter)).toBeInTheDocument()
	})

	it('renders list of birthdays component', () => {
		expect(screen.getByText('Employees birthday')).toBeInTheDocument()
	})

	it('if no employees are selected, message is displayed', () => {
		expect(screen.getByText('No selected employees')).toBeInTheDocument()
	})

	it('shows selected birthdays list', async () => {
		const { rerender } = view

		store.dispatch(setEmployeesArray(groups))
		store.dispatch(setEmployeeCheckedStatus(secondGroup.letter, employee.id))

		rerender(
			<Provider store={store}>
				<Employees />
			</Provider>
		)

		await waitFor(() => {
			expect(screen.getByText('7 January, 2019 year')).toBeInTheDocument()
		})

	})
})
