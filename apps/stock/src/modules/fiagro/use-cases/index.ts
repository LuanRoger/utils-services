import { getFiagroById as getFiagroByIdStatusInvest } from "@/services/status-invest/fiagro";
import {
  FiiHasInvalidData,
  FiiNotFound,
  FiiNotFoundRule,
} from "@/shared/errors";
import { parseFiiPage } from "@/utils/status-invest/html-parser";

export async function getFiagroById(id: string) {
  try {
    const page = await getFiagroByIdStatusInvest(id);
    const fiData = parseFiiPage(page);

    return fiData;
  } catch (error) {
    if (error instanceof FiiNotFoundRule) {
      throw new FiiNotFound(id);
    }
    throw new FiiHasInvalidData(id);
  }
}
