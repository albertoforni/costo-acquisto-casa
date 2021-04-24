import { Id, id } from "@app/utils";

type Agency = {
  isViaAgent: boolean;
  agentPercentageFee: number;
  hasOverriddenAgencyFee: boolean;
  overriddenAgentFee: number;
};

type Taxes = {
  isPrimaCasa: boolean;
  isSoldByCompany: boolean;
  renditaCatastale: number;
};

export type Building = {
  id: Id;
  price: number;
} & Agency &
  Taxes;

export function init(): Building {
  return {
    id: id(),
    price: 100_000,
    isViaAgent: true,
    agentPercentageFee: 3,
    hasOverriddenAgencyFee: false,
    overriddenAgentFee: 0,
    isPrimaCasa: true,
    isSoldByCompany: false,
    renditaCatastale: 1_000,
  };
}
