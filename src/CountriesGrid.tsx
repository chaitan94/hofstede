import { Progress } from "antd";
import React, { useMemo } from "react";
import styles from "./HofstedeExplorer.module.css";
import { rank } from "./functions";
import HofstedeChart from "./HofstedeChart";
import { HofstedeValues } from "./interfaces";

interface Props {
  factorValues: HofstedeValues;
}

const CountriesGrid: React.FC<Props> = ({ factorValues }) => {
  // The actual computation
  const ranked = useMemo(
    () =>
      rank(factorValues, {
        limit: 9,
      }),
    [factorValues]
  );

  return (
    <div className={styles.countriesGrid}>
      {ranked.map((e: any, i: number) => {
        return (
          <div key={e.id} className={styles.countryPanel}>
            <div className={styles.countryScore}>
              <span>
                <span>#</span>
                <span className={styles.countryRank}>{i + 1}</span>
              </span>
              <Progress
                percent={e.SCORE * 100}
                format={() => (e.SCORE * 100).toFixed(0) + "%"}
              />
            </div>
            <div className={styles.countryTitle}>
              <span>{e.title}</span>
            </div>
            <div>
              <HofstedeChart inputValues={factorValues} countryValues={e} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountriesGrid;
