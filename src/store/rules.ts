import type { Building } from "@app/store/building";

export function agencyFeePercentage({
  price,
  percentage,
}: {
  price: number;
  percentage: number;
}): number {
  return price * (percentage / 100) * 1.22;
}

type AgencyFee =
  | {
    kind: "PERCENTAGE";
    price: number;
    percentage: number;
  }
  | {
    kind: "NONE";
  }
  | {
    kind: "VALUE";
    fee: number;
  };

export function agencyFee(args: AgencyFee): number {
  let fee = 0;
  switch (args.kind) {
    case "PERCENTAGE":
      const { price, percentage } = args;
      fee = agencyFeePercentage({ price, percentage });
      break;
    case "NONE":
      fee = 0;
      break;
    case "VALUE":
      fee = args.fee;
      break;
  }

  return Math.max(fee, 0);
}

export function totalAgencyFee(building: Building): number {
  if (building.isViaAgent) {
    if (building.hasOverriddenAgencyFee) {
      return agencyFee({
        kind: "VALUE",
        fee: building.overriddenAgentFee,
      });
    } else {
      return agencyFee({
        kind: "PERCENTAGE",
        percentage: building.agentPercentageFee,
        price: building.price,
      });
    }
  } else {
    return agencyFee({ kind: "NONE" });
  }
}

type TaxesRequirements =
  | {
    price: number;
    isPrimaCasa: boolean;
    isSoldByCompany: true;
  }
  | {
    isPrimaCasa: boolean;
    isSoldByCompany: false;
    renditaCatastale: number;
  };

export type TaxesResult = {
  registro: number;
  catastale: number;
  ipotecaria: number;
  VAT: number;
};

/**
 * Calculates Italian property purchase taxes according to current law (2024-2025)
 * Sources:
 * - Prezzo-valore: L. 266/2005, art. 1, c. 497; DPR 131/1986, art. 52, c. 5-bis
 * - Multipliers: rendita × 1.05 × 110 (prima casa) = × 115.5; rendita × 1.05 × 120 (seconda casa) = × 126
 * - Rates: 2% prima casa, 9% seconda casa (minimum €1,000 for registration tax)
 * - Fixed taxes: €50 each (private sales), €200 each (company sales)
 * - VAT: 4% prima casa, 10% seconda casa from companies
 */
export function taxes(args: TaxesRequirements): TaxesResult {
  if (args.isPrimaCasa) {
    if (args.isSoldByCompany) {
      return {
        registro: 200,
        catastale: 200,
        ipotecaria: 200,
        VAT: (args.price * 4) / 100,
      };
    } else {
      // Prima casa from private: 2% of (rendita × 115.5), minimum €1,000
      const registroCalculated = (args.renditaCatastale * 115.5 * 2) / 100;
      return {
        registro: Math.max(registroCalculated, 1000),
        catastale: 50,
        ipotecaria: 50,
        VAT: 0,
      };
    }
  } else {
    if (args.isSoldByCompany) {
      return {
        registro: 200,
        catastale: 200,
        ipotecaria: 200,
        VAT: (args.price * 10) / 100,
      };
    } else {
      // Seconda casa from private: 9% of (rendita × 126), minimum €1,000
      const registroCalculated = (args.renditaCatastale * 126 * 9) / 100;
      return {
        registro: Math.max(registroCalculated, 1000),
        catastale: 50,
        ipotecaria: 50,
        VAT: 0,
      };
    }
  }
}

export function taxValues(building: Building): TaxesResult {
  if (building.isSoldByCompany) {
    return taxes({
      price: building.price,
      isPrimaCasa: building.isPrimaCasa,
      isSoldByCompany: building.isSoldByCompany,
    });
  } else {
    return taxes({
      isPrimaCasa: building.isPrimaCasa,
      isSoldByCompany: building.isSoldByCompany,
      renditaCatastale: building.renditaCatastale,
    });
  }
}

type MortgageInput = {
  mortgage: number;
  isPrimaCasa: boolean;
};
type MortgageResult = { impostaSostitutiva: number };

/**
 * Calculates mortgage substitute tax (imposta sostitutiva) according to DPR 601/1973, arts. 15-20
 * Rates: 0.25% for prima casa, 2% for other properties
 * Source: Current banking/notarial practice following post-2008 framework
 */
export function mortgage(args: MortgageInput): MortgageResult {
  if (args.isPrimaCasa) {
    return {
      impostaSostitutiva: (args.mortgage * 0.25) / 100,
    };
  } else {
    return {
      impostaSostitutiva: (args.mortgage * 2) / 100,
    };
  }
}
