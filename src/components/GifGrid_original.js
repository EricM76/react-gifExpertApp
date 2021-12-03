import React, { useState, useEffect } from 'react';
import { getGif } from '../helpers/getGifs';
import { useFetchGifs } from '../hooks/useFetchGifs';
import { GifGridItem } from './GifGridItem';

export const GifGrid = ({ category }) => {

    const [images, setImages] = useState([]);
    
      
    useEffect(() => {
        getGif(category)
            //.then(images => setImages(images))
            .then(setImages)
    }, [category])

    return (
        <>
        <h3>{category}</h3>
        <div className="card-grid">
          
            {/* <ol>
                {
                    images.map(image => (
                        <li key={image.id}>{image.title}</li>
                    ))
                }
            </ol> */}

           {/*  {
                images.map(({id,title}) => (
                    <GifGridItem 
                    title = {title}
                    key = {id}
                    />
                ))
            } */}

            {
                images.map(image => (
                    <GifGridItem 
                    key = {image.id}
                    {...image}
                    />
                ))
            }
        </div>
        </>
    )
}
