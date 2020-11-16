import React, {useEffect, useState} from "react"
import { useParams  } from "react-router-dom";
import Button from "./Button.js";
import {findRecipe} from './helpers.js'
export default function EditForm({recipes, editRecipe}){
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [stepError, setStepError] = useState([{ value: false }]);
    const [steps, setSteps] = useState([{ value: null }]);
    const {id} = useParams();
    const [recipe, setRecipe] = useState({});

  function handleChange(i, event) {
    const values = [...steps];
    values[i].value = event.target.value;
    setSteps(values);
  }

  function handleAdd() {
    const values = [...steps];
    values.push({ value: null });
    const errors = [...stepError];
    errors.push({ value: false});
    setStepError(errors)
    setSteps(values);
  }

  function handleRemove(i) {
    const values = [...steps];
    values.splice(i, 1);
    setSteps(values);
    const errors = [...stepError];
    errors.splice(i, 1);
    setStepError(errors);
  }



    function handleSubmit(event){
      event.preventDefault();
      const modified = steps.map((step)=>{
        return step.value;
      })
      if (!checkInputs()){
        editRecipe(recipe, name, modified);
      }
      

    }
    function checkInputs(){
      var isError = false;
      if (!name){
        setNameError(true);
        isError = true;
      }else{
        setNameError(false);
      }
      const errors = [...stepError];
      steps.forEach((step, idx)=>{        
        if (step.value){
          errors[idx].value= false;
        }else{
          errors[idx].value= true;
          isError = true
        }
      })
      setStepError(errors)
      return isError;
    }
    function handleNameChange(event){
        setName(event.target.value)
    }

    useEffect(()=>{
      
      const foundRecipe = findRecipe(recipes, id);
      setRecipe(foundRecipe)
      
      const current = [...steps];
      setName(foundRecipe.name)
      const errors = [...stepError];

      for (var i = current.length; i < foundRecipe.steps.length; i++){
          current.push({ value: null });
          errors.push({value:false});
      }

      
      
      foundRecipe.steps.forEach((step, i)=>{
          current[i].value = step;
          
          
      })
      setStepError(errors);
      setSteps(current);
    },[])

    return <>









    <form
        className="top-space container col-sm-10 col-md-8 col-lg-6"
        onSubmit={handleSubmit}
      >
        <div className="form-group ">
          <h4 className="ml-3"><strong>Name</strong> </h4>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={handleNameChange}
            className="input-form-style ml-3"
            id="title"
          />
          {nameError && <div className="text-danger ml-3">field cannot be empty</div>}
        </div>
        <div className="form-group">
          <Button
            buttonStyle={"add-btn"}
            buttonType={"button"}
            contentStyle={""}
            testId = {"add-btn"}
            buttonContent={<i className="fas fa-plus">Add Cooking Steps</i>}
            onClickFunction={handleAdd}
          ></Button>

          {steps.map((step, idx) => {
            return (<div key={idx}>
              <div key={`${step}-${idx}`}>
                <input
                  data-testid = "step"
                  type="text"
                  className="input-form-style m-3 col-sm-10 col-md-10 col-lg-10"
                  placeholder={`  step${idx + 1}`}
                  value={step.value || ""}
                  onChange={(e) => handleChange(idx, e)}
                />
                <Button
                  buttonStyle={"delete-btn"}
                  buttonType={"button"}
                  testId = {"delete-btn"}
                  contentStyle={""}
                  buttonContent={<i className="fas fa-trash"></i>}
                  onClickFunction={() => handleRemove(idx)}
                ></Button>
              </div>
              {stepError[idx].value && <div className="text-danger ml-3">field cannot be empty</div>}
              </div>
            );
          })}
        </div>
        <Button
          buttonStyle={"submit-btn center p-2"}
          contentStyle={""}
          buttonContent={"submit"}
          
        ></Button>
      </form>
    </>
}