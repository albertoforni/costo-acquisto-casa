import { agencyFeePercentage } from "@app/store/rules";

describe("Agency Fee Percentage", () => {
  it("it returns percentage + VAT", () => {
    expect(agencyFeePercentage({ price: 100, percentage: 3 })).toBe(3.66);
  });
  it("it returns 0 when % fee is 0", () => {
    expect(agencyFeePercentage({ price: 100, percentage: 0 })).toBe(0);
  });
});
