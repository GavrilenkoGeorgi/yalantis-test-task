import { letters, months } from './constants'

/**
 * Sort array of objects by property
 *
 * @param {string} propertyName - Name of the property to sort by
 * @param {Object[]} arrayOfObjects - Objects to sort
 * @throws - Will throw an error if some args are missing
 *
 * @returns {Object[]} - sorted array of objects
 */

export const sortByProperty = (propertyName, arrayOfObjects) => {
	if (typeof propertyName !== 'string')
		throw new Error('Can\'t sort, property name is missing.')

	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t sort, array of objects is missing.')

	return arrayOfObjects.sort(function(a, b) {
		if(a[propertyName] < b[propertyName]) { return -1 }
		if(a[propertyName] > b[propertyName]) { return 1 }
		return 0
	})
}

/**
 * Sort array of objects by month property
 * @param {Object[]} arrayOfObjects - Array of employee groups
 * @param {string} month - Month name of the group
 * @throws Error if "days" arg is missing or invalid
 *
 * @return {Object[]} - Sorted array of objects
 */

export const sortByMonth = arrayOfObjects => {
	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t sort, array of objects is missing.')

	return arrayOfObjects.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month))
}

/**
 * Generate expiry date
 * @param {number} days
 * @throws Error if "days" arg is missing or invalid
 *
 * @returns {number} - Date in milliseconds
 */

export const expiresInDays = days => {
	if (!days || typeof days !== 'number' || !isFinite(days))
		throw new Error('"Days" arg must be a finite number.')
	const day = 86400000
	return Date.now() + day * days
}

/**
 * Select empty groups by letter to the array of grouped employees
 * @param {Object[]} arrayOfObjects - Array of employee groups
 * @param {string} letter - Letter of the alphabet of the group
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {Object[]} - Array of empty groups to add to employee groups array
 */

export const getEmptyGroups = arrayOfObjects => {

	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t select missing groups, array of groups is missing.')

	const alphabet = letters.toUpperCase().split(' ')
	const emptyGroups = []

	for (let letter of alphabet) {
		let index = arrayOfObjects.map(item => item.letter).indexOf(letter)
		if (index < 0) {
			const emptyGroup = {
				letter,
				employees: []
			}
			emptyGroups.push(emptyGroup)
		}
	}
	return emptyGroups
}

/**
 * Group array of employees by first letter of their lastName
 * @param {Object[]} arrayOfObjects - Array of employee objects
 * @param {Object} employee - Employee object
 * @param {string} employee.id - Employee id
 * @param {string} employee.firstName - Employee first name
 * @param {string} employee.lastName - Employee last name
 * @param {string} employee.dob - Employee date of birth
 *
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {Object[]} - Grouped array of employee objects
 */

export const groupByLetter = arrayOfObjects => { // this!

	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t group by last name first letter, array of employee objects is missing.')

	let data = arrayOfObjects.reduce((acc, item) => {
		let letter = item.lastName[0]
		if(!acc[letter]) acc[letter] = { letter, employees: [item] }
		else acc[letter].employees.push(item)
		return acc
	}, {})

	const result = Object.values(data)
	return result
}

/**
 * Group array of employees by birthday month
 * @param {Object[]} arrayOfObjects - Array of employee objects
 * @param {Object} employee - Employee object
 * @param {string} employee.id - Employee id
 * @param {string} employee.firstName - Employee first name
 * @param {string} employee.lastName - Employee last name
 * @param {string} employee.dob - Employee date of birth
 * @param {boolean} employee.checked - Employee "checked" status
 *
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {Object[]} - Grouped array of employee objects
 */

export const groupByMonth = arrayOfObjects => { // and this!

	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t group by month, array of employee objects is missing.')

	let data = arrayOfObjects.reduce((acc, item) => {
		let month = getMonthFromDate(item.dob)
		if(!acc[month]) acc[month] = { month, employees: [item] }
		else acc[month].employees.push(item)
		return acc
	}, {})

	const result = Object.values(data)
	return result
}

/**
 * Add checkboxes to the employees objects
 * @param {Object[]} arrayOfObjects - Array of grouped employees
 * @param {Object} group - Grouped of employees
 * @param {Object} group.letter - Group letter
 * @param {Object[]} group.employees - Group of eployees for current letter
 * @param {Object} employee - Employee object
 * @param {Object} employee.id - Employee id
 * @param {string} employee.firstName - Employee first name
 * @param {string} employee.lastName - Employee last name
 * @param {string} employee.dob - Employee date of birth
 *
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {Object[]} - Array of grouped employee objects with added checkboxes
 */

export const addCheckBoxField = arrayOfObjects => {

	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t add checkboxes, array of employee objects is missing.')

	for (let item of arrayOfObjects) {
		for (let person of item.employees) {
			person.checked = false
		}
	}
	return arrayOfObjects
}

/**
 * Selects only checked employees from array of employee objects
 * @param {Object[]} arrayOfObjects - Array of grouped employees
 * @param {Object} group - Grouped of employees
 * @param {Object} group.letter - Group letter
 * @param {Object[]} group.employees - Group of eployees for current letter
 * @param {Object} employee - Employee object
 * @param {Object} employee.id - Employee id
 * @param {string} employee.firstName - Employee first name
 * @param {string} employee.lastName - Employee last name
 * @param {string} employee.dob - Employee date of birth
 * @param {string} employee.cheked - Employee 'checked' status
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {Object[]} - Array of employee with 'true' checked prop
 */

export const selectCheckedEmployees = arrayOfObjects => {

	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t select checked employees, array of employee objects is missing.')

	const result = []
	for (let group of arrayOfObjects) {
		if (group.employees.length) {
			for (let employee of group.employees) {
				if (employee.checked) result.push(employee)
			}
		}
	}

	return result
}

/**
 * Get full month name from the date string
 * @param {string} dateOfBirth - Date in ISO format
 *
 * @returns {string} - Full month name
 */

export const getMonthFromDate = dateOfBirth => {
	const date = new Date(dateOfBirth)
	return months[date.getMonth()]
}
