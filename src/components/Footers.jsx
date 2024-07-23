import { NavLink, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
// import { VscSettings } from "react-icons/vsc";
import { TbCircleLetterM } from "react-icons/tb";

export default function Footer() {
  const activeStyles = {
    fontWeight: "bold",
    color: "#F18C18",
  };
  const location = useLocation();
  const currentLocation = location?.search || "/";
  return (
    <footer className="fixed bottom-2 w-screen flex items-center justify-center">
      <nav className="flex items-center justify-center bg-gradient-to-r px-6 p-2 bg-navColor text-fontColor no-underline rounded-[15rem] mt-3 gap-5">
        <NavLink
          className="flex items-center w-12 flex-col hover:text-main"
          style={({ isActive }) => (isActive ? activeStyles : null)}
          to="/"
        >
          <span>
            <GoHome size={30} className="transition-colors duration-200" />
          </span>
          Home
        </NavLink>
        <TbCircleLetterM color="F18C18" size={60} />
        <NavLink
          className="flex items-center w-12 flex-col hover:text-main"
          style={({ isActive }) => (isActive ? activeStyles : null)}
          to="list"
          state={{ link: currentLocation }}
        >
          <span>
            <CiViewList size={30} className="transition-colors duration-200" />
          </span>
          List
        </NavLink>
      </nav>
    </footer>
  );
}
