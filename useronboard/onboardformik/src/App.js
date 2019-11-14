import React from "react";
import "./App.css";
import { Forms } from "./Forms";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { FormsWithFormik } from "./Forms";

function App() {
  return (
    <div className="App">
      <FormsWithFormik />
    </div>
  );
}

export default App;
