import React from 'react'
import PropTypes from 'prop-types'

const CheckBox = props => {

	const { label, ...rest } = props

	return <>
		<input
			type="checkbox"
			{ ...rest }
		/>
		<label htmlFor={rest.id}>
			{label}
		</label>
	</>
}

CheckBox.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	label: PropTypes.string
}

export default CheckBox
