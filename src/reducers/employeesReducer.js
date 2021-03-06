const employeesReducer = (state = {
	employees: null
}, action) => {

	switch (action.type) {
	case 'SET_EMPLOYEES_ARRAY':
		return { ...state, employees: action.data }
	case 'CHECK_EMPLOYEE': {
		const { data } = action
		// get group of employees by group name
		const { employees } =
			state.employees.find(group => group.groupName === data.groupName)
		// update employee
		const updatedEmployees = employees.map(employee =>
			employee.id !== data.id
				? employee
				: { ...employee, checked: !employee.checked })

		return { ...state, employees: state.employees.map(group =>
			group.groupName !== data.groupName ? group : { ...group, employees: updatedEmployees }) }
	}
	default:
		return state
	}
}

/**
 * Set employees array
 */
export const setEmployeesArray = data => {
	return async dispatch => {
		dispatch ({
			type: 'SET_EMPLOYEES_ARRAY',
			data
		})
	}
}

/**
 * Check employee
 */
export const setEmployeeCheckedStatus = (groupName, id) => {
	return async dispatch => {
		dispatch ({
			type: 'CHECK_EMPLOYEE',
			data: {
				groupName,
				id
			}
		})
	}
}

export default employeesReducer
