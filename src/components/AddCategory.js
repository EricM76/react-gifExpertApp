import React, { useState } from 'react';

import PropTypes from 'prop-types';

export const AddCategory = ({ setCategories }) => {

    const [inputValue, setinputValue] = useState(''); //si no pongo un string vacío, el estado será undefined

    const handleInputChange = e => {
        setinputValue(e.target.value)
    }

   /*  const handleSubmit_beta = e => {
        e.preventDefault();
        setCategories([...categories, e.target.elements[0].value])
    } */

    /* puedo llamar a método setCategories pasandole como argumento un callback */
    const handleSubmit = e => {
        e.preventDefault();

        if(inputValue.trim().length > 2){
            /* primero inserto lo agregado y luego muestro lo existente*/
            setCategories(categories => [inputValue, ...categories]);
            setinputValue('')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
        </form>
    )
}

AddCategory.propTypes = {
    setCategories : PropTypes.func.isRequired
}
