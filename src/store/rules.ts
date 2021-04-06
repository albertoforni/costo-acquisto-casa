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
