import React, { useState } from 'react'

import styles from './InputFloatingLabel.module.scss';

const InputFloatingLabel = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocused = () => {
        console.log('är fokuserad');
        setIsFocused(true);
    }

    const handleBlured = () => {
        console.log('är blurrad');
        setIsFocused(false);
    }

    let attachedClasses = [styles.Label];
    if (isFocused || props.inputValue.length > 0) {
        attachedClasses = [styles.Label, styles.Focused];
    }

    return (
        <div className={styles.InputGroup}>
            <label htmlFor={props.inputName} className={attachedClasses.join(' ')}>{props.labelName}</label>
            <input
                className={styles.Input}
                id={props.inputName}
                value={props.inputValue}
                name={props.inputName}
                onFocus={handleFocused}
                onBlur={handleBlured}
                onChange={props.handleChange}
            />
        </div>
    )
}

export default InputFloatingLabel
