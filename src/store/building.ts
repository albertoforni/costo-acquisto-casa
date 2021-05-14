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

type Mortgage = {
  hasMortgage: boolean;
  mortgage: number;
  particaMutuo: number;
  perizia: number;
};

type Notary = {
  notaryFee: number;
};

export type Building = {
  id: Id;
  price: number;
  description: string;
} & Agency &
  Taxes &
  Mortgage &
  Notary;

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
