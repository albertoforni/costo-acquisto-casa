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
        renditaCatastale: 500, // Use higher value to exceed €1,000 minimum
      }),
    ).toEqual({
      registro: (500 * 115.5 * 2) / 100, // = €1,155
      catastale: 50,
      ipotecaria: 50,
      VAT: 0,
    });
  });

  it("applies minimum €1,000 registration tax for prima casa when calculated amount is lower", () => {
    expect(
      taxes({
        isPrimaCasa: true,
        isSoldByCompany: false,
        renditaCatastale: 1, // Very low rendita that would calculate to less than €1,000
      }),
    ).toEqual({
      registro: 1000, // Minimum applies
      catastale: 50,
      ipotecaria: 50,
      VAT: 0,
    });
  });

  it("returns 0 VAT, catastale and ipotecaria 50 Euros and registro 9% of rendita catastale * 126, when not sold by company and not prima casa", () => {
    expect(
      taxes({
        isPrimaCasa: false,
        isSoldByCompany: false,
        renditaCatastale: 1000,
      }),
    ).toEqual({
      registro: 11_340,
      catastale: 50,
      ipotecaria: 50,
      VAT: 0,
    });
  });

  it("applies minimum €1,000 registration tax for seconda casa when calculated amount is lower", () => {
    expect(
      taxes({
        isPrimaCasa: false,
        isSoldByCompany: false,
        renditaCatastale: 1, // Very low rendita that would calculate to less than €1,000
      }),
    ).toEqual({
      registro: 1000, // Minimum applies
      catastale: 50,
      ipotecaria: 50,
      VAT: 0,
    });
  });
});

describe("Mortgage", () => {
  it("applies 0.25% substitute tax for primary home", () => {
    expect(
      mortgage({
        mortgage: 100,
        isPrimaCasa: true,
      }),
    ).toEqual({
      impostaSostitutiva: 0.25,
    });
  });

  it("applies 2% substitute tax for secondary home", () => {
    expect(
      mortgage({
        mortgage: 200,
        isPrimaCasa: false,
      }),
    ).toEqual({
      impostaSostitutiva: 4,
    });
  });
});
