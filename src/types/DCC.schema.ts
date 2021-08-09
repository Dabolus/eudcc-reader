/**
 * Version of the schema, according to Semantic versioning (ISO, https://semver.org/ version 2.0.0 or newer)
 */
export type SchemaVersion = string;
/**
 * The surname or primary name(s) of the person addressed in the certificate
 */
export type Surname = string;
/**
 * The surname(s) of the person, transliterated ICAO 9303
 */
export type StandardisedSurname = string;
/**
 * The forename(s) of the person addressed in the certificate
 */
export type Forename = string;
/**
 * The forename(s) of the person, transliterated ICAO 9303
 */
export type StandardisedForename = string;
/**
 * Date of Birth of the person addressed in the DCC. ISO 8601 date format restricted to range 1900-2099 or empty
 */
export type DateOfBirth = string;

/**
 * EU Digital Covid Certificate
 */
export interface EUDCCData {
  ver?: SchemaVersion;
  /**
   * Surname(s), forename(s) - in that order
   */
  nam?: {
    fn?: Surname;
    fnt: StandardisedSurname;
    gn?: Forename;
    gnt?: StandardisedForename;
  };
  dob?: DateOfBirth;
  /**
   * Vaccination Group
   */
  v?: [
    {
      /**
       * disease or agent targeted
       */
      tg: keyof typeof import('../data/agentsTargeted').default;
      /**
       * vaccine or prophylaxis
       */
      vp: keyof typeof import('../data/prophylaxes').default;
      /**
       * vaccine medicinal product
       */
      mp: keyof typeof import('../data/medicinalProducts').default;
      /**
       * Marketing Authorization Holder - if no MAH present, then manufacturer
       */
      ma: keyof typeof import('../data/vaccineManufacturers').default;
      /**
       * Dose Number
       */
      dn: number;
      /**
       * Total Series of Doses
       */
      sd: number;
      /**
       * ISO8601 complete date: Date of Vaccination
       */
      dt: string;
      /**
       * Country of Vaccination
       */
      co: keyof typeof import('../data/countryCodes').default;
      /**
       * Certificate Issuer
       */
      is: string;
      /**
       * Unique Certificate Identifier: UVCI
       */
      ci: string;
    },
  ];
  /**
   * Test Group
   */
  t?: [
    {
      /**
       * EU eHealthNetwork: Value Sets for Digital Covid Certificates. version 1.0, 2021-04-16, section 2.1
       */
      tg: keyof typeof import('../data/agentsTargeted').default;
      /**
       * Type of Test
       */
      tt: keyof typeof import('../data/testTypes').default;
      /**
       * NAA Test Name
       */
      nm?: string;
      /**
       * RAT Test name and manufacturer
       */
      ma?: keyof typeof import('../data/testManufacturers').default;
      /**
       * Date/Time of Sample Collection
       */
      sc: string;
      /**
       * Test Result
       */
      tr: keyof typeof import('../data/testResults').default;
      /**
       * Testing Centre
       */
      tc?: string;
      /**
       * Country of Test
       */
      co: keyof typeof import('../data/countryCodes').default;
      /**
       * Certificate Issuer
       */
      is: string;
      /**
       * Unique Certificate Identifier, UVCI
       */
      ci: string;
    },
  ];
  /**
   * Recovery Group
   */
  r?: [
    {
      /**
       * EU eHealthNetwork: Value Sets for Digital Covid Certificates. version 1.0, 2021-04-16, section 2.1
       */
      tg: keyof typeof import('../data/agentsTargeted').default;
      /**
       * ISO 8601 complete date of first positive NAA test result
       */
      fr: string;
      /**
       * Country of Test
       */
      co: keyof typeof import('../data/countryCodes').default;
      /**
       * Certificate Issuer
       */
      is: string;
      /**
       * ISO 8601 complete date: Certificate Valid From
       */
      df: string;
      /**
       * ISO 8601 complete date: Certificate Valid Until
       */
      du: string;
      /**
       * Unique Certificate Identifier, UVCI
       */
      ci: string;
    },
  ];
}

export interface EUDCCMetadata {
  createdAt: number;
  expiresAt: number;
  country: string;
}

export type EUDCC = EUDCCData & EUDCCMetadata;
