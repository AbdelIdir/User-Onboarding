import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import uuid from "uuid";

// - Name
// - Email
// - Password
// - Terms of Service (checkbox)
// - A Submit button to send our form data to the server.

export const Forms = ({ erros, touched, values, status }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    status && setUser(user => [...user, status]);
  }, [status]);

  return (
    <div className="div-formik">
      <Form className="formik">
        <ErrorMessage name="fname" render={errormess => <p>{errormess}</p>} />

        <label>
          Name
          <Field
            type="text"
            name="fname"
            placeholder="enter your name"
            className="div-formik"
          />
        </label>

        <ErrorMessage name="email" renderr={errormess => <p>{errormess}</p>} />
        <label>
          Email
          <Field
            type="email"
            name="email"
            placeholder="enter your email"
            className="div-formik"
          />
        </label>

        <ErrorMessage name="pass" render={errormess => <p>{errormess}</p>} />
        <label>
          Password
          <Field
            type="password"
            name="pass"
            placeholder="enter your password"
            className="div-formik"
          />
        </label>

        <ErrorMessage name="tos" render={errormess => <p>{errormess}</p>} />
        <label>
          Terms of Service
          <Field type="checkbox" name="tos" className="div-formik" />
        </label>

        <ErrorMessage
          name="role"
          render={errormess => <p className="role-error">{errormess}</p>}
        />
        <label>
          Select a Role:
          <Field as="select" name="role" className="div-formik">
            <option>Select an option</option>
            <option>Front end</option>
            <option>Back end</option>
            <option>Full Stack</option>
          </Field>
        </label>
        <input type="submit" className="button-input" />
      </Form>

      {user &&
        user.map((auser, i) => {
          return (
            <div className="newcards">
              <ul key={i}>
                <li> User id = {uuid()}</li>
                <li> Name: {auser.fname}</li>

                <li> Email: {auser.email}</li>

                <li> Password: {auser.pass}</li>

                <li>
                  Terms of Service:
                  {auser.tos == true ? (
                    <span> User agreed to our terms</span>
                  ) : (
                    <span>User has not agreed with our terms and services</span>
                  )}
                </li>
                <li>Role: {auser.role}</li>
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export const FormsWithFormik = withFormik({
  mapPropsToValues() {
    return {
      role: "",
      fname: "",
      email: "",
      pass: "",
      tos: false
    };
  },

  validationSchema: Yup.object().shape({
    role: Yup.string()
      .oneOf(["Front end", "Back end", "Full Stack"])
      .required("Please select a Role"),
    fname: Yup.string().required("Please enter your first name"),
    email: Yup.string().required("Please enter your email"),
    pass: Yup.string().required("Please enter a password"),
    tos: Yup.boolean().required("Pick an option")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)

      .then(res => {
        setStatus(res.data);
        //  tools.resetForm();
      })
      .catch(err => {
        alert(err);
      });
  }
})(Forms);
