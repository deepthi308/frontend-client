import { useEffect } from "react";
import "./freeKundli.css";

export default function FreeKundli({ setIsBurgerMenuClicked }) {
  useEffect(() => {
    setIsBurgerMenuClicked(false);
  });

  return (
    <section className="freeKundli">
      <h1>Comming Soon...</h1>
    </section>
  );
}
