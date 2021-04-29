import { BlockOutlined, RetweetOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Row } from "antd";
import React, { useCallback, useState } from "react";
import styles from "./HofstedeExplorer.module.css";
import { defaultFactorValues } from "./constants";
import CountriesGrid from "./CountriesGrid";
import CountrySelect from "./CountrySelect";
import { getDF } from "./functions";
import HofstedeSliders from "./HofstedeSliders";
import { HofstedeFactor, HofstedeValues } from "./interfaces";

const HofstedeExplorer: React.FC = () => {
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

  const handleOpposite = useCallback(() => {
    setFactorValues(
      Object.fromEntries(
        Object.entries(factorValues).map(([k, v]) => [k, 100 - v])
      ) as HofstedeValues
    );
  }, [factorValues, setFactorValues]);

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
            <CountrySelect countries={countries} onSelect={setFactorValues} />
            <Button icon={<RetweetOutlined />} onClick={handleRandomize}>
              Randomize
            </Button>
            <Button icon={<BlockOutlined />} onClick={handleOpposite}>
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

export default HofstedeExplorer;
