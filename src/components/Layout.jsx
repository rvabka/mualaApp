import { Outlet } from "react-router-dom";
import Footer from "./Footers";
import ThemeToggle from "./ThemeToggle"

export default function Layout() {
  return (
    <main className="relative bg-appColor dark:bg-lightGray">
      <ThemeToggle />
      <Outlet />
      <Footer />
    </main>
  );
}
