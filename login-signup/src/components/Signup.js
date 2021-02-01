import React, { useState, useEffect } from "react";
import Input from "./Input";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Signup() {
  const defaultState = {
    name: "",
    password: "",
    location: "",
    accountType: "",
    terms: false,
  };

  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({ ...defaultState, terms: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  let formSchema = yup.object().shape({
    name: yup.string().required("Please provide name."),
    password: yup.string().required("Please make a new password."),
    location: yup.string().optional("This is oaptional."),
    accountType: yup.string().required("Are you a seller or a buyer."),
    terms: yup
      .boolean()
      .oneOf([true], "Please agree to the terms and conditions"),
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
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
    validateChange(e);
  };

  return (
    <form onSubmit={formSubmit}>
      {/* <Link to="/">
        <Button variant="contained">Back</Button>
      </Link> */}
      <Button to= "/" component={Link} variant="contained">Back</Button>

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
      <Input
        type="text"
        name="location"
        onChange={inputChange}
        value={formState.location}
        label="Location"
        errors={errors}
      />
      <label htmlFor="accountType">
        <select name="accountType" onChange={inputChange}>
          <option value="">--Please choose an option--</option>
          <option value="Seller">Seller</option>
          <option value="Buyer">Buyer</option>
        </select>
      </label>
      <label className="terms" htmlFor="terms">
        <input name="terms" type="checkbox" onChange={inputChange} />
        Terms and Conditions
      </label>
      <Button variant="contained" disabled={buttonDisabled}>
        Submit
      </Button>
    </form>
  );
}
