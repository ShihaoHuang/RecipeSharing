import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { findRecipe } from "./helpers.js";
import Button from "./Button";
export default function Email({ recipes, id }) {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [showReceive, setShow] = useState(false);

  function sendEmail(e) {
    e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it
    var templateParams = {
      to_name: name,
      message: content,
      to_email: email,
      from_name: "Shihao Huang",
    };

    if (!email) {
      setError(true);
    } else {
      emailjs
        .send(
          "shihao_huang",
          "template_uvw6er6",
          templateParams,
          "user_El2vTnenZwsJ2zjZgOB4G"
        )
        .then(
          (result) => {
            alert("email sent successfully");
            window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
          },
          (error) => {
            alert("email didn't send successfully");
            console.log(error.text);
          }
        );
    }
  }
  function getContent() {
    const recipe = findRecipe(recipes, id);
    var content = "How to Make ";
    content += recipe.name + "? <br></br> ";

    recipe.steps.forEach((step, i) => {
      content += i + 1;
      content += ". ";
      content += step;
      content += "; <br></br>";
    });
    setContent(content);
  }
  useEffect(() => {
    if (recipes) {
      getContent();
    }
  }, []);
  function changeName(e) {
    setName(e.target.value);
  }
  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function show() {
    setShow(!showReceive);
  }

  return (
    <>
      <Button
        buttonStyle={"text-light bg-dark center mt-5"}
        testId={"toggle-btn"}
        onClickFunction={show}
        buttonContent={<strong>Want to Receive a Recipe?</strong>}
      ></Button>

      {showReceive && (
        <form
          className="contact-form mt-3 center x-center"
          onSubmit={sendEmail}
        >
          <div className="center">
            <label>Name</label>
            <input
              type="text"
              data-testid="field"
              className="input-form-style ml-1 mr-3 center"
              onChange={changeName}
              name="from_name"
            />
            <label>Email</label>
            <input
              type="email"
              data-testid="field"
              className="input-form-style ml-1 mr-2 center"
              onChange={changeEmail}
              name="from_email"
            />
            {error && <div className="text-danger">Email cannot be empty</div>}
          </div>

          <Button
            buttonStyle={"submit-btn p-2 mt-3"}
            contentStyle={""}
            buttonContent={"submit"}
          ></Button>
        </form>
      )}
    </>
  );
}
