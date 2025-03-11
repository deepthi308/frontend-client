import { useEffect } from "react";
import "./mainPage.css";

export default function MainPage({ setIsBurgerMenuClicked }) {
  useEffect(() => {
    setIsBurgerMenuClicked(false);
  }, [setIsBurgerMenuClicked]);

  return <div>MainPage</div>;
}
