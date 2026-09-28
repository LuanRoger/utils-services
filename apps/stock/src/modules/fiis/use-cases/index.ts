import { getFiiById as getFiiByIdStatusInvest } from "@/services/status-invest/fiis";
import {
  FiiHasInvalidData,
  FiiNotFound,
  FiiNotFoundRule,
} from "@/shared/errors";
import { parseFiiPage } from "@/utils/status-invest/html-parser";

export async function getFiiById(id: string) {
  try {
    const page = await getFiiByIdStatusInvest(id);
    const fiData = parseFiiPage(page);

    return fiData;
  } catch (error) {
    if (error instanceof FiiNotFoundRule) {
      throw new FiiNotFound(id);
    }

    throw new FiiHasInvalidData(id);
  }
}
