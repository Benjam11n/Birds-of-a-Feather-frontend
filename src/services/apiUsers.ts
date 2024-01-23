import { newUser, newUserAvatar, newUserPassword } from "@/types/allTypes";

export async function updateUser({
  userId,
  newUser,
}: {
  userId: number;
  newUser: newUser;
}) {
  const response = await fetch(`http://localhost:8080/users/${userId}`, {
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
}) {
  const formData = new FormData();
  formData.append("avatarUrl", newUser.avatarUrl);

  const response = await fetch(`http://localhost:8080/users/${userId}/avatar`, {
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
}) {
  const response = await fetch(
    `http://localhost:8080/users/${userId}/password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newUser),
    }
  );
  if (!response.ok) throw new Error("Failed to update user");
}

export async function getUserCommunities() {
  const response = await fetch(`http://localhost:8080/userCommunities`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch user communities");

  const communities = await response.json();
  return communities;
}
