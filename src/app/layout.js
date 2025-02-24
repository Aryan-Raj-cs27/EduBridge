"use client";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";  // Import Chatbot
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Chatbot />  {/* Add Chatbot to the layout */}
      </body>
    </html>
  );
}
