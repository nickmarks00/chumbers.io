import * as React from "react";
import Link from "next/link";
import Seo from "../components/SEO";
// markup
const NotFoundPage = () => {
  return (
    <>
      <Seo title="Uh oh..." description="404 Error Page" />

      <main id="notfound" className="h-96">
        <div className="notfound-bg">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="notfound">
          <div className="notfound-404">
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
          <a href="mailto:uw0drarf@duck.com" className="bg-white">
            Contact me
          </a>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
