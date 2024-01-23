import { NavLink } from "react-router-dom";
import { FiHome, FiSmile, FiUsers } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { GrGroup } from "react-icons/gr";

function MainNav() {
  return (
    <div className="px-4 py-3">
      <nav>
        <ul className="space-y-2 border-b border-border pb-4">
          <li>
            <NavLink to="/dashboard">
              <Button
                variant="ghost"
                className="flex w-full flex-row justify-start gap-1"
              >
                <FiHome /> <span>Home</span>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/fyp">
              <Button
                variant="ghost"
                className="flex w-full flex-row justify-start gap-1"
              >
                <FiSmile /> <span>FYP</span>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/friends">
              <Button
                variant="ghost"
                className="flex w-full flex-row justify-start gap-1"
              >
                <FiUsers />
                <span>Friends</span>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/communities">
              <Button
                variant="ghost"
                className="flex w-full flex-row justify-start gap-1"
              >
                <GrGroup />
                <span>Communities</span>
              </Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNav;
