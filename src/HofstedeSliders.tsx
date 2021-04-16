import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, InputNumber, Row, Slider, Tooltip } from "antd";
import React, { useCallback } from "react";
import { HOFSTEDE } from "./constants";
import { HofstedeFactor, HofstedeValues } from "./interfaces";

interface Props {
  values: HofstedeValues;
  onChange: (values: HofstedeValues) => void;
}

const HofstedeSliders: React.FC<Props> = ({ values, onChange }) => {
  const _onChange = useCallback(
    (category: string, v: number) => {
      onChange({ ...values, [category]: v });
    },
    [values, onChange]
  );

  const factors = (Object.values(
    HofstedeFactor
  ) as unknown) as HofstedeFactor[];

  return (
    <>
      {factors.map((category) => {
        const c = HOFSTEDE.getColumn(category);
        const value = values[category];
        return (
          <Row key={category}>
            <Col span={10}>
              <Tooltip
                title={c?.name + ": " + c?.description}
                placement="right"
              >
                <InfoCircleOutlined style={{ color: "#999" }} />
                <b style={{ color: "#333", marginLeft: 8, fontSize: "0.8rem" }}>
                  {c?.name}
                </b>
              </Tooltip>
            </Col>
            <Col span={10}>
              <Slider
                min={0}
                max={100}
                onChange={(v: number) => _onChange(category, v)}
                value={typeof value === "number" ? value : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={0}
                max={100}
                style={{ marginLeft: 16, maxWidth: "4em" }}
                value={value}
                onChange={(v) => _onChange(category, v)}
              />
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default HofstedeSliders;
