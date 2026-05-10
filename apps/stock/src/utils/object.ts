import { DEFAULT_PAGE_PROPERTIES_NAME } from "@/constants";
import type {
  PropertiesNameOption,
  PropertiesNameOptionRequest,
} from "@/models/properties-options";
import { mergeWithDefaults } from "@repo/shared/utils";

export function mergePropertiesNameOption(
  providedOption?: PropertiesNameOptionRequest
): PropertiesNameOption {
  return mergeWithDefaults(providedOption, DEFAULT_PAGE_PROPERTIES_NAME);
}
