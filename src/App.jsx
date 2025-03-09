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

function App() {
  console.log("Testing 1111");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/freekundli"
          element={
            <Layout>
              <FreeKundli />
            </Layout>
          }
        />
        <Route
          path="/kundlimatching"
          element={
            <Layout>
              <KundliMatching />
            </Layout>
          }
        />
        <Route
          path="/birthDetailsPage"
          element={
            <Layout>
              <BirthDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/allBlogs"
          element={
            <Layout>
              <AllBlogs />
            </Layout>
          }
        />
        <Route
          path="/createBlog"
          element={
            <Layout>
              <CreateBlogPage />
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
