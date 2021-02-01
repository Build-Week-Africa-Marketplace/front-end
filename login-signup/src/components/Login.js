import React, { useState, useEffect } from "react";
import Input from "./Input";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Login() {
  const defaultState = {
    name: "",
    password: "",
  };

  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({ ...defaultState, terms: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  let formSchema = yup.object().shape({
    name: yup.string().required("Please provide name."),
    password: yup.string().required("Please make a new password."),
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => setButtonDisabled(!valid));
  }, [formState]);

  // onSubmit function
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted!", formState);
    axios
      .post("https://reqres.in/api/users", formState)
      .then(() => console.log("form submitted success"))
      .catch((err) => console.log(err));
  };

  //validate whether value meets schema
  const validateChange = (e) => {
    //this allows react to keep the event object to play nice with async op
    //reach allows us to check a specific value of the schema
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) =>
        setErrors({
          ...errors,
          [e.target.name]: "",
        })
      )
      .catch((error) =>
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0],
        })
      );
    e.persist();
  };

  // onChange function
  const inputChange = (e) => {
    //   const value =
    //     e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    validateChange(e);
  };

  return (
    <form onSubmit={formSubmit}>
      {/* <Link to="/">
        <Button variant="contained">Back</Button>
      </Link> */}
      <Button to= "/" component={Link}  variant="contained">Back</Button>
      <Input
        type="text"
        name="name"
        onChange={inputChange}
        value={formState.name}
        label="Name"
        errors={errors}
      />
      <Input
        type="password"
        name="password"
        onChange={inputChange}
        value={formState.password}
        label="Password"
        errors={errors}
      />
      <button disabled={buttonDisabled}>Login</button>
    </form>
  );
}
