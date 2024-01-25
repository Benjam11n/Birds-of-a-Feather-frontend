import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "react-router-dom";
import AdditionalInformation from "@/ui/AdditionalInformation";
import { useCurrentUser } from "@/features/users/useCurrentUser";
import Spinner from "@/ui/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFollowing } from "@/features/following/useFollowing";
import { users } from "@/types/allTypes";
import { format } from "date-fns";
import { BACKEND_URL } from "@/utils/constants";

function AccountLayout() {
  const navigate = useNavigate();
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { followings, isLoading: isLoadingFollowing } = useFollowing();
  const { name, avatarUrl, userBio, CreatedAt } = currentUser!;
  const followerNumber: number =
    followings?.filter((user: users) => user.ID === currentUser?.ID).length ||
    0;
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

      <div className="just col-span-2 items-center gap-6 border-b border-border px-4 py-8 grid grid-rows-[auto_1fr] grid-cols-[auto_auto_auto_auto_1fr]">
        <Avatar className="h-24 w-24">
          <AvatarImage src={BACKEND_URL + avatarUrl}></AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl">{name}</h1>
        <h2 className="text-muted-foreground">
          Joined since: {format(CreatedAt, "MMMM dd yyyy")}
        </h2>
        <h2 className="text-muted-foreground">Followers: {followerNumber}</h2>
        <Button
          onClick={() => navigate("/editAccount")}
          className="w-[180px]"
          variant="outline"
        >
          Update your account
        </Button>
        <h3 className="col-span-5 text-lg ml-32 mr-48">{userBio}</h3>
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
