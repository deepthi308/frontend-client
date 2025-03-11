import { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";

export default function Layout({
  children,
  isLogin,
  isBurgerMenuClicked,
  setIsBurgerMenuClicked,
}) {
  return (
    <>
      <Navbar
        isLogin={isLogin}
        isBurgerMenuClicked={isBurgerMenuClicked}
        setIsBurgerMenuClicked={setIsBurgerMenuClicked}
      />
      {children}
    </>
  );
}
