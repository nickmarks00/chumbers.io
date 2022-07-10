import React from "react";
import Link from "next/link";

const Button = ({
  buttonText,
  href = null,
  className,
  style,
  type = "submit",
}) => {
  if (href) {
    return (
      <div className="notfound">
        <Link href={href}>
          <a className="bg-white">{buttonText}</a>
        </Link>
      </div>
    );
  }

  return (
    <div className={`buttonContainer ${className}`} style={style}>
      <button type={type} className="uppercase p-2">
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
