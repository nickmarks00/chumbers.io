import React, { useState } from "react";
import $ from "jquery";
import toast from "react-hot-toast";

import Button from "../components/Button";
import Loader from "../components/Loader";
import Seo from "../components/SEO";

const Contact = () => {
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (res.status === 200) {
      toast.success("Email successfully sent", {
        icon: "📩",
      });
      try {
        document.getElementById("contactForm").reset();
        $(".float-label-field").removeClass("float");
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("Something went wrong...", {
        icon: "🤔",
      });
    }
  };

  return (
    <>
      <Seo title="Contact" />
      <article className="bg-white lg:px-48 px-12 py-16">
        <h2 className="text-2xl font-display font-bold">Get in touch.</h2>
        <section className="flex-col w-full mt-8">
          <form onSubmit={onSubmit} id="contactForm">
            <div className="flex">
              <fieldset className="float-label-field w-full mr-1">
                <label htmlFor="txtName">Name</label>
                <input
                  id="txtName"
                  type="text"
                  name="name"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
              </fieldset>
              <fieldset className="float-label-field w-full ml-1">
                <label htmlFor="txtEmail">Email</label>
                <input
                  id="txtEmail"
                  type="email"
                  name="email"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
              </fieldset>
            </div>

            <fieldset className="float-label-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
            </fieldset>

            <fieldset className="float-label-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
            </fieldset>
            {loading ? (
              <Loader />
            ) : (
              <Button buttonText={"Contact me"} className="py-2" />
            )}
          </form>
        </section>
      </article>
    </>
  );
};

export default Contact;
