import { agencyFee, mortgage, taxes } from "@app/store/rules";

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

describe("Taxes", () => {
  it("returns 4% VAT and other taxes 200 Euros, when prima casa and sold by company", () => {
    expect(
      taxes({
        price: 100,
        isPrimaCasa: true,
        isSoldByCompany: true,
      }),
    ).toEqual({
      registro: 200,
      catastale: 200,
      ipotecaria: 200,
      VAT: 4,
    });
  });

  it("returns 10% VAT and other taxes 200 Euros, when not prima casa and sold by company", () => {
    expect(
      taxes({
        price: 100,
        isPrimaCasa: false,
        isSoldByCompany: true,
      }),
    ).toEqual({
      registro: 200,
      catastale: 200,
      ipotecaria: 200,
      VAT: 10,
    });
  });

  it("returns 0 VAT, catastale and ipotecaria 50 Euros and registro 2% of rendita catastale * 115.5, when not sold by company and prima casa", () => {
    expect(
      taxes({
        isPrimaCasa: true,
        isSoldByCompany: false,
        renditaCatastale: 10,
      }),
    ).toEqual({
      registro: (10 * 115.5 * 2) / 100,
      catastale: 50,
      ipotecaria: 50,
      VAT: 0,
    });
  });

  it("returns 0 VAT, catastale and ipotecaria 50 Euros and registro 2% of rendita catastale * 126, when not sold by company and not prima casa", () => {
    expect(
      taxes({
        isPrimaCasa: false,
        isSoldByCompany: false,
        renditaCatastale: 10,
      }),
    ).toEqual({
      registro: (10 * 126 * 2) / 100,
      catastale: 50,
      ipotecaria: 50,
      VAT: 0,
    });
  });
});

describe("Mortgage", () => {
  it("imposta sostitutiva al 0.25% se prima casa", () => {
    expect(
      mortgage({
        price: 100,
        isPrimaCasa: true,
      }),
    ).toEqual({
      impostaSostitutiva: 0.25,
    });
  });

  it("imposta sostitutiva al 2% se prima casa", () => {
    expect(
      mortgage({
        price: 200,
        isPrimaCasa: false,
      }),
    ).toEqual({
      impostaSostitutiva: 4,
    });
  });
});
