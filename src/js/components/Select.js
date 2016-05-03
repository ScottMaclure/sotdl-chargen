import React, { PropTypes } from 'react'

const Select = ({ options, value }) => (
		<select className="field">
			{options.map(function (option, i) {
				// Handle structured items or just arrays of strings.
				let optionValue = option.value || option
				let isSelected = value === optionValue ? true : false;
				return <option key={i} value={optionValue} selected={isSelected}>{optionValue}</option>
			})}
		</select>

)

Select.propTypes = {
	options: PropTypes.array.isRequired,
	value: PropTypes.string
}

export default Select