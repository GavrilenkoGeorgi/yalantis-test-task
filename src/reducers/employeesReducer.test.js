import employeesReducer from './employeesReducer'
import groups from '../fixtures/parsedGroups.json'

describe('Employees reducer', () => {
	it('returns default state', () => {
		const defaultState = employeesReducer(undefined, {})
		expect(defaultState.employees).toBe(null)
	})

	it('sets employees array', () => {
		const [ firstGroup ] = groups
		const { employees } = employeesReducer(groups, {
			type: 'SET_EMPLOYEES_ARRAY',
			data: groups
		})

		expect(employees).toHaveLength(groups.length)
		expect(employees).toEqual(
			expect.arrayContaining([
				expect.objectContaining(firstGroup)
			])
		)
	})

	it('sets employee "is checked" status', () => {
		const initialState = employeesReducer(undefined, {
			type: 'SET_EMPLOYEES_ARRAY',
			data: groups
		})

		const [ firstGroup ] = initialState.employees
		const [ employee ] = firstGroup.employees

		const updatedState = employeesReducer(initialState, {
			type: 'CHECK_EMPLOYEE',
			data: {
				groupName: firstGroup.groupName,
				id: employee.id
			}
		})

		const [ updatedGroup ] = updatedState.employees
		const checkedEmployee = {
			...employee,
			checked: true
		}

		expect(updatedGroup.employees).toEqual(
			expect.arrayContaining([
				expect.objectContaining(checkedEmployee)
			])
		)
	})
})
