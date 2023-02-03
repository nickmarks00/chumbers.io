import React, { useState } from "react";
import $ from "jquery";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import toast from "react-hot-toast";

import Button from "../components/Button";
import Loader from "../components/Loader";
import Seo from "../components/SEO";

import { sanitize } from "../lib/sanitize";

const Signup = () => {
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_EMBED_URL;

  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={(props) => {
        const { subscribe, status, message } = props || {};
        return (
          <SignupForm
            status={status}
            message={message}
            onValidated={(formData) => {
              subscribe(formData);
            }}
          />
        );
      }}
    />
  );
};

const SignupForm = ({ status, message, onValidated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFocus = (e) => {
    $(e.target)
      .closest(".float-label-field")
      .addClass("float")
      .addClass("focus");
  };

  const handleBlur = (e) => {
    $(e.target).closest(".float-label-field").removeClass("focus");
    if (!$(e.target).val()) {
      $(e.target).closest(".float-label-field").removeClass("float");
    }
  };

  //   const handleInputKeyEvent = (event) => {
  //     setError(null);
  //     // Number 13 is the "Enter" key on the keyboard
  //     if (event.keyCode === 13) {
  //       // Cancel the default action, if needed
  //       event.preventDefault();
  //       console.log(event);
  //       // Trigger the button element with a click
  //       onSubmit(event.target.form);
  //     }
  //   };

  const onSubmit = async (e) => {
    setLoading(true);
    setError(null);

    e.preventDefault();

    const form = new FormData(e.target);
    const { email, firstName, lastName } = Object.fromEntries(form.entries());

    const isFormValidated = onValidated({
      EMAIL: email,
      FNAME: firstName,
      LNAME: lastName,
    });

    try {
      document.getElementById("signupForm").reset();
      $(".float-label-field").removeClass("float");
    } catch (e) {
      console.log(e);
    }

    setLoading(false);

    // On success return true
    return email && firstName && email.indexOf("@") > -1 && isFormValidated;
  };

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
    <>
      <Seo title="Newsletter Sign-up" />
      <article className="bg-white lg:px-48 px-12 py-16">
        <h2 className="text-2xl font-display font-bold">
          Sign-up for a weekly newsletter.
        </h2>
        <header className="my-3">
          <p className="mb-4">
            Each week I&apos;m collating the different blogs and essays
            I&apos;ve written during that week and shipping it out along with
            some other miscellaneous thoughts and ideas.
            <br></br>
            <br></br>
            Particularly whilst I am overseas in 2023, it is a useful way for me
            to capture what each week was like in the moment, along with serving
            as a very direct and public way of enforcing the routinely practice
            of sitting down to write.
            <br></br>
            <br></br>
            It is really nothing special. Just stuff I&apos;m passionate about.
          </p>

          <p className="mt-6 font-display font-bold text-lg">
            View previous editions on{" "}
            <a
              href="https://chumbers.io/categories/newsletter"
              className="underline--magical"
              target="_blank"
              rel="noreferrer"
            >
              here on my website
            </a>{" "}
            or on the{" "}
            <a
              className="underline--magical"
              target="_blank"
              rel="noreferrer"
              href="https://us12.campaign-archive.com/home/?u=ae8043f0d332135e9a03c7190&id=1fa8b7342c"
            >
              email archive
            </a>
            .
          </p>
        </header>
        <section className="flex-col w-full mt-8">
          <p className="my-3 italic text-gray-600 text-sm">
            (* indicates required)
          </p>
          <form onSubmit={onSubmit} id="signupForm">
            <fieldset className="float-label-field">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                name="email"
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
            </fieldset>

            <div className="flex">
              <fieldset className="float-label-field w-full mr-1">
                <label htmlFor="txtFirstName">First name*</label>
                <input
                  id="txtFirstName"
                  type="text"
                  name="firstName"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
              </fieldset>
              <fieldset className="float-label-field w-full ml-1">
                <label htmlFor="txtLastName">Last name</label>
                <input
                  id="txtLastName"
                  type="text"
                  name="lastName"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </fieldset>
            </div>
            {!loading && <Button buttonText={"Subscribe"} className="py-2" />}
          </form>
          <div className="min-h-42px">
            {"sending" === status ? <Loader className="mt-12" /> : null}
            {"error" === status || error ? (
              <div
                className="text-red-600 pt-4"
                dangerouslySetInnerHTML={{
                  __html: error || getMessage(message),
                }}
              />
            ) : null}
            {"success" === status && "error" !== status && !error && (
              <div
                className="text-green-600 font-bold pt-4"
                dangerouslySetInnerHTML={{ __html: sanitize(message) }}
              />
            )}
          </div>
        </section>
      </article>
    </>
  );
};

export default Signup;
