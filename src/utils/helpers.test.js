import { sortByProperty, expiresInDays, groupByLetter, addCheckBoxField,
	getEmptyGroups, groupByMonth, selectCheckedUsers } from './helpers'
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
		const sorted = sortByProperty('lastName', users)
		const [ user ] = sorted
		expect(user.lastName).toEqual('Carson')
	})

	it('"sortByProperty" throws an error if supplied with invalid arguments', () => {
		expect(() => sortByProperty(users))
			.toThrowError('Can\'t sort, property name is missing.')

		expect(() => sortByProperty('users'))
			.toThrowError('Can\'t sort, array of objects is missing.')
	})

	it('"groupByLetter" groups array of users by first letter of the last name', () => {
		const grouped = groupByLetter(users)
		const [ group ] = grouped

		expect(group.employees).toHaveLength(1)
		expect(group.letter).toEqual('C')
	})

	it('"groupByLetter" throws an error if supplied with invalid arguments', () => {
		expect(() => groupByLetter('users'))
			.toThrowError('Can\'t group by last name first letter, array of user objects is missing.')
	})

	it('"groupByMonth" groups array of users by month', () => {
		const grouped = groupByMonth(users)
		expect(grouped).toHaveLength(5)
	})

	it('"groupByMonth" throws an error if supplied with invalid arguments', () => {
		expect(() => groupByMonth('users'))
			.toThrowError('Can\'t group by month, array of user objects is missing.')
	})

	it('"addCheckBoxField" adds checkbox field to the grouped user objects', () => {
		const withCheckBoxes = addCheckBoxField(groupByLetter(users))

		const [ group ] = withCheckBoxes
		const [ employee ] = group.employees

		expect(employee).toHaveProperty('checked', false)
	})

	it('"addCheckBoxField" throws an error if supplied with invalid arguments', () => {
		expect(() => addCheckBoxField('groupedUsers'))
			.toThrowError('Can\'t add checkboxes, array of user objects is missing.')
	})

	it('"getEmptyGroups" correctly selects missing empty groups', () => {
		const grouped = groupByLetter(users)
		const emptyGroups = getEmptyGroups(grouped)

		// "26" being the number of letters in the alphabet
		expect(emptyGroups).toHaveLength(26 - grouped.length)
	})

	it('"getEmptyGroups" throws an error if supplied with invalid arguments', () => {
		expect(() => getEmptyGroups('groupedUsers'))
			.toThrowError('Can\'t select missing groups, array of groups is missing.')
	})

	it('"selectCheckedUsers" selects onlt checked users from array of objects', () => {
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

		const checkedUsers = selectCheckedUsers(updatedGroups)
		expect(checkedUsers).toHaveLength(1)
		expect(checkedUsers[0].id).toEqual(employee.id)
	})

	it('"selectCheckedUsers" throws an error if supplied with invalid arguments', () => {
		expect(() => selectCheckedUsers('users'))
			.toThrowError('Can\'t select checked users, array of user objects is missing.')
	})
})

