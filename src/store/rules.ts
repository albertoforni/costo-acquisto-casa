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
      return {
        registro: (args.renditaCatastale * 115.5 * 2) / 100,
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
      return {
        registro: (args.renditaCatastale * 126 * 2) / 100,
        catastale: 50,
        ipotecaria: 50,
        VAT: 0,
      };
    }
  }
}
