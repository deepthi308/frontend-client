import { useEffect } from "react";
import HeroSection from "../../sections/heroSection/HeroSection";
import ServicesSection from "../../sections/servicesSection/ServicesSection";
import "./homePage.css";
import { useLocation } from "react-router-dom";
import Blogs from "../blogs/Blogs";
import AstrologersSection from "../../sections/astrologersSection/AstrologersSection";
import FaqsSection from "../../sections/faqsSection/FaqsSection";
import FooterSection from "../../sections/footerSection/FooterSection";
import { ClipLoader } from "react-spinners";

export default function HomePage({ setIsBurgerMenuClicked }) {
  useEffect(() => {
    setIsBurgerMenuClicked(false);
  }, [setIsBurgerMenuClicked]);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#services") {
      window.scrollTo({
        top: document.getElementById("services").offsetTop,
        behavior: "smooth",
      });
    } else if (location.hash === "#blogs") {
      window.scrollTo({
        top: document.getElementById("blogs").offsetTop,
        behavior: "smooth",
      });
    } else if (location.hash === "#astrologers") {
      window.scrollTo({
        top: document.getElementById("astrologers").offsetTop,
        behavior: "smooth",
      });
    } else if (location.hash === "#faqs") {
      window.scrollTo({
        top: document.getElementById("faqs").offsetTop,
        behavior: "smooth",
      });
    }
  }, [location]);

  // if (loading) {
  //   return (
  //     <ClipLoader
  //       style={{ height: "100vh", width: "100vw" }}
  //       loading={loading}
  //       size={50}
  //     />
  //   );
  // }

  return (
    <main className="homePage">
      <HeroSection />
      <ServicesSection />
      <Blogs />
      <AstrologersSection />
      <FaqsSection />
      <FooterSection />
    </main>
  );
}
