const setEmployeesObject = data => window.localStorage.setItem('storedEmployees', JSON.stringify(data))

const removeEmployeesObject = () => window.localStorage.removeItem('storedEmployees')

const updateEmployeesObject = (data) => {
	const storedEmployees = JSON.parse(window.localStorage.getItem('storedEmployees'))
	window.localStorage
		.setItem('storedEmployees', JSON.stringify({ ...storedEmployees, employees: data }))
}

const getEmployeesObjectProperty = propertyName => {
	const storedEmployees = JSON.parse(window.localStorage.getItem('storedEmployees'))
	if (storedEmployees) return storedEmployees[propertyName]
	else return ''
}

export default {
	setEmployeesObject,
	getEmployeesObjectProperty,
	removeEmployeesObject,
	updateEmployeesObject
}
