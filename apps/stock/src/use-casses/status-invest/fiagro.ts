import { FIAGRO_STORE_KEY } from "@/constants";
import { FiHasInvalidData, FiNotFound, FiNotFoundRule } from "@/models/errors";
import type { FiiData } from "@/models/fii";
import { getFiagroById as getFiagroByIdStatusInvest } from "@/services";
import { getValueCache, setValueCache } from "@/services/cache";
import { createCacheKey } from "@/utils/cache";
import { parseFiPage } from "@/utils/status-invest/html-parser";

export async function getFiagroById(id: string) {
  let fiData: FiiData | null = null;
  const cacheKey = createCacheKey(FIAGRO_STORE_KEY, id);
  fiData = await getValueCache<FiiData>(cacheKey);
  if (fiData) {
    return fiData;
  }

  const page = await getFiagroByIdStatusInvest(id);
  try {
    fiData = parseFiPage(page);
    await setValueCache(cacheKey, fiData);
  } catch (error) {
    if (error instanceof FiNotFoundRule) {
      throw new FiNotFound(id);
    }
    throw new FiHasInvalidData(id);
  }

  return fiData;
}
