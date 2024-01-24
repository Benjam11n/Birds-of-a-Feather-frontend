import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";

function LogoIcon() {
  return (
    <div className="flex items-center gap-x-3">
      <NavLink to="/dashboard">
        <Avatar>
          <AvatarImage src="Logo.jpg" alt="logo" />
          <AvatarFallback>Header Logo</AvatarFallback>
        </Avatar>
      </NavLink>
      <h2 className="text-2xl font-semibold">Birds of a Feather</h2>
    </div>
  );
}

export default LogoIcon;
