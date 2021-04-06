import { agencyFee } from "@app/store/rules";

describe("Agency Fee", () => {
  it("returns percentage + VAT if isViaAgency is true", () => {
    expect(
      agencyFee({
        kind: "PERCENTAGE",
        price: 100,
        percentage: 3,
      }),
    ).toBe(3.66);
  });
  it("returns 0 when % fee is 0", () => {
    expect(
      agencyFee({
        kind: "PERCENTAGE",
        price: 100,
        percentage: 0,
      }),
    ).toBe(0);
  });
  it("returns 0 if AgencyFee is NONE", () => {
    expect(
      agencyFee({
        kind: "NONE",
      }),
    ).toBe(0);
  });
  it("returns the value when AgencyFee is VALUE", () => {
    expect(
      agencyFee({
        kind: "VALUE",
        fee: 321,
      }),
    ).toBe(321);
  });
  it("doesn't return negative values", () => {
    expect(
      agencyFee({
        kind: "VALUE",
        fee: -321,
      }),
    ).toBe(0);
    expect(
      agencyFee({
        kind: "PERCENTAGE",
        price: -100,
        percentage: 3,
      }),
    ).toBe(0);
  });
});
