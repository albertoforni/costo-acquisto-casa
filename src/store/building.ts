import { Id, id } from "@app/utils";
import { z } from "zod";

const AgencySchema = z.object({
  isViaAgent: z.boolean(),
  agentPercentageFee: z.number(),
  hasOverriddenAgencyFee: z.boolean(),
  overriddenAgentFee: z.number(),
});

const TaxesSchema = z.object({
  isPrimaCasa: z.boolean(),
  isSoldByCompany: z.boolean(),
  renditaCatastale: z.number(),
});

const MortgageSchema = z.object({
  hasMortgage: z.boolean(),
  mortgage: z.number(),
  particaMutuo: z.number(),
  perizia: z.number(),
});

const NotarySchema = z.object({
  notaryFee: z.number(),
});

const BaseSchema = z.object({
  id: z.string(),
  price: z.number(),
  description: z.string(),
});

export type Agency = z.infer<typeof AgencySchema>;
export type Taxes = z.infer<typeof TaxesSchema>;
export type Mortgage = z.infer<typeof MortgageSchema>;
export type Notary = z.infer<typeof NotarySchema>;

export const BuildingSchema = BaseSchema.merge(AgencySchema)
  .merge(TaxesSchema)
  .merge(MortgageSchema)
  .merge(NotarySchema);

export type Building = z.infer<typeof BuildingSchema>;

export function init(): Building {
  return {
    id: id(),
    price: 100_000,
    description: "",
    isViaAgent: true,
    agentPercentageFee: 3,
    hasOverriddenAgencyFee: false,
    overriddenAgentFee: 0,
    isPrimaCasa: true,
    isSoldByCompany: false,
    renditaCatastale: 1_000,
    hasMortgage: false,
    mortgage: 100_000,
    particaMutuo: 500,
    perizia: 1_000,
    notaryFee: 2_500,
  };
}
