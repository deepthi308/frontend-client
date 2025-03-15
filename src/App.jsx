import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import Layout from "./layout/Layout";
import KundliMatching from "./pages/kundliMatching/KundliMatching";
import FreeKundli from "./pages/freeKundli/FreeKundli";
import BirthDetailsPage from "./pages/birthDetailsPage/BirthDetailsPage.jsx";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import CreateBlogPage from "./pages/createBlogPage.jsx/CreateBlogPage.jsx";
import MainPage from "./pages/mainPage/MainPage.jsx";
import { useState } from "react";
import BlogPage from "./pages/blogPage/BlogPage.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";

function App() {
  const [isBurgerMenuClicked, setIsBurgerMenuClicked] = useState(false);
  const { getItem } = useLocalStorage();
  const [signedIn, setSignedIn] = useState(getItem("user", "") ? true : false);
  console.log(signedIn);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              isBurgerMenuClicked={isBurgerMenuClicked}
              setIsBurgerMenuClicked={setIsBurgerMenuClicked}
            >
              <HomePage
                isBurgerMenuClicked={isBurgerMenuClicked}
                setIsBurgerMenuClicked={setIsBurgerMenuClicked}
              />
            </Layout>
          }
        />
        <Route
          path="/freekundli"
          element={
            <Layout
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              isBurgerMenuClicked={isBurgerMenuClicked}
              setIsBurgerMenuClicked={setIsBurgerMenuClicked}
            >
              <FreeKundli
                isBurgerMenuClicked={isBurgerMenuClicked}
                setIsBurgerMenuClicked={setIsBurgerMenuClicked}
              />
            </Layout>
          }
        />
        <Route
          path="/kundlimatching"
          element={
            <Layout
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              isBurgerMenuClicked={isBurgerMenuClicked}
              setIsBurgerMenuClicked={setIsBurgerMenuClicked}
            >
              <KundliMatching
                isBurgerMenuClicked={isBurgerMenuClicked}
                setIsBurgerMenuClicked={setIsBurgerMenuClicked}
              />
            </Layout>
          }
        />
        <Route
          path="/birthDetailsPage"
          element={
            <Layout
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              isBurgerMenuClicked={isBurgerMenuClicked}
              setIsBurgerMenuClicked={setIsBurgerMenuClicked}
            >
              <BirthDetailsPage
                isBurgerMenuClicked={isBurgerMenuClicked}
                setIsBurgerMenuClicked={setIsBurgerMenuClicked}
              />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              isBurgerMenuClicked={isBurgerMenuClicked}
              setIsBurgerMenuClicked={setIsBurgerMenuClicked}
            >
              <LoginPage
                isBurgerMenuClicked={isBurgerMenuClicked}
                setIsBurgerMenuClicked={setIsBurgerMenuClicked}
              />
            </Layout>
          }
        />
        <Route
          path="/allBlogs"
          element={
            <Layout
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              isBurgerMenuClicked={isBurgerMenuClicked}
              setIsBurgerMenuClicked={setIsBurgerMenuClicked}
            >
              <AllBlogs
                isBurgerMenuClicked={isBurgerMenuClicked}
                setIsBurgerMenuClicked={setIsBurgerMenuClicked}
              />
            </Layout>
          }
        />
        <Route
          path="/createBlog"
          element={
            <Layout
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              isBurgerMenuClicked={isBurgerMenuClicked}
              setIsBurgerMenuClicked={setIsBurgerMenuClicked}
            >
              <CreateBlogPage
                isBurgerMenuClicked={isBurgerMenuClicked}
                setIsBurgerMenuClicked={setIsBurgerMenuClicked}
              />
            </Layout>
          }
        />
        <Route
          path="/mainPage"
          element={
            <Layout
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              isBurgerMenuClicked={isBurgerMenuClicked}
              setIsBurgerMenuClicked={setIsBurgerMenuClicked}
            >
              <MainPage
                isBurgerMenuClicked={isBurgerMenuClicked}
                setIsBurgerMenuClicked={setIsBurgerMenuClicked}
              />
            </Layout>
          }
        />
        <Route
          path="/blog/:title"
          element={
            <Layout
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              isBurgerMenuClicked={isBurgerMenuClicked}
              setIsBurgerMenuClicked={setIsBurgerMenuClicked}
            >
              <BlogPage
                isBurgerMenuClicked={isBurgerMenuClicked}
                setIsBurgerMenuClicked={setIsBurgerMenuClicked}
              />
            </Layout>
          }
        />
        {/* <Route
          path="/signUp"
          element={
            <Layout>
              <SignUpPage />
            </Layout>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
