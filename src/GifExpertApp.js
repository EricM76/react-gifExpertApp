import React, { useState } from 'react'
import { AddCategory } from './components/AddCategory';
import { GifGrid } from './components/GifGrid';

export default function GifExpertApp() {

    const [categories, setCategories] = useState([]);

    return (
        <>
            <h2>GifExpertApp</h2>

            {/* envío la referencia al componente hijo de la función setCategories */}
            <AddCategory setCategories={setCategories} />
            <hr />

            <ol>
                {
                    categories.map((category, index) => (
                        <GifGrid 
                        key = {category}
                        category = {category}
                        />
                    ))
                }
            </ol>
        </>
    )
}
