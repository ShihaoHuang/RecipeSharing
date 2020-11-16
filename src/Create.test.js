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
import CreateForm from "./CreateForm";

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

test("testing add cooking steps", async () => {
  function fakeCreate() {
    return false;
  }
  const { queryAllByTestId, getByTestId } = render(
    <CreateForm createRecipe={fakeCreate}></CreateForm>
  );

  fireEvent.click(getByTestId("add-btn"));
  const btns = queryAllByTestId("delete-btn");
  expect(btns.length).toEqual(2);
  fireEvent.click(getByTestId("add-btn"));
  const btns2 = queryAllByTestId("delete-btn");
  expect(btns2.length).toEqual(3);
});

test("testing delete steps", async () => {
  function fakeCreate() {
    return false;
  }
  const { queryAllByTestId, getByTestId } = render(
    <CreateForm createRecipe={fakeCreate}></CreateForm>
  );

  fireEvent.click(getByTestId("add-btn"));
  const btns = queryAllByTestId("delete-btn");
  expect(btns.length).toEqual(2);
  fireEvent.click(getByTestId("add-btn"));
  const btns2 = queryAllByTestId("delete-btn");
  expect(btns2.length).toEqual(3);
  fireEvent.click(queryAllByTestId("delete-btn")[0]);
  const btns3 = queryAllByTestId("delete-btn");
  expect(btns3.length).toEqual(2);
});
