import {
  community,
  newUser,
  newUserAvatar,
  newUserPassword,
  users,
} from "@/types/allTypes";
import { BACKEND_URL } from "@/utils/constants";

export async function getUsers(): Promise<users[]> {
  const response = await fetch(`${BACKEND_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");

  const friends = await response.json();
  return friends;
}

export async function getCurrentUser(): Promise<users> {
  const response = await fetch(`${BACKEND_URL}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to get current user");
  const user = await response.json();
  return user;
}

export async function logOut(): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) throw new Error("Failed to logout");
  localStorage.removeItem("token");
}

export async function updateUser({
  userId,
  newUser,
}: {
  userId: number;
  newUser: newUser;
}): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) throw new Error("Failed to update user");
}

export async function updateUserAvatar({
  userId,
  newUser,
}: {
  userId: number;
  newUser: newUserAvatar;
}): Promise<void> {
  const formData = new FormData();
  formData.append("avatarUrl", newUser.avatarUrl);

  const response = await fetch(`${BACKEND_URL}/users/${userId}/avatar`, {
    method: "PUT",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: formData, // Use FormData instead of JSON.stringify
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }
}

export async function updateUserPassword({
  userId,
  newUser,
}: {
  userId: number;
  newUser: newUserPassword;
}): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/users/${userId}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) throw new Error("Failed to update user");
}

export async function getUserCommunities(): Promise<community[]> {
  const response = await fetch(`${BACKEND_URL}/userCommunities`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch user communities");

  const communities = await response.json();
  return communities;
}
