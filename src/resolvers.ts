import * as db from "./db";
import { User } from "./types";

export function getUser(_: any, { id }: { id: string }): User | null {
  return db.getUser(id);
}

export function listUsers(_: any, { limit }: { limit: number }): User[] {
  return db.listUsers(limit);
}
