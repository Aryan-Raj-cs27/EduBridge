import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot"; 
import "./globals.css";

export const metadata = {
  title: "EduBridge AI",
  description: "Personalized learning with smart course guidance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
