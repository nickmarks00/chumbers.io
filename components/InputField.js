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
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full mb-1 h-12 font-bold text-sm md:text-md  focus:ring-2 focus:ring-teal rounded-md transform transition duration-200 hover:ring-2 hover:ring-teal overflow-hidden bg-white"
    >
      <input
        type={type}
        placeholder={placeholder}
        className={`border-0 grow h-full px-2 focus:outline-none inputForm font-bold  ${className}`}
        onChange={onChange}
        onKeyUp={onKeyUp}
        disabled={disabled}
        id={id}
      />
      <Button buttonText={btnLabel} className="mr-4" />
    </form>
  );
};

export default InputField;
