import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from "react-router-dom";
import Button from './Button'
export default function SearchBar(){
    const {result} = useParams();
    const [searchWord, setSearchWord] = useState("");
    const history = useHistory();
    useEffect(() => {
        console.log(result)
        if (result){
            setSearchWord(result);
            console.log(result)
        }
    }, [result])
    const [searchText, setSearchText] = useState("")
    function handleStateChange(event){
        setSearchText(event.target.value)
    }
    function handleOnSubmit(event){
        event.preventDefault();
        history.push(`../results/${searchText}`)
    }

    function clickSubmit(){
        history.push(`../results/${searchText}`)
    }

    return <>
    <div className = "search-form">
    <form  onSubmit={handleOnSubmit}>
        <input className = "search-input" value={searchText} onChange={handleStateChange}></input>
        {/* <Button buttonStyle={""} buttonType={"submit"} contentStyle={""} buttonContent={""} onClickFunction></Button> */}
        <i class="fa fa-search" onClick={clickSubmit} ></i>
        
         
        
    </form>
    
    </div>
 
    {result && <div>results for "{searchWord}"</div>}
        {result === "" && <div>results for ""</div>}
    </>
    
}