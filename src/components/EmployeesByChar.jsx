import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { setEmployeeCheckedStatus } from '../reducers/employeesReducer'

import CheckBox from './CheckBox'

const EmployeesByChar = (props) => {

	const dispatch = useDispatch()

	const checkEmployee = (letter, id) => {
		dispatch(setEmployeeCheckedStatus(letter, id))
	}

	return <>
		<h2>{props.letter}</h2>
		<ul>
			{props.list.length
				? props.list.map(employee =>
					<li key={employee.id}>
						{employee.lastName} {employee.firstName}
						<CheckBox
							id={employee.id}
							name={employee.id}
							checked={employee.checked}
							label="chosen"
							onChange={() => checkEmployee(props.letter, employee.id)}
						/>
					</li>)
				: <>-----</>
			}
		</ul>
	</>
}

EmployeesByChar.propTypes = {
	letter: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired
}

export default EmployeesByChar
