import React, { useEffect, useState, CSSProperties  } from 'react'
import { useParams } from 'react-router-dom'
import Bookcard from '../Components/Bookcard'
import BounceLoader from "react-spinners/BounceLoader";

export default function Searchres() {

    const [obj,setobj] = useState([])

    let [loading, setLoading] = useState(false);

    let params = useParams()

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    },[params.res])


    const getsearchedbooks = async () => {
        const data = await fetch(`https://openlibrary.org/search.json?q=${params.res}&limit=21`)
        const res = await data.json()
        console.log(res)
        setobj(res.docs)
    }
  
    useEffect(() => {
        getsearchedbooks();
    },[params.res])

  return (
    <>
    <h1 className='text-black tsh font-thin sm:text-2xl text-3xl text-center m-auto my-5'>... Your searched {params.id} books are below ...</h1>

    {
        loading ? 
         <BounceLoader 
          color={'#ffbf00'}
          loading={loading}
          size={50}
          className='text-center items-center justify-center m-auto'
        /> : 
        <>
    <div className="grid lg:grid-cols-3 lg:mx-auto sm:ml-3 md:grid-cols-2 sm:grid-cols-1">
        {obj.map(books => {
            return(
            <div key={books.cover_edition_key} className='m-auto'> 
                <Bookcard title={books.title} coverb={books.cover_i} author={books.author_name[0]} publish={books.first_publish_year} sub={(books.subject)?books.subject[0]:"N/A"} res={books.cover_edition_key} />
            </div>
        )})}
    </div>
        </>
    }
</>
  )
}
