import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/types/allTypes";

function AvatarIcon({ user }: { user: users }) {
  if (!user) return;
  const { name, avatarUrl } = user;

  return (
    <div className="my-3 flex items-center justify-start space-x-4">
      <Avatar>
        <AvatarImage src={"http://localhost:8080" + avatarUrl} alt={name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className="text-xl font-semibold">{name}</h1>
    </div>
  );
}

export default AvatarIcon;
