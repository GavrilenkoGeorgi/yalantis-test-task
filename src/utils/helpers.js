import { letters, months } from './constants'
import { showErrorMessage } from './errorHandling'

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

	return arrayOfObjects.sort((a, b) => months.indexOf(a.groupName) - months.indexOf(b.groupName))
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
		let index = arrayOfObjects.map(item => item.groupName).indexOf(letter)
		if (index < 0) {
			const emptyGroup = {
				groupName: letter,
				employees: []
			}
			emptyGroups.push(emptyGroup)
		}
	}
	return emptyGroups
}

/**
 * Get grouper function based on property name
 * @param {string} propName - Prop name
 *
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {function(): void} Grouper function
 */

const getGrouperFunc = propName => {
	let grouper
	const validGroupingProps = ['lastName', 'dob']

	if (!validGroupingProps.includes(propName))
		throw new Error(`Can't group by ${propName}`)

	propName === 'lastName'
		? grouper = getFirstLetterOfString
		: grouper = getMonthFromDate

	return grouper
}

/**
 * Get first letter of the string
 * @param {string} str - String to get first letter from
 *
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {string} First char of the given string
 */

const getFirstLetterOfString = str => {
	if (!str.length)
		throw new Error('String must be at least 1 char long.')
	return str[0]
}

/**
 * Get full month name from the date string
 * @param {string} dateOfBirth - Date in ISO format
 *
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {string} - Full month name
 */

export const getMonthFromDate = dateOfBirth => {
	const date = new Date(dateOfBirth)
	if (!date)
		throw new Error('Date string must be in ISO format.')
	return months[date.getMonth()]
}

/**
 * Group array of employees by grouped property
 * @param {string} propertyName - Name of the property to sort by
 * @param {Object[]} arrayOfObjects - Array of employee objects
 * @param {Object} group - Group object
 * @param {string} group.groupName - Name of the group
 * @param {string} group.employees - Array of employees for the current group
 *
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {Object[]} - Grouped array of employee objects
 */

export const groupByProperty = (propertyName, arrayOfObjects) => {
	const grouper = getGrouperFunc(propertyName)

	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t group by prop, array of objects is missing.')

	let data = arrayOfObjects.reduce((acc, item) => {
		try {
			let groupName = grouper(item[propertyName])
			if(!acc[groupName]) acc[groupName] = { groupName, employees: [item] }
			else acc[groupName].employees.push(item)
			return acc
		} catch (error) {
			showErrorMessage(error)
		}
	}, {})

	const result = Object.values(data)
	return result
}

/**
 * Add checkboxes to the employees objects
 * @param {Object[]} arrayOfObjects - Array of employees
 * @param {Object} employee - Employee object
 *
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {Object[]} - Array of grouped employee objects with added checkboxes
 */

export const addCheckBoxField = arrayOfObjects => {
	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t add checkboxes, array of employee objects is missing.')

	for (let item of arrayOfObjects) {
		item.checked = false
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
