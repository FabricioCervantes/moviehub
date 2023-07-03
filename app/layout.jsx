import React from "react";
import "@styles/globals.css";
import Nav from "@components/Nav";
import { PageWrapper } from "@components/PageWrapper";

export const metadata = {
  title: "MovieHub",
  description: "Discover & track movies and TV shows",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg h-screen">
        <PageWrapper>
          <Nav />
          {children}
        </PageWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
