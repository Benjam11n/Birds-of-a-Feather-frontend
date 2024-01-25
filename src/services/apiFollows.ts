import { users } from "@/types/allTypes";
import { BACKEND_URL } from "@/utils/constants";

export async function getFollowings(): Promise<users[]> {
  const response = await fetch(`${BACKEND_URL}/follows`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch followers");

  const followers: users[] = await response.json();
  return followers;
}

export async function createFollow(followeeId: number): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/follows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ followeeId }),
  });
  if (!response.ok) throw new Error("Failed to create follow");
}

export async function deleteFollow(followeeId: number): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/follows`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ followeeId }),
  });
  if (!response.ok) throw new Error("Failed to delete follow");
}
