import { STATUS_INVEST_FII_BASE_URL } from "./constants";
import { getPageContent } from "@/utils/html";

export async function getFiiById(id: string) {
  const baseUrl = `${STATUS_INVEST_FII_BASE_URL}${id}`;

  const page = await getPageContent(baseUrl);
  return page;
}
