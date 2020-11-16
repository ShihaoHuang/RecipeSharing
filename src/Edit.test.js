import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { MemoryRouter, Route} from "react-router-dom";
import { createServer } from "miragejs";
import { fetchAllRecipes } from "./api.js";
import EditForm from "./EditForm.js";

let server;

beforeEach(() => {
  server = createServer({
    routes() {
      this.namespace = "";
      this.logging = false;

      this.get("/recipes", (schema, request) => {
        return [
          {
            id: 1,
            name: "Steamed Rice",
            steps: ["Make the rice", "Steam it"],
          },
          {
            id: 2,
            name: "Fried Chicken",
            steps: ["Make the chicken", "Deep fry it"],
          },
          {
            name: "Fried Chicken 2",
            steps: ["Fry the chicken"],
            id: 6,
          },
        ];
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});


test("testing step info", async () => {
    const recipes = await fetchAllRecipes();
    function fakeEdit() {
      return false;
    }
    const { queryAllByTestId} = render(
      <MemoryRouter initialEntries={["edit/2"]}>
        <Route path="edit/:id">
          <EditForm recipes={recipes} editRecipe={fakeEdit}></EditForm>
        </Route>
      </MemoryRouter>
    );
  
    const steps = queryAllByTestId("step");
    const stepInfo = steps.map(step=>{
        return step.value;
    });
    expect(stepInfo).toEqual(["Make the chicken", "Deep fry it"]);

  });

test("testing adding steps", async () => {
  const recipes = await fetchAllRecipes();
  function fakeEdit() {
    return false;
  }
  const {  queryAllByTestId, getByTestId } = render(
    <MemoryRouter initialEntries={["edit/2"]}>
      <Route path="edit/:id">
        <EditForm recipes={recipes} editRecipe={fakeEdit}></EditForm>
      </Route>
    </MemoryRouter>
  );

  const btns = queryAllByTestId("delete-btn");
  expect(btns.length).toEqual(2);
  fireEvent.click(getByTestId("add-btn"));
  const btns2 = queryAllByTestId("delete-btn");
  expect(btns2.length).toEqual(3);
});

test("testing delete steps", async () => {
    const recipes = await fetchAllRecipes();
    function fakeEdit() {
      return false;
    }
    const { queryAllByTestId, getByTestId } = render(
      <MemoryRouter initialEntries={["edit/2"]}>
        <Route path="edit/:id">
          <EditForm recipes={recipes} editRecipe={fakeEdit}></EditForm>
        </Route>
      </MemoryRouter>
    );

  const btns = queryAllByTestId("delete-btn");
  expect(btns.length).toEqual(2);
  fireEvent.click(getByTestId("add-btn"));
  const btns2 = queryAllByTestId("delete-btn");
  expect(btns2.length).toEqual(3);
  fireEvent.click(queryAllByTestId("delete-btn")[0]);
  const btns3 = queryAllByTestId("delete-btn");
  expect(btns3.length).toEqual(2);
});
