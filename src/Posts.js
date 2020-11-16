import React, {useState, useEffect} from 'react'
import {mapElement} from './helpers'
import Post from './Post'
import {
   useParams
  } from "react-router-dom";

export default function Posts({postList, filterSearchResults}){
    const {result} = useParams()
    const [results, setResults] = useState(postList)

    
    useEffect(() => {
        if (result){
            const currentResults = filterSearchResults(result);
            setResults(currentResults);
        }else{
            setResults(postList);
        }
        
    }, [result])

    function renderPostFunction(post){
        return <>
            
           
            <div className="container border-bottom mb-3">
                <Post key={post.id} picture={post.image} content={post.name} id={post.id}></Post>
            </div>
            
        </>
    }
    return <>
       
        
        {results && mapElement(results, renderPostFunction)}
    </>
}
