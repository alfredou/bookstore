import axios from 'axios'
import { useEffect, useState } from "react"
import { transformGoogleResponse } from '../services/bookMapper';

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [text, setText] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(url)
                const isSingleBook = url.includes('q=isbn:');
                const mappedData = transformGoogleResponse(res.data, isSingleBook);
                
                if (mappedData.books && mappedData.books.length === 0) {
                    setText('No more data available')
                    return
                } 
                setData(mappedData)
                setHasMore(mappedData.books ? mappedData.books.length > 0 : false)
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        fetchData()
        //si quitamos la url del array de dependencias podemos buscar el hotel con el valor minimo y maximo al presionar el boton search
    }, [url])

    const reFetch = async () => {
        //actualiza el estado loading a true, nos sirve para cuando no se han cargado los datos, si no se ha hecho la petición, 
        //podemos utilizarlo para mostrar loading cuando no se han cargado los datos
        setLoading(true)
        try {
            //hara la petición otra vez y actualizara el estado de data
            const res = await axios.get(url)
            const isSingleBook = url.includes('q=isbn:');
            const mappedData = transformGoogleResponse(res.data, isSingleBook);
            setData(mappedData)
            //si ocurre un error actualiza el estado del error
        } catch (err) {
            //actualiza el estado error con el error ocurrido si no se realiza la petición
            setError(err)
        }
        //actualiza el estado loading a false
        setLoading(false)
    }
    return { data, loading, error, hasMore, reFetch, text }
}
export default useFetch