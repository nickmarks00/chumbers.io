import * as React from "react";
import Link from "next/link";
// markup
const NotFoundPage = () => {
  return (
    <main id="notfound" className="h-96">
      <div class="notfound-bg">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="notfound">
        <div class="notfound-404">
          <h1 className="font-display text-gray-200">404</h1>
        </div>
        <h2 className="font-display text-gray-200">Page Not Found</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <a className="bg-white">Return Home</a>
        </Link>

        <p className="mt-6">Clicked on a broken link?</p>
        <a href="mailto:nd.marks00@gmail.com" className="bg-white">
          Contact me
        </a>
      </div>
    </main>
  );
};

export default NotFoundPage;
