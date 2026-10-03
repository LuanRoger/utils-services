import { parse } from "node-html-parser";
import { FETCH_USER_AGENT } from "@/constants";

export async function getPageContent(url: string) {
  const pageContent = await fetch(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "User-Agent": FETCH_USER_AGENT,
    },
  }).then((res) => res.text());
  console.log(pageContent);
  const page = parse(pageContent);

  return page;
}
