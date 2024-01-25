import { LoginUser } from "@/types/allTypes";
import { BACKEND_URL } from "@/utils/constants";

export async function login(user: LoginUser): Promise<void> {
  // make the fetch request with the data as the body
  const response = await fetch(`${BACKEND_URL}/login`, {
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
  const response = await fetch(`${BACKEND_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data, // send the data as the body
  });

  if (!response.ok) throw new Error("Failed to signup");
}
