import { useEffect, useState } from "react"
import axios from 'axios';
const useFetch = (url)=>{
    const [categories, setCategories] = useState([])  
    const [loading, setLoading] = useState(true)

    const fetchData = async ()=>{
      try{
        setLoading(true)
        const response = await axios(url)
        console.log(response.data)
        setCategories(response.data)
        setLoading(false)
      } catch (error){
        console.log(error.response)
      }
    
    }

    useEffect(()=>{
        fetchData()
    }, [])
    return (
        {categories, loading}
    )
}



export default useFetch;