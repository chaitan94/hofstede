import { Alert, Card, Col, Progress, Row } from "antd";
import React, { useState } from "react";
import { defaultFactorValues } from "./constants";
import { rank } from "./functions";
import HofstedeChart from "./HofstedeChart";
import SliderSet from "./SliderSet";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [factorValues, setFactorValues] = useState(() => defaultFactorValues);

  // The actual computation
  const ranked = rank(factorValues, {
    limit: 9,
  });

  return (
    <Row gutter={16} style={{ padding: 16 }}>
      <Col span={8}>
        <div>
          <Card title="Hofstede criteria">
            <SliderSet values={factorValues} onChange={setFactorValues} />
          </Card>
        </div>
        <div style={{ marginTop: 16 }}>
          <Alert
            showIcon
            type="info"
            message="Change above sliders to provide an input criteria. Top 9 closest matching countries according to the given criteria will then be shown on the right. You can then continue playing around with the sliders to watch the results adapt automatically :)"
          />
        </div>
      </Col>
      <Col span={16}>
        <div className={styles.countriesGrid}>
          {ranked.map((e: any, i: number) => {
            return (
              <div className={styles.countryPanel}>
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
      </Col>
    </Row>
  );
};

export default App;
