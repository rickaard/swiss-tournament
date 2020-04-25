import React, { useState } from 'react'
import PropTypes from 'prop-types';
import styles from './InputFloatingLabel.module.scss';

const InputFloatingLabel = ({ inputName, labelName, inputValue, handleChange, inputType }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocused = () => {
        setIsFocused(true);
    }

    const handleBlured = () => {
        setIsFocused(false);
    }

    let attachedLabelClasses = [styles.Label];
    if (isFocused || inputValue.length > 0) {
        attachedLabelClasses = [styles.Label, styles.Focused];
    }

    return (
        <div className={styles.InputWrapper}>
            <label htmlFor={inputName} className={attachedLabelClasses.join(' ')}>{labelName}</label>
            <input
                className={styles.Input}
                id={inputName}
                value={inputValue}
                name={inputName}
                onFocus={handleFocused}
                onBlur={handleBlured}
                onChange={handleChange}
                required
                type={inputType}
            />
        </div>
    )
}

InputFloatingLabel.propTypes = {
    inputName: PropTypes.string,
    labelName: PropTypes.string,
    inputValue: PropTypes.string,
    handleChange: PropTypes.func,
    inputType: PropTypes.string
}

export default InputFloatingLabel
