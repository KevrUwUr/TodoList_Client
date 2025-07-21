import React from "react";
import Header from "./header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Header />
        <main className="flex-1 w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
