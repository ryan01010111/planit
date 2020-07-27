import React, { Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function TextInput({ type, name, placeholder, value, onChange, autofocus }) {
    const focus = useRef(null);

    useEffect(() => {
        if (autofocus) {
            focus.current.focus();
        }
    }, []);

    return (
        <Fragment>
            <input
                ref={focus}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete="off"
            />
        </Fragment>
    )
}

//PropTypes
TextInput.propTypes = {
    autofocus: PropTypes.bool,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}
