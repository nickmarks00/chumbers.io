import React from "react";

const Inputfield = ({
  type,
  label,
  placeholder,
  btnLabel,
  isEmail,
  id,
  className,
}) => {
  return (
    <div
      className={`input-container grid justify-items-center mt-6 container rounded-md ${
        className ? className : ""
      }`}
    >
      <input className="c-checkbox rounded-md" type="checkbox" id={id} />
      <div className="c-formContainer">
        <form className="c-form rounded-md" action="">
          <input
            className="c-form__input"
            placeholder={placeholder}
            type={type}
            pattern={
              isEmail
                ? "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{1,63}$"
                : undefined
            }
            required
            disabled
          />
          <label className="c-form__buttonLabel" htmlFor={id}>
            <button
              className="c-form__button btn-black mr-1 mb-2"
              type="button"
              name={id}
            >
              {btnLabel}
            </button>
          </label>
          <label
            className="c-form__toggle rounded-md transition duration-100 ease-in hover:bg-teal hover:opacity-50"
            htmlFor={id}
            data-title={label}
          >
            <input type="text" className="hidden" />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Inputfield;
