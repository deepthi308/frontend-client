import { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";

export default function Layout({
  children,
  isLogin,
  isBurgerMenuClicked,
  setIsBurgerMenuClicked,
  isSignOut,
}) {
  console.log(isSignOut, isLogin);
  return (
    <>
      <Navbar
        isLogin={isLogin}
        isSignOut={isSignOut}
        isBurgerMenuClicked={isBurgerMenuClicked}
        setIsBurgerMenuClicked={setIsBurgerMenuClicked}
      />
      {children}
    </>
  );
}
