// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import { render} from "@testing-library/react";

import { MemoryRouter, Route } from "react-router-dom";
import { createServer } from "miragejs";
import {fetchAllRecipes} from "./api.js"
import Posts from './Posts'
import {matches} from './helpers'


let server;


beforeEach(() => {
  server = createServer({
    routes() {
      this.namespace = "";
      this.logging = false;

      this.get("/recipes", (schema, request) => {
        return (
          [
            {
              "id": 1,
              "name": "Steamed Rice",
              "steps": [
                "Make the rice",
                "Steam it"
              ]
            },
            {
              "id": 2,
              "name": "Fried Chicken",
              "steps": [
                "Make the chicken",
                "Deep fry it"
              ]
            },
            {
              "name": "Fried Chicken 2",
              "steps": [
                "Fry the chicken"
              ],
              "id": 6
            }
          ]
        )
          
        
      });
    },
  });



});

afterEach(() => {
  server.shutdown();
});






test("fething api posts length", async() => {
  
  const recipes = await fetchAllRecipes();

  function filterSearchResults(word) {
    const toFind = word.toLowerCase();
    const newList = recipes.filter((post) => {
      return matches(post.name, toFind);
    });
    return newList;
  }

  const {  queryAllByTestId} = render(
      <MemoryRouter initialEntries={['results/chicken']}>
      <Route path='results/:result'>
        <Posts PostList={recipes} filterSearchResults={filterSearchResults}></Posts>

      </Route>
    </MemoryRouter>
    
  );



  const posts = queryAllByTestId("post");
  expect(posts.length).toEqual(2);


});

test("rendering posts names", async() => {
  
  const recipes = await fetchAllRecipes();

  function filterSearchResults(word) {
    const toFind = word.toLowerCase();
    const newList = recipes.filter((post) => {
      return matches(post.name, toFind);
    });
    return newList;
  }

  const { queryAllByTestId} = render(
      <MemoryRouter initialEntries={['results/chicken']}>
      <Route path='results/:result'>
        <Posts PostList={recipes} filterSearchResults={filterSearchResults}></Posts>

      </Route>
    </MemoryRouter>
    
  );

  const posts = queryAllByTestId("post");

  const receivedPostNames = posts.map((post)=>{
    return post.textContent;
  })
  const postNames = ["Fried Chicken","Fried Chicken 2"];
  expect(receivedPostNames).toEqual(postNames);

});

test("testing different search", async() => {

  
  const recipes = await fetchAllRecipes();

  function filterSearchResults(word) {
    const toFind = word.toLowerCase();
    const newList = recipes.filter((post) => {
      return matches(post.name, toFind);
    });
    return newList;
  }

  const {  queryAllByTestId } = render(
      <MemoryRouter initialEntries={['results/2']}>
      <Route path='results/:result'>
        <Posts PostList={recipes} filterSearchResults={filterSearchResults}></Posts>

      </Route>
    </MemoryRouter>
    
  );

  const posts = queryAllByTestId("post");

  const receivedPostNames = posts.map((post)=>{
    return post.textContent;
  })
  const postNames = ["Fried Chicken 2"];
  expect(receivedPostNames).toEqual(postNames);

});


