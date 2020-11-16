import React from 'react';
import { useHistory } from "react-router-dom";

export default function Post({picture, content, id}){
    const history = useHistory();
    function handleOnClick(){
        history.push(`../detail/${id}`)
    }
    return <>
        <div key={id} className=" d-flex flex-row justify-content-start">
            <img src={picture} className="" alt=""></img>
            <div className="ml-3 results" data-id={id} data-testid="post"onClick={handleOnClick}>{content}</div>
        </div>
    </>
}