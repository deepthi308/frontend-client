import { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";

export default function Layout({
  children,
  isLogin,
  isBurgerMenuClicked,
  setIsBurgerMenuClicked,
  isSignOut,
  signedIn,
  setSignedIn,
}) {
  console.log(signedIn);
  return (
    <>
      <Navbar
        isLogin={isLogin}
        isSignOut={isSignOut}
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        isBurgerMenuClicked={isBurgerMenuClicked}
        setIsBurgerMenuClicked={setIsBurgerMenuClicked}
      />
      {children}
    </>
  );
}
