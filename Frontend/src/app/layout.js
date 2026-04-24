import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot"; 
import Footer from "./components/Footer";
import "./globals.css";

export const metadata = {
  title: "EduBridge AI",
  description: "Personalized learning with smart course guidance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var choice = localStorage.getItem('edubridge-theme') || 'auto';
                  var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var resolved = choice === 'auto' ? (isDark ? 'dark' : 'light') : choice;
                  document.documentElement.setAttribute('data-theme', resolved);
                  document.documentElement.setAttribute('data-theme-choice', choice);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
