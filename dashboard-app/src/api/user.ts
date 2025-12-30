import { IUser } from "@/types/user";
import { USERS_API } from "@/constants/urls";
import { FormData } from "@/cnfs/UserForm";

export async function fetchUsers(): Promise<IUser[]> {
  const response = await fetch(USERS_API, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${USERS_API}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}

export async function fetchUser(id: string): Promise<IUser | null> {
  try {
    const response = await fetch(`${USERS_API}/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch {
    return null;
  }
}

export async function createUser(data: FormData): Promise<IUser> {
  const response = await fetch(USERS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
}

export async function updateUser(id: string, data: FormData): Promise<IUser> {
  const response = await fetch(`${USERS_API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
}
