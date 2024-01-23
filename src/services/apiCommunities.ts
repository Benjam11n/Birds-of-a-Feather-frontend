import { community, communityMember, newCommunity } from "@/types/allTypes";

export async function getCommunities() {
  const response = await fetch("http://localhost:8080/communities", {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to get communities");
  const communities: community[] = await response.json();
  return communities;
}

export async function getCommunity(communityId: number) {
  const response = await fetch(
    `http://localhost:8080/communities/${communityId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) throw new Error("Failed to get community");
  const community: community = await response.json();
  return community;
}

export async function createCommunity(newCommunity: newCommunity) {
  const formData = new FormData();
  // Append all fields
  formData.append("Title", newCommunity.title);
  formData.append("CreatedAt", newCommunity.CreatedAt);
  formData.append("Category", newCommunity.category);
  formData.append("Description", newCommunity.description);
  formData.append("iconUrl", newCommunity.iconUrl);
  const response = await fetch("http://localhost:8080/communities", {
    method: "POST",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create community");
}

export async function updateCommunity({
  communityId,
  newCommunity,
}: {
  communityId: number;
  newCommunity: newCommunity;
}) {
  const response = await fetch(
    `http://localhost:8080/communities/${communityId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newCommunity),
    }
  );
  if (!response.ok) throw new Error("Failed to edit community");
}

export async function deleteCommunity(communityId: number) {
  const response = await fetch(
    `http://localhost:8080/communities/${communityId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to delete community");
}

export async function createCommunityMember(communityId: number) {
  const response = await fetch(
    `http://localhost:8080/communities/${communityId}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to join community");
}

export async function getAllCommunityMembers() {
  const response = await fetch(`http://localhost:8080/communitymembers`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to get community members");
  const communityMembers: communityMember[] = await response.json();
  return communityMembers;
}

export async function getCommunityMembers(communityId: number) {
  const response = await fetch(
    `http://localhost:8080/communities/${communityId}/members`,
    {
      method: "GET",
    }
  );
  if (!response.ok) throw new Error("Failed to get community members");
  const communityMembers: communityMember[] = await response.json();
  return communityMembers;
}

export async function deleteCommunityMember(communityId: number) {
  const response = await fetch(
    `http://localhost:8080/communities/${communityId}/members`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to unfollow community");
}
