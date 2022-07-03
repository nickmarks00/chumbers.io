import React, { useState } from "react";
import Loader from "../Loader";
import InputField from "../InputField";

import { sanitize } from "../../lib/sanitize";

const NewsletterForm = ({ status, message, onValidated }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {
    setError(null);

    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email });

    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = (event) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  };

  const handleChange = (event) => {
    setEmail(event?.target?.value ?? "");
  };

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return sanitize(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? sanitize(formattedMessage) : null;
  };

  return (
    <div className="col-span-3 md:col-span-2 items-center flex flex-col text-sm mb-4">
      <h4 className="text-gray-200 uppercase font-semibold">
        Subscribe to receive updates
      </h4>
      <p className="text-gray-200">
        Get the latest posts, articles and series sent directly to your inbox
      </p>
      <div className="mt-2 w-3/4">
        <InputField
          type="email"
          label="Sign me up!"
          placeholder="E-mail"
          btnLabel="subscribe"
          isEmail={true}
          id="footerNotify"
          onChange={(event) => handleChange(event)}
          onKeyUp={(event) => handleInputKeyEvent(event)}
          onSubmit={handleFormSubmit}
        />
      </div>
      <div className="min-h-42px">
        {"sending" === status ? <Loader className="mt-12" /> : null}
        {"error" === status || error ? (
          <div
            className="text-red-400 pt-12"
            dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
          />
        ) : null}
        {"success" === status && "error" !== status && !error && (
          <div
            className="text-green-200 font-bold pt-12"
            dangerouslySetInnerHTML={{ __html: sanitize(message) }}
          />
        )}
      </div>
    </div>
  );
};

export default NewsletterForm;
