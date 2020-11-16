// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import { render } from "@testing-library/react";

import { MemoryRouter, Route } from "react-router-dom";
import { createServer } from "miragejs";
import { fetchAllRecipes } from "./api.js";

import Detail from "./Detail";

let server;

beforeEach(() => {
  server = createServer({
    routes() {
      this.namespace = "api";
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

test("testing detail name rendering", async () => {
  const recipes = await fetchAllRecipes();

  function fakeDelete() {
    return false;
  }
  const { getByTestId } = render(
    <MemoryRouter initialEntries={["detail/1"]}>
      <Route path="detail/:id">
        <Detail recipes={recipes} destroyRecipe={fakeDelete}></Detail>
      </Route>
    </MemoryRouter>
  );

  const received = getByTestId("post-name").textContent;

  expect(received).toEqual("Steamed Rice");
});

test("testing detail steps rendering", async () => {
  const recipes = await fetchAllRecipes();

  function fakeDelete() {
    return false;
  }
  const { queryAllByTestId } = render(
    <MemoryRouter initialEntries={["detail/1"]}>
      <Route path="detail/:id">
        <Detail recipes={recipes} destroyRecipe={fakeDelete}></Detail>
      </Route>
    </MemoryRouter>
  );

  const received = queryAllByTestId("steps");
  const steps = ["Make the rice", "Steam it"];

  const receivedSteps = received.map((step) => {
    return step.textContent;
  });

  expect(receivedSteps).toEqual(steps);
});
