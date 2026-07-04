import z from "zod";

export const getFiiByIdResponse = z.object({
  name: z.string().describe("Name of the FII asset"),
  actualValue: z.number().describe("Current value of the asset"),
  dividendYield: z.number().describe("Dividend yield percentage"),
  pvp: z.number().describe("Price over net asset value ratio"),
  segment: z.string().describe("Market segment or category"),
  yield: z
    .object({
      lastYield: z.object({
        value: z.number().describe("Last yield value"),
        percentage: z.number().describe("Last yield percentage"),
        basePrice: z.number().describe("Base price for yield calculation"),
        date: z.iso.datetime().describe("Date of the last yield"),
      }),
    })
    .describe("Yield information"),
});
