import React, { PropTypes } from 'react'

const Select = ({ id, options, value, onChange }) => (
		<select id={id} name={id} value={value} className="field" onChange={onChange}>
			{options.map(function (option, i) {
				// Handle structured items or just arrays of strings.
				let optionValue = option.value || option
				return <option key={i} value={optionValue}>{optionValue}</option>
			})}
		</select>

)

Select.propTypes = {
	options: PropTypes.array.isRequired,
	value: PropTypes.string
}

export default Select