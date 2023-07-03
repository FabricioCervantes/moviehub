import React from "react";
import "@styles/globals.css";
import Nav from "@components/Nav";

export const metadata = {
  title: "MovieHub",
  description: "Discover & track movies and TV shows",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg h-screen">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
