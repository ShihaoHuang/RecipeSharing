import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from "react-router-dom";
import {findRecipe} from './helpers.js'
import Button from './Button'
import Email from './Email'
export default function Detail({recipes, destroyRecipe}){
    const {id} = useParams();
    const history = useHistory();
    const [recipe, setRecipe] = useState({})
    
    function deleteRecipe(event){
        destroyRecipe(id)
        history.push(`../../`)
    }
    useEffect(()=>{
        const recipe = findRecipe(recipes, id);
        setRecipe(recipe)
    },[id, recipes]);
    function editRecipe(){
        history.push(`../edit/${id}`)
    }

    if (!recipe){
        return <>Recipe Not Found</>
    }
    
    
    else{

        return <>
            
            <div className=" top-space">
                <h3>How to make: <strong><span data-testid="post-name">{recipe && recipe.name}</span></strong></h3>
                    <ol >
                        {recipe.steps && recipe.steps.map((step, idx)=>{
                            return (
                                <li key = {idx} data-testid="steps">
                                    {step}
                                </li>
                            )
                            
                        })}
                    </ol>
                   
                    <Button
                    buttonStyle={"submit-btn"}
                    buttonType={"button"}
                    contentStyle={""}
                    buttonContent={"Edit"}
                    onClickFunction={editRecipe}
                ></Button>
                    <Button
                    buttonStyle={"submit-btn"}
                    buttonType={"button"}
                    contentStyle={""}
                    buttonContent={"Delete"}
                    onClickFunction={deleteRecipe}
                ></Button>
                {recipes && <Email recipes={recipes} id= {id}></Email>}
            </div>

            
  
           
            </>
    
    }

   
}