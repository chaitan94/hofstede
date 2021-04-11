export class FactorColumn {
  key: string;
  name: string;
  description: string;

  constructor(key: string, name: string, description: string) {
    this.key = key;
    this.name = name;
    this.description = description;
  }
}

export class FactorType {
  key: string;
  name: string;
  cols: FactorColumn[];
  private col_map: Map<string, FactorColumn> = new Map();

  constructor(key: string, name: string, cols: FactorColumn[]) {
    this.key = key;
    this.name = name;
    this.cols = cols;

    cols.forEach((c) => this.col_map.set(c.key, c));
  }

  getColumn(colKey: string): FactorColumn | undefined {
    return this.col_map.get(colKey);
  }
}

export const HOFSTEDE = new FactorType("HOFSTEDE", "Hofstede", [
  new FactorColumn(
    "pdi",
    "Power distance index (PDI)",
    'The power distance index is defined as "the extent to which the less powerful members of organizations and institutions (like the family) accept and expect that power is distributed unequally". In this dimension, inequality and power is perceived from the followers, or the lower strata. A higher degree of the Index indicates that hierarchy is clearly established and executed in society, without doubt or reason. A lower degree of the Index signifies that people question authority and attempt to distribute power.'
  ),
  new FactorColumn(
    "idv",
    "Individualism vs. collectivism (IDV)",
    'This index explores the "degree to which people in a society are integrated into groups". Individualistic societies have loose ties that often only relate an individual to his/her immediate family. They emphasize the "I" versus the "we". Its counterpart, collectivism, describes a society in which tightly-integrated relationships tie extended families and others into in-groups. These in-groups are laced with undoubted loyalty and support each other when a conflict arises with another in-group.'
  ),
  new FactorColumn(
    "uai",
    "Uncertainty avoidance (UAI)",
    'The uncertainty avoidance index is defined as "a society\'s tolerance for ambiguity", in which people embrace or avert an event of something unexpected, unknown, or away from the status quo. Societies that score a high degree in this index opt for stiff codes of behavior, guidelines, laws, and generally rely on absolute truth, or the belief that one lone truth dictates everything and people know what it is. A lower degree in this index shows more acceptance of differing thoughts or ideas. Society tends to impose fewer regulations, ambiguity is more accustomed to, and the environment is more free-flowing.'
  ),
  new FactorColumn(
    "mas",
    "Masculinity vs. femininity (MAS)",
    'In this dimension, masculinity is defined as "a preference in society for achievement, heroism, assertiveness and material rewards for success". Its counterpart represents "a preference for cooperation, modesty, caring for the weak and quality of life". Women in the respective societies tend to display different values. In feminine societies, they share modest and caring views equally with men. In more masculine societies, women are somewhat assertive and competitive, but notably less than men. In other words, they still recognize a gap between male and female values. This dimension is frequently viewed as taboo in highly masculine societies.'
  ),
  new FactorColumn(
    "lto",
    "Long vs. short-term orientation (LTO)",
    "This dimension associates the connection of the past with the current and future actions/challenges. A lower degree of this index (short-term) indicates that traditions are honored and kept, while steadfastness is valued. Societies with a high degree in this index (long-term) view adaptation and circumstantial, pragmatic problem-solving as a necessity. A poor country that is short-term oriented usually has little to no economic development, while long-term oriented countries continue to develop to a level of prosperity."
  ),
  new FactorColumn(
    "ind",
    "Indulgence vs. restraint (IND)",
    'This dimension refers to the degree of freedom that societal norms give to citizens in fulfilling their human desires. Indulgence is defined as "a society that allows relatively free gratification of basic and natural human desires related to enjoying life and having fun". Its counterpart is defined as "a society that controls gratification of needs and regulates it by means of strict social norms".'
  ),
]);

export const defaultFactorValues = Object.fromEntries(
  HOFSTEDE.cols.map((col) => [col.key, Math.ceil(Math.random() * 100)])
);
