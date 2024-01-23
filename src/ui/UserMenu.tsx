import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FiLogOut, FiUser } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";
import { useLogout } from "@/features/authentication/useLogout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function UserMenu() {
  const navigate = useNavigate();
  const { logOut, status } = useLogout();
  const isLoggingOut: boolean = status === "pending";

  return (
    <ul className="mx-4 my-3 flex space-x-1">
      <li>
        <Button
          onClick={() => navigate("./account/details")}
          disabled={isLoggingOut}
        >
          <FiUser />
        </Button>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={isLoggingOut}>
              <FiLogOut />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log Out</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out?
              </DialogDescription>
            </DialogHeader>

            <Button
              onClick={() => logOut()}
              disabled={isLoggingOut}
              className="mx-2 my-3"
            >
              <FiLogOut />
            </Button>
          </DialogContent>
        </Dialog>
      </li>
    </ul>
  );
}

export default UserMenu;
