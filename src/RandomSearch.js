import React from "react";
import Button from "./Button.js";
export default function RandomSearch({ recipes, openModal }) {
  function handleOnClick() {
    //fetch a random recipe
    const num = getRndInteger(0, recipes.length);
    openModal(num + 1);
    return "";
  }
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  return (
    <>
      <Button
        buttonStyle={"random-search-btn"}
        contentStyle={""}
        buttonContent="Don't Know What To Eat?"
        onClickFunction={handleOnClick}
      ></Button>
    </>
  );
}
