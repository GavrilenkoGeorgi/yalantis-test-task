import React from 'react'
import EmployeesByChar from './EmployeesByChar'

const EmployeesList = (props) => {
	return <div style={{ border: '1px solid pink', width: '50%' }}>
		<h1>Employees</h1>
		{props.groups && props.groups.map((item) =>
			<EmployeesByChar key={item.letter} letter={item.letter} list={item.employees} />
		)}
	</div>
}

export default EmployeesList
