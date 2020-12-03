const employeesReducer = (state = {
	initialArray: null,
	preparedArray: null
}, action) => {

	switch (action.type) {
	case 'SET_EMPLOYEES_ARRAY':
		return { ...state, initialArray: action.data }
	case 'SET_PREPARED_EMPLOYEES_ARRAY':
		return { ...state, preparedArray: action.data }
	case 'CHECK_EMPLOYEE': {
		const { data } = action
		// get group of employees by letter
		const { employees } =
			state.preparedArray.find(group => group.letter === data.letter)
		// update employee
		const updatedEmployees = employees.map(employee =>
			employee.id !== data.id
				? employee
				: { ...employee, checked: !employee.checked })

		return { ...state, preparedArray: state.preparedArray.map(group =>
			group.letter !== data.letter ? group : { ...group, employees: updatedEmployees }) }
	}
	default:
		return state
	}
}

/**
 * Get all employees
 */
export const setEmployeesArray = (data) => {
	return async dispatch => {
		dispatch ({
			type: 'SET_EMPLOYEES_ARRAY',
			data
		})
	}
}

/**
 * Set prepared employees array
 */
export const setPreparedEmployeesArray = (data) => {
	return async dispatch => {
		dispatch ({
			type: 'SET_PREPARED_EMPLOYEES_ARRAY',
			data
		})
	}
}

/**
 * Check employee
 */
export const setEmployeeCheckedStatus = (letter, id) => {
	return async dispatch => {
		dispatch ({
			type: 'CHECK_EMPLOYEE',
			data: {
				letter,
				id
			}
		})
	}
}

export default employeesReducer
