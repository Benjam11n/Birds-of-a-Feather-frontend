export async function getFollowings() {
  const response = await fetch(`http://localhost:8080/follows`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch followers");

  const followers = await response.json();
  return followers;
}

export async function createFollow(followeeId: number) {
  const response = await fetch(`http://localhost:8080/follows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ followeeId }),
  });
  if (!response.ok) throw new Error("Failed to create follow");
}

export async function deleteFollow(followeeId: number) {
  const response = await fetch(`http://localhost:8080/follows`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ followeeId }),
  });
  if (!response.ok) throw new Error("Failed to delete follow");
}
