export enum HofstedeFactor {
  PDI = "pdi",
  IDV = "idv",
  MAS = "mas",
  UAI = "uai",
  LTO = "lto",
  IND = "ind",
  //   IVR = "ivr",
}

export type HofstedeValues = {
  [factor in HofstedeFactor]: number;
};
export interface CountryData extends HofstedeValues {
  id: number;
  title: string;
}
