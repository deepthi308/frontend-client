import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import BrandLogo from "/images/astroManDeepologyLogo.png";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Navbar() {
  const [isBurgerMenuClicked, setIsBurgerMenuClicked] = useState(false);
  const navigate = useNavigate();
  const { removeItem } = useLocalStorage();

  const handleBurgerMenuClick = () => {
    let clickedState = isBurgerMenuClicked === true ? false : true;
    setIsBurgerMenuClicked(clickedState);
  };

  const handleLogin = () => {
    removeItem("otp");
    removeItem("mobileNumber");
    removeItem("user");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    handleBurgerMenuClick();
    navigate(path);
  };

  return (
    <nav className="nav">
      <section className="nav_logo">
        <Link className="logo" to={"/"}>
          <img src={BrandLogo} alt="Brand Logo" />
        </Link>
        <h1 className="brand_name">
          {/* <Link to={"/"}>
            <img className="logo" src={"./images/logo.png"} alt="Logo" />
            Astro ManDeep
          </Link> */}
          <Link to={"/"}>
            <span className="astro">Astro</span> ManDeepology
          </Link>
          {/* <Link to={"/"}>Dhenskriptology</Link> */}
        </h1>
      </section>

      <section className="nav_links">
        <ul className="links">
          <li className="link">
            <Link to={"/freekundli"}>Free Kundli</Link>
          </li>
          <li className="link">
            <Link to={"/kundlimatching"}>Kundli Matching</Link>
          </li>
          <li className="link">
            <Link to={"/#services"}>Services</Link>
          </li>
          <li className="link">
            <Link to={"/#blogs"}>Blogs</Link>
          </li>
          <li className="link">
            <Link to={"/#astrologers"}>Astrologers</Link>
          </li>
          <li className="link">
            <Link to={"/#faqs"}>Faqs</Link>
          </li>
        </ul>
        <button onClick={handleLogin}>Login</button>
      </section>

      <section className="small-device-nav-links">
        {!isBurgerMenuClicked ? (
          // <motion.div
          //   onClick={handleBurgerMenuClick}
          //   initial={{ opacity: 0, scale: 0.5 }}
          //   animate={{ opacity: 1, scale: 1 }}
          //   transition={{
          //     duration: 0.8,
          //     delay: 0.5,
          //     ease: [0, 0.71, 0.2, 1.01],
          //   }}
          // >
          <RxHamburgerMenu
            onClick={handleBurgerMenuClick}
            size={30}
            fontWeight={600}
          />
        ) : (
          // {/* </motion.div> */}
          // <motion.div
          //   initial={{ opacity: 0, scale: 0.5 }}
          //   animate={{ opacity: 1, scale: 1 }}
          //   transition={{
          //     duration: 0.8,
          //     delay: 0.5,
          //     ease: [0, 0.71, 0.2, 1.01],
          //   }}
          // >
          <CgClose size={30} fontWeight={600} onClick={handleBurgerMenuClick} />
          // </motion.div>
        )}
        {isBurgerMenuClicked ? (
          <motion.div
            className="nav-links2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ul className="links2">
              <li
                className="link2"
                onClick={() => handleNavigation("/freekundli")}
              >
                <Link>Free Kundli</Link>
              </li>
              <li
                className="link2"
                onClick={() => handleNavigation("/kundlimatching")}
              >
                <Link>Kundli Matching</Link>
              </li>
              <li
                className="link2"
                onClick={() => handleNavigation("/#services")}
              >
                <Link>Services</Link>
              </li>
              <li className="link2" onClick={() => handleNavigation("/#blogs")}>
                <Link>Blogs</Link>
              </li>
              <li
                className="link2"
                onClick={() => handleNavigation("/#astrologers")}
              >
                <Link>Astrologers</Link>
              </li>
              <li className="link2" onClick={() => handleNavigation("/#faqs")}>
                <Link>Faqs</Link>
              </li>
              <li className="link2" onClick={() => handleNavigation("/login")}>
                <Link>Login</Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </section>
    </nav>
  );
}
