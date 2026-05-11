import { parse } from "node-html-parser";

export async function getPageContent(url: string) {
  const pageContent = await fetch(url).then((res) => res.text());
  const page = parse(pageContent);

  return page;
}
