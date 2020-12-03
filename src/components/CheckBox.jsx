import React from 'react'
import PropTypes from 'prop-types'

const CheckBox = props => {

	const { label, ...rest } = props

	return <>
		<div>
			<input
				type="checkbox"
				// id="scales"
				// name="scales"
				// checked
				{ ...rest }
			/>
			<label htmlFor={label}>
				{label}
			</label>
		</div>
	</>
}

CheckBox.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	label: PropTypes.string
}

export default CheckBox
