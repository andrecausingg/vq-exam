import React from "react";
import { UserProvider } from "./context/AuthContext";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";

import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  );
}
