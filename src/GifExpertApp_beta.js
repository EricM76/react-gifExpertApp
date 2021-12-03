import React, { useState } from 'react'

export default function GifExpertApp_beta() {

    const [categories, setCategories] = useState(['X-men', 'Liga de la justicia', 'Advengers']);

    const handleAdd = () => {
        setCategories([...categories,'El chavo del 8']);
    }

    return (
        <>
            <h2>GifExpertApp</h2>
            <hr />
            <button onClick={handleAdd}>Agregar</button>
            <ol>
                {categories.map((category, index) => <li key={index}>{category}</li>)}
            </ol>
        </>
    )
}
