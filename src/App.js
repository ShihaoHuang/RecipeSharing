import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
// import Button from './Button';
import Brand from "./Brand.js";
import Detail from "./Detail";
import CreateForm from "./CreateForm";
import { Helmet } from "react-helmet";
import Button from './Button'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PageNotFound from "./PageNotFound";
import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";
import Posts from "./Posts.js";
import EditForm from "./EditForm";
import { fetchAllRecipes, saveRecipe, deleteRecipe } from "./api";
import RandomSearch from "./RandomSearch";
import { recipeReducer } from "./reducer";
import { matches } from "./helpers.js";
import Modal from "./Modal";


function App() {
  const [modal, setModal] = useState("");
  const [recipes, dispatch] = useReducer(recipeReducer, []);
  function closeModal() {
    setModal("");
  }
  function selectModal(recipe) {
    setModal(recipe);
  }
  function filterSearchResults(word) {
    const toFind = word.toLowerCase();
    console.log(toFind);
    const newList = recipes.filter((post) => {
      return matches(post.name, toFind);
    });
    return newList;
  }

  useEffect(() => {
    fetchAllRecipes().then((data) => {
      dispatch({
        type: "RECIPE_LOADED",
        payload: data,
      });
    });
  }, []);

  function destroyRecipe(id) {
    deleteRecipe(id).then(() => {
      dispatch({
        type: "RECIPE_DELETED",
        payload: {
          id: id,
        },
      });
    });
    alert(`recipe deleted`);
  }

  function editRecipe(recipeToBeEdited, name, steps) {
    saveRecipe({
      id: recipeToBeEdited.id,
      name: name,
      steps: steps,
    }).then((editedRecipe) => {
      dispatch({
        type: "RECIPE_EDITED",
        payload: {  
          editedRecipe,
        },
      });
    });
    alert(`recipe ${recipeToBeEdited.name} edited`);
    console.log(recipes)
    window.location.href = `/detail/${recipeToBeEdited.id}`;
  }

  function createRecipe(name, steps) {
    saveRecipe({
      name: name,
      steps: steps,
    }).then((newRecipe) => {
      dispatch({
        type: "RECIPE_CREATED",
        payload: {
          newRecipe,
        },
      });
    });
    alert(`recipe ${name} created`);
    window.location.href = "/search";
  }

  function startClick(){
    window.location.href = "/search";
  }

  return (
    <>
        {modal !== "" && <Modal recipes={recipes} number = {modal-1} onClose={closeModal}></Modal>}
        <Router>

          <div className="center divider mt-3 pb-3">
          <Brand></Brand>
            <MenuBar></MenuBar>
          </div>

          <Switch>
            <Route path="/home" exact={true}>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
              </Helmet>

                <Button buttonStyle={"center start all-center"} buttonType={"button"} contentStyle={""} buttonContent={"Getting Started"} onClickFunction={startClick}></Button>

   

            </Route>
            <Route path="/search" exact={true}>
              <div className=" container all-center">
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>Search</title>
                </Helmet>
                <div className="">
                  <SearchBar></SearchBar>
                <RandomSearch
                  recipes={recipes}
                  openModal={selectModal}
                ></RandomSearch>
                </div>
                
              </div>
              
            </Route>
            <Route path={["/results/:result", "/results"]} exact={true}>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Search Results</title>
              </Helmet>
              
              <div className="container mt-5">
                <SearchBar></SearchBar>
                <div className="mt-5">
                  <Posts
                    postList={recipes}
                    filterSearchResults={filterSearchResults}
                  ></Posts>
                </div>
                
              </div>
            
            </Route>
            <Route path="/detail/:id" exact={true}>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Recipe Detail</title>
              </Helmet>
              {recipes.length !== 0 && (
                <Detail
                  recipes={recipes}
                  destroyRecipe={destroyRecipe}
                ></Detail>
              )}
            </Route>
            <Route path="/create" exact={true}>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Create Recipe</title>
              </Helmet>
              {recipes.length !== 0 && (
                <CreateForm createRecipe={createRecipe}></CreateForm>
              )}
            </Route>
            <Route path="/edit/:id" exact={true}>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Edit Recipe</title>
              </Helmet>
              {recipes.length !== 0 && (
                <EditForm recipes={recipes} editRecipe={editRecipe}></EditForm>
              )}
            </Route>

            <Route
              path="/"
              exact={true}
              component={() => {
                window.location.href = "/home";
                return null;
              }}
            />
            <Route path="*">
              <Helmet>
                <meta charSet="utf-8" />
                <title>Page Not Found</title>
              </Helmet>
              <PageNotFound></PageNotFound>
            </Route>
          </Switch>
        </Router>
    </>
  );
}

export default App;
