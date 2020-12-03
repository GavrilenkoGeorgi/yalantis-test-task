import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectCheckedUsers, groupByMonth } from '../utils/helpers'

const BirtdayList = () => {

	const preparedArray = useSelector(state => state.preparedArray)
	const [checkedUsers, setCheckedUsers] = useState([])
	const [groupedEmployees, setGroupedEmployees] = useState([])

	useEffect(() => {
		if (preparedArray)
			setCheckedUsers(selectCheckedUsers(preparedArray))
	}, [preparedArray])

	useEffect(() => {
		if (checkedUsers.length) {
			console.log('Checked users chaged', checkedUsers)
			setGroupedEmployees(groupByMonth(checkedUsers))

			const result = groupByMonth(checkedUsers)
			console.log(result)
			console.log(result)
		}
	}, [checkedUsers])

	return <div style={{ border: '1px solid green', width: '50%' }}>
		<h1>BirtdayList</h1>
		{groupedEmployees.map(group => <p key={group.month}>{group.month}</p>)}
	</div>
}

export default BirtdayList
