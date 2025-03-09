import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
    <ToastContainer theme="dark" position="bottom-right" />
  </StrictMode>
);
