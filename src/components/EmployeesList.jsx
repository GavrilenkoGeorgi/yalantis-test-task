import React from 'react'
import EmployeesByChar from './EmployeesByChar'

const EmployeesList = ({ groups }) => {
	return <>
		<section className="employees-section">
			<h1>Employees</h1>
			{groups && groups.map(group =>
				<EmployeesByChar
					key={group.letter}
					letter={group.letter}
					list={group.employees}
				/>
			)}
		</section>
	</>
}

export default EmployeesList
