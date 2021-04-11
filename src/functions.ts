import * as z from "zebras";
import { HOFSTEDE } from "./constants";
import _df from "./countries.json";
import { HofstedeValues } from "./interfaces";

let dfCache: any = null;

const getDF = () => {
  if (dfCache !== null) {
    return dfCache;
  }
  if (!_df || !Array.isArray(_df) || _df.length === 0) {
    throw new Error("Invalid JSON.");
  }
  dfCache = (_df as unknown) as HofstedeValues[];
  return dfCache;
};

/**
 * Maximum hofstede distance. Since it's 6-D and each value ranging 0-100,
 * its values comes out to ~245, i.e., (6 * 100^2) ^ 0.5
 */
const MAX_HF_DISTANCE = 244.948974278;

/**
 * @param {HofstedeValues} a
 * @param {HofstedeValues} b
 * @returns cartesian distance between given hofstede values. Will be ranging from 0 to MAX_HF_DISTANCE (~245).
 */
export const hofstedeDistance = (a: HofstedeValues, b: HofstedeValues) => {
  const d = HOFSTEDE.cols.map((e) => Math.pow(a[e.key] - b[e.key], 2));
  return Math.pow(
    d.reduce((a, b) => a + b, 0),
    0.5
  );
};

interface Options {
  limit?: number;
}

/**
 * @param {Array<number>} values Must be in the format {pdi: 10, ivu: 20 ...}.
 *     All values must be between 0 and 100.
 */
export const rank = (values: HofstedeValues, options: Options) => {
  let df = getDF();

  const score = df.map(
    (row: any) =>
      (MAX_HF_DISTANCE - hofstedeDistance(values, row)) / MAX_HF_DISTANCE
  );
  const score_col = "SCORE";
  df = z.addCol(score_col, score, df);

  df = z.sortByCol(score_col, "desc", df);

  if (options.limit) {
    df = df.slice(0, options.limit);
  }

  return df;
};
