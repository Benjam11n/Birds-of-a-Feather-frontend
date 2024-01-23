import Spinner from "@/ui/Spinner";
import { useCommunities } from "../communities/useCommunities";
import { useParams } from "react-router-dom";
import { community } from "@/types/allTypes";

function CategoryHomepage() {
  const { communities, isLoading } = useCommunities();
  const { category } = useParams();
  const categoryCommunities =
    communities?.filter(
      (community: community) => community.category === category
    ) || [];
  if (isLoading) return <Spinner />;
}

export default CategoryHomepage;
