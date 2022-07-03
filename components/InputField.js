import React from "react";

import Button from "./Button";

const InputField = ({
  type,
  label,
  placeholder,
  btnLabel,
  id,
  className,
  onChange,
  onKeyUp,
  onSubmit,
  disabled = false,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full mb-1 px-3 py-4 w-full font-bold text-sm focus:outline-none focus:ring focus:ring-primary rounded-md ${className}`}
        onChange={onChange}
        onKeyUp={onKeyUp}
        disabled={disabled}
        id={id}
      />
      <Button
        buttonText={btnLabel}
        className="absolute "
        style={{ right: "7rem" }}
      />
    </form>
  );
};

export default InputField;
