import { letters, months } from './constants'

export const sortByProperty = (propertyName, arrayOfObjects) => {
	return arrayOfObjects.sort(function(a, b){
		if(a[propertyName] < b[propertyName]) { return -1 }
		if(a[propertyName] > b[propertyName]) { return 1 }
		return 0
	})
}

export const sortByMonth = (arrayOfObjects) => {
	return arrayOfObjects.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month))
}

export const expiresInDays = days => {
	const day = 86400000
	return Date.now() + day * days
}

export const getEmptyGroups = arrayOfObjects => {
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

export const groupByLetter = arrayOfObjects => { // this!

	let data = arrayOfObjects.reduce((acc, item) => {
		let letter = item.lastName[0]
		if(!acc[letter]) acc[letter] = { letter, employees: [item] }
		else acc[letter].employees.push(item)
		return acc
	}, {})

	const result = Object.values(data)
	return result
}

export const groupByMonth = arrayOfObjects => { // and this!

	let data = arrayOfObjects.reduce((acc, item) => {
		let month = getMonthFromDate(item.dob)
		if(!acc[month]) acc[month] = { month, employees: [item] }
		else acc[month].employees.push(item)
		return acc
	}, {})

	const result = Object.values(data)
	return result
}

export const addCheckBoxField = arrayOfObjects => {
	for (let item of arrayOfObjects) {
		for (let person of item.employees) {
			person.checked = false
		}
	}
	return arrayOfObjects
}

export const selectCheckedUsers = (arrayOfObjects) => {
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

export const getMonthFromDate = dateOfBirth => {
	const date = new Date(dateOfBirth)
	return months[date.getMonth()]
}
