import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import EmployeesList from './EmployeesList'
import store from '../store/store'
import { setEmployeesArray } from '../reducers/employeesReducer'

import groups from '../fixtures/parsedGroups.json'

describe('<EmployeesList /> component', () => {
	const [ firstGroup, secondGroup ] = groups
	const [ employee ] = secondGroup.employees

	beforeEach(() => {
		store.dispatch(setEmployeesArray(groups))

		render(
			<Provider store={store}>
				<EmployeesList groups={groups}/>
			</Provider>
		)
	})

	it('render list of employees grouped by letter', () => {
		expect(screen.getByText(`${employee.lastName} ${employee.firstName}`)).toBeInTheDocument()
		expect(screen.getByText(firstGroup.letter)).toBeInTheDocument()
	})
})
