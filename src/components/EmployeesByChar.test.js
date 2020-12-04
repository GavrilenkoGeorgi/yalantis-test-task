import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import EmployeesByChar from './EmployeesByChar'
import store from '../store/store'

import groups from '../fixtures/parsedGroups.json'

describe('<EmployeesByChar /> component', () => {

	const [ group ] = groups
	const [ employee ] = group.employees

	beforeEach(() => {
		render(
			<Provider store={store}>
				<EmployeesByChar
					key={group.letter}
					letter={group.letter}
					list={group.employees}
				/>
			</Provider>)
	})

	it('renders group of employees', () => {
		expect(screen.getByText(`${employee.lastName} ${employee.firstName}`)).toBeInTheDocument()
	})
})
