import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectCheckedUsers, sortByMonth,
	groupByMonth, getMonthFromDate } from '../utils/helpers'

const BirtdaysList = () => {

	const employees = useSelector(state => state.employees)
	const [checkedUsers, setCheckedUsers] = useState([])
	const [groupedEmployees, setGroupedEmployees] = useState([])

	useEffect(() => {
		if (employees) {
			setCheckedUsers(selectCheckedUsers(employees))
		}
	}, [employees])

	useEffect(() => {
		if (checkedUsers.length) {
			const grouped = groupByMonth(checkedUsers)
			setGroupedEmployees(sortByMonth(grouped))
		} else setGroupedEmployees([])
	}, [checkedUsers])

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
		{groupedEmployees.length
			? groupedEmployees.map(group =>
				<div key={group.month} className="month-group">
					<h2>{group.month}</h2>
					<ul>
						{group.employees.map(person =>
							<li key={person.id}>
								{person.lastName} {person.firstName}{' '}
								- {formatDateOfBirth(person.dob)}
							</li>)}
					</ul>
				</div>
			)
			: <span>No selected employees</span>}
	</section>
}

export default BirtdaysList
