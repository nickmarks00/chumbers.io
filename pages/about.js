import React from "react";
import UnderConstruction from "../sections/UnderConstruction";
import Seo from "../components/SEO";

const about = () => {
  const payload = {
    operation: "publish",
    data: {
      __typename: "Post",
      title: "Interstellar",
      excerpt: "My actual favourite movie",
      content: "I like Christopher Nolan more",
      category: "Essays",
      series: "Movies I like",
      createdAt: "2021-09-16T13:11:57.345138+00:00",
      description: "This is a description",
      id: "ckf5emloo021s0161iqos7enp",
      image: {
        __typename: "Asset",
        id: "ckf5em5hc02100157x5n00lwb",
      },
      localizations: [
        {
          locale: "en",
          title: "GraphCMS Webhook Payload Changes!",
        },
      ],
      publishedAt: "2021-09-16T13:14:12.782833+00:00",
      stage: "PUBLISHED",
      updatedAt: "2020-09-16T13:13:50.424325+00:00",
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/webhookPosts", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <>
      <Seo />
      {/* <UnderConstruction /> */}
      <div>
        <button className="bg-white" onClick={handleSubmit}>
          Webhook test
        </button>
      </div>
    </>
  );
};

export default about;
