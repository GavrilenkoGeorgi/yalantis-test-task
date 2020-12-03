import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setEmployeesArray, setPreparedEmployeesArray } from '../reducers/employeesReducer'
import employeesService from '../services/employees'
import { sortByProperty, getEmptyGroups, groupByLetter, addCheckBoxField } from '../utils/helpers'

import EmployeesList from './EmployeesList'
import BirtdaysList from './BirthdaysList'

const Employees = () => {

	const dispatch = useDispatch()
	const initialArray = useSelector(state => state.initialArray)
	const preparedArray = useSelector(state => state.preparedArray)
	const [employeeGroups, setEmployeeGroups] = useState(null)

	useEffect(() => {
		employeesService.getAllEmployees()
			.then(({ data }) => {
				dispatch(setEmployeesArray(data))
			})
			.catch(error => {
				console.error(error.message)
			})
	}, [dispatch])

	const prepareUserData = useCallback((arrayOfEmployees) => {
		const sorted = sortByProperty('lastName', arrayOfEmployees)
		const grouped = groupByLetter(sorted)
		const withCheckBoxes = addCheckBoxField(grouped)
		const emptyGroups = getEmptyGroups(withCheckBoxes)
		const allGroups = sortByProperty('letter', grouped.concat(emptyGroups))

		return allGroups
	}, [])


	useEffect(() => {
		if (initialArray)
			dispatch(setPreparedEmployeesArray(prepareUserData(initialArray)))
	}, [initialArray, prepareUserData, dispatch])

	useEffect(() => {
		setEmployeeGroups(preparedArray)
	}, [preparedArray] )

	return <div style={{ display: 'flex' }}>
		{preparedArray && <>
			<EmployeesList groups={employeeGroups}/>
			<BirtdaysList />
		</>}
	</div>

}

export default Employees
