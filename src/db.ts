import { User } from "./types";

const users: User[] = [{ email: "teste@teste.com", id: "1", name: "Teste" }];

export function getUser(id: string): User | null {
  return users.find((user) => user.id === id) ?? null;
}

export function listUsers(limit: number = 10): User[] {
  return users.slice(0, limit);
}
