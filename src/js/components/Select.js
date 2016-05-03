import React, { PropTypes } from 'react'

const Select = ({ id, options, value, onChange }) => (
		<select id={id} name={id} className="field" onChange={onChange}>
			{options.map(function (option, i) {
				// Handle structured items or just arrays of strings.
				let optionValue = option.value || option
				let isSelected = value === optionValue
				return <option key={i} value={optionValue} selected={isSelected}>{optionValue}</option>
			})}
		</select>

)

Select.propTypes = {
	options: PropTypes.array.isRequired,
	value: PropTypes.string
}

export default Select