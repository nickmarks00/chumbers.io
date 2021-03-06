import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Navbar from "./Navbar";
import Footer from "./footer/Footer";

import { getCategoriesLink } from "../services/getCategories";

const Layout = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesLink().then((res) => setCategories(res));
  }, []);
  return (
    <>
      <Navbar categories={categories} />
      {children}
      <Footer categories={categories} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
