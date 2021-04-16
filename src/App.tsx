import { BlockOutlined, RetweetOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Row } from "antd";
import React, { useCallback, useState } from "react";
import styles from "./App.module.css";
import { defaultFactorValues } from "./constants";
import CountriesGrid from "./CountriesGrid";
import CountrySelect from "./CountrySelect";
import { getDF } from "./functions";
import HofstedeSliders from "./HofstedeSliders";
import { HofstedeFactor, HofstedeValues } from "./interfaces";

const App: React.FC = () => {
  const [factorValues, setFactorValues] = useState(() => defaultFactorValues);

  const countries = getDF();

  const handleRandomize = useCallback(() => {
    setFactorValues(
      Object.fromEntries(
        Object.values(HofstedeFactor).map((f) => [
          f,
          Math.ceil(Math.random() * 100),
        ])
      ) as HofstedeValues
    );
  }, [setFactorValues]);

  return (
    <Row gutter={16} style={{ padding: 16 }}>
      <Col span={8}>
        <div className={styles.lhs}>
          <Card title="Hofstede criteria">
            <HofstedeSliders values={factorValues} onChange={setFactorValues} />
          </Card>
          <Alert
            showIcon
            type="info"
            message="Change above sliders to provide an input criteria. Top 9 closest matching countries according to the given criteria will then be shown on the right. You can then continue playing around with the sliders to watch the results adapt automatically :)"
          />
          <div className={styles.toolBox}>
            <CountrySelect
              countries={countries}
              factorValues={factorValues}
              setFactorValues={setFactorValues}
            />
            <Button icon={<RetweetOutlined />} onClick={handleRandomize}>
              Randomize
            </Button>
            <Button disabled icon={<BlockOutlined />}>
              Opposite
            </Button>
          </div>
        </div>
      </Col>
      <Col span={16}>
        <CountriesGrid factorValues={factorValues} />
      </Col>
    </Row>
  );
};

export default App;
