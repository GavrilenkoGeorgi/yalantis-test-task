import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectCheckedEmployees, sortByMonth, groupByProperty,
	getMonthFromDate } from '../utils/helpers'

const BirtdaysList = () => {

	const employees = useSelector(state => state.employees)
	const [checkedEmployees, setCheckedEmployees] = useState([])
	const [groupedEmployees, setGroupedEmployees] = useState([])

	useEffect(() => {
		if (employees) {
			setCheckedEmployees(selectCheckedEmployees(employees))
		}
	}, [employees])

	useEffect(() => {
		if (checkedEmployees.length) {
			const grouped = groupByProperty('dob', checkedEmployees)
			setGroupedEmployees(sortByMonth(grouped))
		} else setGroupedEmployees([])
	}, [checkedEmployees])

	const formatDateOfBirth = date => {
		const birthday = new Date(Date.parse(date))

		// to get "31 March, 1977 year" as stated in the requirement
		const day = birthday.getDate()
		const month = getMonthFromDate(birthday)
		const year = birthday.getFullYear()

		return <span>{day} {month}, {year} year</span>

		// but I'd rather do it like this:
		// "March 31, 1977 year"
		/* const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}
		return <span>{birthday.toLocaleString('en-us', options)} year</span> */
	}

	return <section className="birthdays-section">
		<h1>Employees birthday</h1>
		<div className="birthdays-list">
			{groupedEmployees.length
				? groupedEmployees.map(group =>
					<div key={group.groupName} className="month-group">
						<h2>{group.groupName}</h2>
						<ul>
							{group.employees.map(person =>
								<li key={person.id}>
									<span className="employee-birthday-name">
										{person.lastName} {person.firstName} -{' '}
									</span>
									{formatDateOfBirth(person.dob)}
								</li>)}
						</ul>
					</div>
				)
				: <p className="no-emps-to-show-message">
						No selected employees
				</p>
			}
		</div>
	</section>
}

export default BirtdaysList
