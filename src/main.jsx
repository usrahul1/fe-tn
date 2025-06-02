import React from "react";
import "./globals.css";
import { FirebaseProvider } from "../context/Firebase";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "@/store/useThemeStore";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

function Root() {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme} lang="en" className="inter-font">
      <FirebaseProvider>
        <main>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </main>
      </FirebaseProvider>
      <Toaster />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
