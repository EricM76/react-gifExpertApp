# Curso de React (Hooks y MERN) - Fernado Herrera

## SECCIÓN 4: Primeros pasos en React

## ¿Qué aprenderemos en esta sección?

- Custom Hooks
- Fetch hacia un API
- Comunicación entre componentes
- Clases de CSS
- Animaciones
- Enviar métodos como argumentos
- Crear listados
- keys
- Giphy
- Deploy del proyecto en gitPages

_Esta es una aplicación pequeña pero muy ilustrativa que explica cómo utilizar React + customHooks para poder resolver necesidades en específico que podremos re-utilizar después._

## Recursos

- [Giphy]('https://developers.giphy.com/)
- [Animate.css]('https://animate.style/)
- [GitHub]('https://github.com/)

## Documentación

- [Estructura de archivos]('https://es.reactjs.org/docs/faq-structure.html')
- [Structuring projects and naming components in React]('https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76)
- [Servidor para montar un localhost](https://www.npmjs.com/package/http-server)
- [Configuracioń de credenciales en local]('https://docs.github.com/en/enterprise/2.13/user/articles/setting-your-username-in-git)

## Procedimiento

### 1. Crear el componente _GifGridItem_

```
export const GifGridItem = ({title,url}) => {
    return (
        <div>
            <img src={url} alt={title} />
            <p>{title}</p>
        </div>
    )
}
```

- Este componente recibe _title y url_ como **props**

### 2. Crear el componente _GifGrid_

```
import { useFetchGifs } from '../hooks/useFetchGifs';
import { GifGridItem } from './GifGridItem';

export const GifGrid = ({ category }) => {

    const {data:images,loading} = useFetchGifs(category);

    return (
        <>
        <h3>{category}</h3>

        {loading && <p>loading</p>}

        <div className="card-grid">

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

```

- Este componente recibe como **props** la categoría buscada, que a su vez la pasa por parámetro al **custom hook** **useFetchGifs**
- **useFetchGifs** devuelve _data_ y _loading_. En la desestructuración se renombra data por images `const {data:images,loading} = useFetchGifs(category);` para guardar coherencia.
- Si _loading_ es true se mostrará en pantalla **_loading_**
- Cuando el **useFetchGifs** devuelva la información en data, se recorrerá con map utilizando el componente _GifGridItem_ pasándole por **props** todas las propiedades de cada image `{...image}`

```
    { 
        images.map(image => (
            <GifGridItem
            key = {image.id}
            {...image}
            />
        ))
    }
```
### 3. Crear el custom hook *useFetchGifs*
~~~
import { useState, useEffect } from "react";
import { getGif } from '../helpers/getGifs';


export const useFetchGifs = (category) => {

    const [state, setState] = useState({
        data : [],
        loading : true
    })
    
    useEffect(() => {
        getGif(category)
            .then( images => {
                setState({
                    data : images,
                    loading : false
                })
            })
    }, [category])

    return state
}
~~~
- Importo **useState** y **useEffect** de react.
- Se inicializa el estado de este hook con un objeto con las propiedades *data* con un array vacío como valor y *loading* con valor true.
~~~
 const [state, setState] = useState({
        data : [],
        loading : true
    })
~~~
- Importo el helper **getGifs** que hará la consulta a la API
- *useFetchGifs* recibe como parámetro la categoría buscada para ser usada como parámetro del helper **getGif**
- Utilizo useEffect para ejecutar **getGif** cuando la categoría cambie de valor.
- Como **getGif** es una promesa, esta traerá la información que devuelve la API 
- Con la inforamcioń seteo el estado con `setState`.
~~~
    useEffect(() => {
        getGif(category)
            .then( images => {
                setState({
                    data : images,
                    loading : false
                })
            })
    }, [category])
~~~
### 4. Crear el helper *getGif*
~~~
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=bWo4v44iCpufFV5TQfL4zwsKdTHwBPUg&q=${category}&limit=10`;

        const response = await fetch(url);
        const { data } = await response.json();
    
        const gifts = data.map(img => {
            return {
                id: img.id,
                title: img.title,
                url: img.images?.downsized_medium.url
            }
        })
    
        return gifts
    } catch (error) {
        console.log(error)
        return []
    }
~~~
- Este helper es una función asincrónica que recibe como parámetro la categoría buscada
- Hace la petición a la API, extrayendo de la respuesta solo la información necesaria (id, title y url)
- Si el objeto tiene *images* trae el valor de la propiedad *downsized_medium*
- Ua vez creado el array con la información necesaria lo retorna para ser usado por el *custom hook*
### 5. Crear un componente llamado _GifExpertAdd_

```
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

```
- Importo *useState* para inicializar categories con un array vacío (o con un valor inicial)
- Envío como referencia al componente **AddCateory** la función `setCategories` para que cuando reciba una categoría setee el estado inicial de *categories*
- Una vez recibida la informacioń esta se mapea pasándole al componente **GifGrid** la *category*
### 6. Crear el componente _AddCategory_
~~~
import React, { useState } from 'react';

import PropTypes from 'prop-types';

export const AddCategory = ({ setCategories }) => {

    const [inputValue, setinputValue] = useState('');

    const handleInputChange = e => {
        setinputValue(e.target.value)
    }

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

~~~
- Importo *useState* para inicializar *inputValue* con un string vacío para evitar que sea undefined
- Este componente tiene un formulario con un input. El formulario tiene el evento *onSubmit* que ejecutará la función `handleSubmit` y el input el evento *onChange* que ejecutará el función `handleInputChange`
- La función `handleInputChange` setea el estado de *inputValue* con el valor ingresado en el input
- La función `handleSubmit` le pasará al método `setCategories` el valor de *inputValue*.
- Como no recibo las categorias, paso la información en un callbacks, insertando como primer valor del array el *inputValue* y luego utilizando *_spreed operator_* las categorias
## Deploy en GitPages
- Ejecutar el comando `yarn build` o `npm run build`
- Esto creará la carpeta *build* la cual contiene todos los archivos necesarios para deployar
- Renombrar la carpeta *build* por *docs* para facilitarle a GitHub para deployar el proyecto
### Pruebas en local
- Instalar el paquete **http-server** con el siguiente comando `npm install --global http-server`
- Una vez instalado posicionar la terminal en la carpeta *build* y teclear `http-server -o` para levantar el servidor. Esto abrirá el navegador en la ip 127.0.0.0:8080 
