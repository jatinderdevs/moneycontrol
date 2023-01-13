import React from "react";

const Input = ({
  name,
  type,
  style,
  placeholder,
  icon,
  onChange,
  error,
  value,
}) => {
  return (
    <div className="form-group text-capitalize">
      <label htmlfor="exampleInputEmail1 ">{name}</label>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text bg-transparent">
            {" "}
            <i className={icon}></i>
          </div>
        </div>

        <input
          type={type}
          className={`txtbox ${error ? "border-danger" : ""}`}
          style={style}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
        {<span className="text-danger">{error}</span>}
      </div>
    </div>
  );
};

export default Input;
