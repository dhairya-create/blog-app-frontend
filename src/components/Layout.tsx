
import type { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="sm:max-w-[65%] mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
