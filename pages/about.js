import React from "react";
import Seo from "../components/SEO";

const about = () => {
  return (
    <>
      <Seo title="About" />
      <article className="bg-white px-48 py-16">
        <h2 className="text-2xl font-display font-bold">Hello there.</h2>
        <section>
          <p className="text-md mt-4">
            My name is Nick. This is a site I have made to house a collection of
            essays and projects that I have been working on over the years.
          </p>
          <p className="text-md mt-4">
            I am currently studying at{" "}
            <a href="https://monash.edu" className="underline--magical">
              Monash University
            </a>{" "}
            in Victoria, Australia, completing a double-degree of a Bachelor of
            Engineering (Honours) and a Bachelor of Science. I am specialising
            in Electrical and Computer Systems Engineering ⚡, and majoring in
            Computational Science 🖥️ and Pure Mathematics ➕.
          </p>
          <p className="text-md mt-4">
            At the moment, I am doing a lot of work in the realm of{" "}
            <span className="font-bold">
              high-performance computing and deep learning 🧠
            </span>{" "}
            at Monash University. I am additionally conducting a research
            project into the electrochemical reduction of carbon dioxide as a
            viable pathway for carbon conversion.
          </p>
          <p className="text-md mt-4">
            I love playing sport of any kind, particularly basketball 🏀. My
            hobbies are many and varied, but currently I am spending a lot of my
            time playing piano 🎹, wood-carving 🪵, web development and running
            (
            <a
              href="https://www.strava.com/athletes/51831954"
              className="underline--magical"
            >
              follow me on Strava
            </a>
            🤔?).
          </p>
        </section>
      </article>
    </>
  );
};

export default about;
