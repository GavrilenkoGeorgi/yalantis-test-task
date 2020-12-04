import React from 'react'
import EmployeesByChar from './EmployeesByChar'

const EmployeesList = (props) => {
	return <>
		<section className="employees-section">
			<h1>Employees</h1>
			{props.groups && props.groups.map((item) =>
				<EmployeesByChar key={item.letter} letter={item.letter} list={item.employees} />
			)}
		</section>
	</>
}

export default EmployeesList
