import { sortByProperty, expiresInDays, addCheckBoxField, groupByProperty,
	getEmptyGroups, selectCheckedEmployees, getMonthFromDate } from './helpers'
import users from '../fixtures/users.json'
import parsedGroups from '../fixtures/parsedGroups.json'

describe('Helper utils', () => {
	it('"expiresInDays" is generated properly', () => {
		const date = expiresInDays(1)
		expect(typeof date).toBe('number')
	})

	it('"expiresInDays" throws an error if supplied with invalid argument', () => {
		expect(() => expiresInDays('a'))
			.toThrowError('"Days" arg must be a finite number.')

		expect(() => expiresInDays(0 / 0))
			.toThrowError('"Days" arg must be a finite number.')
	})

	it('"sortByProperty" util sorts array of objects', () => {
		const sorted = sortByProperty('lastName', [ ...users ])
		const [ employees ] = sorted
		expect(employees.lastName).toEqual('Carson')
	})

	it('"sortByProperty" throws an error if supplied with invalid arguments', () => {
		expect(() => sortByProperty([ ...users ]))
			.toThrowError('Can\'t sort, property name is missing.')

		expect(() => sortByProperty('employees'))
			.toThrowError('Can\'t sort, array of objects is missing.')
	})

	it('"groupByProperty" groups array of employeess by first letter of the last name', () => {
		const grouped = groupByProperty('lastName', [ ...users ])
		const [ group ] = grouped

		expect(group.employees).toHaveLength(2)
		expect(group.groupName).toEqual('G')
	})

	it('"groupByProperty" throws an error if supplied with invalid arguments', () => {
		expect(() => groupByProperty('lastName'))
			.toThrowError('Can\'t group by prop, array of objects is missing.')
	})

	it('"addCheckBoxField" adds checkbox field to the grouped employee objects', () => {
		const withCheckBoxes = addCheckBoxField([ ...users ])
		const [ employee ] = withCheckBoxes

		expect(employee).toHaveProperty('checked', false)
	})

	it('"addCheckBoxField" throws an error if supplied with invalid arguments', () => {
		expect(() => addCheckBoxField('groupedEmployees'))
			.toThrowError('Can\'t add checkboxes, array of employee objects is missing.')
	})

	it('"getEmptyGroups" correctly selects missing empty groups', () => {
		const grouped = groupByProperty('lastName', [ ...users ])
		const emptyGroups = getEmptyGroups(grouped)

		// "26" being the number of letters in the alphabet
		expect(emptyGroups).toHaveLength(26 - grouped.length)
	})

	it('"getEmptyGroups" throws an error if supplied with invalid arguments', () => {
		expect(() => getEmptyGroups('groupedEmloyees'))
			.toThrowError('Can\'t select missing groups, array of groups is missing.')
	})

	it('"selectCheckedEmployees" selects onlt checked employees from array of objects', () => {
		const [ group, secondGroup ] = parsedGroups
		const [ employee ] = group.employees
		const checkedEmployee = {
			...employee,
			checked: true
		}

		const updatedGroup =
			group.employees.map(person => person.id !== checkedEmployee.id
				? person : checkedEmployee)

		const updatedGroups = [ { ...group, employees: updatedGroup }, secondGroup ]

		const checkedEmployees = selectCheckedEmployees(updatedGroups)
		expect(checkedEmployees).toHaveLength(1)
		expect(checkedEmployees[0].id).toEqual(employee.id)
	})

	it('"selectCheckedEmployees" throws an error if supplied with invalid arguments', () => {
		expect(() => selectCheckedEmployees('employees'))
			.toThrowError('Can\'t select checked employees, array of employee objects is missing.')
	})

	it('"getMonthFromDate" return name of month', () => {
		const dateString = '2019-09-19T09:34:32.083Z'
		const month = getMonthFromDate(dateString)

		expect(month).toEqual('September')
	})
})

