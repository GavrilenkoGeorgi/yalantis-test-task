import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setEmployeesArray } from '../reducers/employeesReducer'
import employeesService from '../services/employees'
import localStorageHelper from '../utils/localStorageHelper'
import { sortByProperty, getEmptyGroups, groupByLetter,
	expiresInDays, addCheckBoxField } from '../utils/helpers'

import EmployeesList from './EmployeesList'
import BirtdaysList from './BirthdaysList'

const Employees = () => {

	const dispatch = useDispatch()
	const employees = useSelector(state => state.employees)
	const [employeeGroups, setEmployeeGroups] = useState(null)

	const prepareUserData = useCallback((arrayOfEmployees) => {
		const sorted = sortByProperty('lastName', arrayOfEmployees)
		const grouped = groupByLetter(sorted)
		const withCheckBoxes = addCheckBoxField(grouped)
		const emptyGroups = getEmptyGroups(withCheckBoxes)
		const allGroups = sortByProperty('letter', grouped.concat(emptyGroups))

		return allGroups
	}, [])

	useEffect(() => {
		const expirationDate = localStorageHelper.getEmployeesObjectProperty('expirationDate')
		if (!expirationDate || (Date.now() > expirationDate)) {
			// not set or expired
			employeesService.getAllEmployees()
				.then(({ data }) => {
					const parsedData = prepareUserData(data)
					dispatch(setEmployeesArray(parsedData))
					localStorageHelper.setEmployeesObject({
						employees: parsedData,
						expirationDate: expiresInDays(7)
					})
				})
				.catch(error => {
					console.error(error.message)
				})
		} else { // restore saved state
			const savedState = localStorageHelper.getEmployeesObjectProperty('employees')
			dispatch(setEmployeesArray(savedState))
		}
	}, [dispatch, prepareUserData])

	useEffect(() => {
		// on change, update view
		setEmployeeGroups(employees)
		// save current state to LS
		localStorageHelper.updateEmployeesObject(employees)
	}, [employees] )

	return <div style={{ display: 'flex' }}>
		{employees && <>
			<EmployeesList groups={employeeGroups}/>
			<BirtdaysList />
		</>}
	</div>

}

export default Employees
