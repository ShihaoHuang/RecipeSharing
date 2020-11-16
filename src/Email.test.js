// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createServer } from "miragejs";
import { fetchAllRecipes } from "./api.js";
import Email from "./Email";

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

test("testing email toggle show", async () => {
  const recipes = await fetchAllRecipes();

  const { queryAllByTestId, getByTestId } = render(
    <Email recipes={recipes} id={2}></Email>
  );

  fireEvent.click(getByTestId("toggle-btn"));
  const received = queryAllByTestId("field");
  expect(received.length).toEqual(2);
});

test("testing email toggle hide", async () => {
  const recipes = await fetchAllRecipes();

  const { queryAllByTestId, getByTestId } = render(
    <Email recipes={recipes} id={2}></Email>
  );

  fireEvent.click(getByTestId("toggle-btn"));
  const received = queryAllByTestId("field");
  expect(received.length).toEqual(2);
  fireEvent.click(getByTestId("toggle-btn"));
  const hide = queryAllByTestId("field");
  expect(hide.length).toEqual(0);
});
