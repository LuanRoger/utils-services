import { getPageContent } from "@/utils/html";
import { STATUS_INVEST_FIAGRO_BASE_URL } from "./constants";

export async function getFiagroById(id: string) {
  const baseUrl = `${STATUS_INVEST_FIAGRO_BASE_URL}${id}`;

  const page = await getPageContent(baseUrl);
  return page;
}
