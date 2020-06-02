import React from 'react';

const Input = ({ hasClass, handleInputChange, after, before, name, handleKeyPress }) => {

    function togglePlaceholder({ target }) {
        if (target.hasAttribute('placeholder')) {
            target.removeAttribute('placeholder');
        } else {
            target.setAttribute('placeholder', 'Input value');
        }
    }

    return (
        hasClass ?
            <input
                onFocus={togglePlaceholder}
                onBlur={togglePlaceholder}
                type="text"
                placeholder="Input value"
                className="input-after"
                value={after}
                onChange={(event) => handleInputChange(event, 'after')}
                name={name}
                onKeyPress={handleKeyPress}
            />
            :
            <input
                onFocus={togglePlaceholder}
                onBlur={togglePlaceholder}
                type="text"
                placeholder="Input value"
                value={before}
                onChange={(event) => handleInputChange(event, 'before')}
                name={name}
                onKeyPress={handleKeyPress}
            />
    );
};

export default Input;