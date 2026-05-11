import { FIAGRO_STORE_KEY } from "@/constants";
import { getValueCache, setValueCache } from "@/services/cache";
import { getFiagroById as getFiagroByIdStatusInvest } from "@/services/status-invest/fiagro";
import {
  FiiHasInvalidData,
  FiiNotFound,
  FiiNotFoundRule,
} from "@/shared/errors";
import type { FiiData } from "@/shared/models/fii";
import { createCacheKey } from "@/utils/cache";
import { parseFiiPage } from "@/utils/status-invest/html-parser";

export async function getFiagroById(id: string) {
  let fiData: FiiData | null = null;
  const cacheKey = createCacheKey(FIAGRO_STORE_KEY, id);
  fiData = await getValueCache<FiiData>(cacheKey);
  if (fiData) {
    return fiData;
  }

  const page = await getFiagroByIdStatusInvest(id);
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
