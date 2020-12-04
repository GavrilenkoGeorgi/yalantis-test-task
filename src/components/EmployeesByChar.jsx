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
		<div className="employees-by-letter">
			<h2>{props.letter}</h2>
			<ul className="employee-list">
				{props.list.length
					? props.list.map(employee =>
						<li key={employee.id}>
							<span className="employee-name">
								{employee.lastName} {employee.firstName}
							</span>
							<span className="checkbox-container">
								<CheckBox
									id={employee.id}
									name={employee.id}
									checked={employee.checked}
									label={employee.checked ? 'checked' : ''}
									onChange={() => checkEmployee(props.letter, employee.id)}
								/>
							</span>
						</li>)
					: <>-----</>
				}
			</ul>
		</div>
	</>
}

EmployeesByChar.propTypes = {
	letter: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired
}

export default EmployeesByChar
