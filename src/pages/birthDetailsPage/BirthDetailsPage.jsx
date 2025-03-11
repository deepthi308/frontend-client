import { useEffect } from "react";
import BirthDetailsForm from "../../components/birthDetailsForm/BirthDetailsForm";
import "./birthDetailsPage.css";

export default function BirthDetailsPage({
  isBurgerMenuClicked,
  setIsBurgerMenuClicked,
}) {
  useEffect(() => {
    setIsBurgerMenuClicked(false);
  }, [setIsBurgerMenuClicked]);

  return (
    <section className="birthDetailsPage">
      <h1 className="birthDetailsTitle">Birth Details</h1>
      <BirthDetailsForm />
    </section>
  );
}
