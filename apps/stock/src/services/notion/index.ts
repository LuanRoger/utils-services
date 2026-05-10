import { Client } from "@notionhq/client";

export function createNotionClient(secret: string) {
  return new Client({
    auth: secret,
  });
}
