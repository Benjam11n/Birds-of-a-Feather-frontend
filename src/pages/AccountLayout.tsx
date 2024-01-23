import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "react-router-dom";
import AdditionalInformation from "@/ui/AdditionalInformation";
import { useCurrentUser } from "@/features/users/useCurrentUser";
import Spinner from "@/ui/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFollowing } from "@/features/following/useFollowing";
import { users } from "@/types/allTypes";
import { format } from "date-fns";

function AccountLayout() {
  const navigate = useNavigate();
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { followings, isLoading: isLoadingFollowing } = useFollowing();
  const { name, avatarUrl, userBio, CreatedAt } = currentUser;
  const followerNumber: number =
    followings?.filter((user: users) => user.ID === currentUser.userId)
      .length || 0;
  if (isLoadingCurrentUser || isLoadingFollowing) return <Spinner />;

  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto_1fr]">
      <div className="col-span-2 mx-4 my-3 flex flex-row justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate("./details")}>
          Account Details
        </Button>
        <Button variant="outline" onClick={() => navigate("./statistics")}>
          Account statistics
        </Button>
      </div>

      <div className="just col-span-2 flex items-center gap-6 border-b border-border px-4 py-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={"http://localhost:8080" + avatarUrl}></AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl">{name}</h1>
        <h2 className="text-muted-foreground">
          Joined since: {format(CreatedAt, "MMMM dd yyyy")}
        </h2>
        <h2 className="text-muted-foreground">Followers: {followerNumber}</h2>
        <Button onClick={() => navigate("/editAccount")}>
          Update your account
        </Button>
        <h3>{userBio}</h3>
      </div>

      <main className="mx-4 my-4">
        <Outlet />
      </main>
      <div className="ml-6 mr-24 mt-8">
        <AdditionalInformation user={currentUser} />
      </div>
    </div>
  );
}

export default AccountLayout;
