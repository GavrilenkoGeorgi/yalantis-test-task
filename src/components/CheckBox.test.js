import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import groups from '../fixtures/parsedGroups.json'
import CheckBox from './CheckBox'

const mockCheckEmployee = jest.fn()

describe('<CheckBox /> component', () => {
	let view
	let checkbox
	const [ group ] = groups
	const [ employee ] = group.employees

	beforeEach(() => {
		view = render(
			<CheckBox
				id={employee.id}
				name={employee.id}
				checked={employee.checked}
				label={employee.checked ? 'checked' : ''}
				aria-label={`check-employee-${employee.lastName}`}
				onChange={() => mockCheckEmployee(group.letter, employee.id)}
			/>
		)

		checkbox = screen.getByRole('checkbox')
	})

	it('renders properly', () => {
		expect(checkbox).toHaveAttribute('aria-label', `check-employee-${employee.lastName}`)
		expect(checkbox).toHaveAttribute('id', employee.id)
		expect(checkbox).not.toBeChecked()
	})

	it('on check call "employee check" function', async () => {
		userEvent.click(checkbox)
		await waitFor(() => {
			expect(mockCheckEmployee).toHaveBeenCalledTimes(1)
			expect(mockCheckEmployee).toHaveBeenCalledWith(group.letter, employee.id)
		})
	})

	it('changes checked status', () => {
		const { rerender } = view

		rerender(<CheckBox
			id={employee.id}
			name={employee.id}
			checked={true}
			label={employee.checked ? 'checked' : ''}
			aria-label={`check-employee-${employee.lastName}`}
			onChange={() => mockCheckEmployee(group.letter, employee.id)}
		/>)

		expect(checkbox).toBeChecked()
	})

})
