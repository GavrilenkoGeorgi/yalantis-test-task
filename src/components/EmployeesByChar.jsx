import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { setEmployeeCheckedStatus } from '../reducers/employeesReducer'

import CheckBox from './CheckBox'

const EmployeesByChar = ({ groupName, list }) => {

	const dispatch = useDispatch()

	const checkEmployee = (groupName, id) => {
		dispatch(setEmployeeCheckedStatus(groupName, id))
	}

	return <div className="employees-by-letter">
		<h2>{groupName}</h2>
		<ul className="employee-list">
			{list.length
				? list.map(employee =>
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
								aria-label={`check-employee-${employee.lastName}`}
								onChange={() => checkEmployee(groupName, employee.id)}
							/>
						</span>
					</li>)
				: <>-----</>
			}
		</ul>
	</div>
}

EmployeesByChar.propTypes = {
	groupName: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired
}

export default EmployeesByChar
