import React from "react";
import $ from "jquery";
import Seo from "../components/SEO";

const contact = () => {
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

  const onSubmit = (e) => {
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    console.log(formData);
  };

  return (
    <>
      <Seo title="Contact" />
      <article className="bg-white px-48 py-16">
        <h2 className="text-2xl font-display font-bold">Get in touch.</h2>
        <section className="flex-col w-full mt-8">
          <form onSubmit={onSubmit}>
            <fieldset className="float-label-field">
              <label htmlFor="txtEmail">Email</label>
              <input
                id="txtEmail"
                type="email"
                name="email"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </fieldset>

            <fieldset className="float-label-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </fieldset>

            <fieldset className="float-label-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="10"
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </fieldset>
            <button
              type="submit"
              className="px-4 py-2 rounded-md border-2 border-off-black hover:bg-teal transition duration-500"
            >
              Contact me
            </button>
          </form>
        </section>
      </article>
    </>
  );
};

export default contact;
