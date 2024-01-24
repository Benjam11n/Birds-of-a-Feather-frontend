import { LoginUser } from "@/types/allTypes";

export async function login(user: LoginUser) {
  // make the fetch request with the data as the body
  const response = await fetch(`${import.meta.env.BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), // send the data as the body
  });

  if (!response.ok) throw new Error("Incorrect email or password");
  const { token } = await response.json();
  localStorage.setItem("token", token);
}

export async function getCurrentUser() {
  const response = await fetch(`${import.meta.env.BACKEND_URL}/`, {
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

export async function signUp({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<void> {
  const data = JSON.stringify({
    name,
    email,
    password,
  });

  // make the fetch request with the data as the body
  const response = await fetch(`${import.meta.env.BACKEND_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data, // send the data as the body
  });

  if (!response.ok) throw new Error("Failed to signup");
}

export async function getUsers() {
  const response = await fetch(`${import.meta.env.BACKEND_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");

  const friends = await response.json();
  return friends;
}

export async function logOut(): Promise<void> {
  const response = await fetch(`${import.meta.env.BACKEND_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) throw new Error("Failed to logout");
  localStorage.removeItem("token");
}
