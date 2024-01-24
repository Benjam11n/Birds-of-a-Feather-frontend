import { NavLink } from "react-router-dom";

function NavLogo() {
  return (
    <nav className="border-b border-border pb-6">
      <NavLink to="/">
        <div className="flex flex-col items-center justify-center space-y-2 pt-4">
          <img src="/Logo.jpg" alt="NavLogo" className="h-[100px] rounded-lg" />{" "}
        </div>
      </NavLink>
    </nav>
  );
}

export default NavLogo;
