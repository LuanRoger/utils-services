import { FII_STORE_KEY } from "@/constants";
import { FiiHasInvalidData, FiiNotFound, FiiNotFoundRule } from "@/shared/errors";
import type { FiiData } from "@/shared/models/fii";
import { getFiiById as getFiiByIdStatusInvest } from "@/services/status-invest/fiis";
import { getValueCache, setValueCache } from "@/services/cache";
import { createCacheKey } from "@/utils/cache";
import { parseFiiPage } from "@/utils/status-invest/html-parser";

export async function getFiiById(id: string) {
  let fiData: FiiData | null = null;
  const cacheKey = createCacheKey(FII_STORE_KEY, id);
  fiData = await getValueCache<FiiData>(cacheKey);
  if (fiData) {
    return fiData;
  }

  const page = await getFiiByIdStatusInvest(id);
  try {
    fiData = parseFiiPage(page);
    await setValueCache(cacheKey, fiData);
  } catch (error) {
    if (error instanceof FiiNotFoundRule) {
      throw new FiiNotFound(id);
    }
    throw new FiiHasInvalidData(id);
  }

  return fiData;
}
