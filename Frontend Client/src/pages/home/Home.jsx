import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import SignIn from "../../components/signin/SignIn";
import Transaction from "../../components/transaction/Transaction";
import "./home.css";
import { context } from "../../App";

const Home = () => {
  const data = useContext(context);

  const isLogin = data.isLogin;
  return (
    <div>
      {!isLogin && (
        <React.Fragment>
          <Navbar />
          <SignIn />
        </React.Fragment>
      )}
      {isLogin && (
        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <Navbar />
                <Header />
                <div className="homeContainer">
                  <Featured />
                  <h1 className="homeTitle">Browse by property type</h1>
                  <PropertyList />
                  <h1 className="homeTitle">Homes guests love</h1>
                  <FeaturedProperties />
                  <MailList />
                  <Footer />
                </div>
              </React.Fragment>
            }
          />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      )}
    </div>
  );
};

export default Home;
