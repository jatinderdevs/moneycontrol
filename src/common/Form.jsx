import { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    error: {},
  };
  handleProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validationSchema = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;
    let errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  HandleChange = (e) => {
    const data = { ...this.state.data };
    const error = { ...this.state.error };
    const errorMessage = this.handleProperty(e.currentTarget);

    if (errorMessage) error[e.currentTarget.name] = errorMessage;
    else delete error[e.currentTarget.name];

    data[e.target.name] = e.target.value;
    this.setState({ data, error });
  };
  HandleSumbit = (e) => {
    e.preventDefault();
    const error = this.validationSchema();
    this.setState({ error: error || {} });

    if (error) return;
    this.doSumbit();
  };
}

export default Form;
