import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { HOFSTEDE } from "./constants";
import { HofstedeValues } from "./interfaces";

interface Props {
  inputValues?: HofstedeValues;
  countryValues: HofstedeValues;
}

const HofstedeChart: React.FC<Props> = ({ inputValues, countryValues }) => {
  const data = HOFSTEDE.cols.map((col) => ({
    value: countryValues[col.key],
    input: inputValues && inputValues[col.key],
    title: col.key.toUpperCase(),
  }));

  return (
    <RadarChart outerRadius={60} width={256} height={200} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="title" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
      {inputValues && (
        <Radar dataKey="input" stroke="#999" fill="#999" fillOpacity={0.6} />
      )}
      <Radar
        dataKey="value"
        stroke="#6699cc"
        fill="#6699cc"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

export default HofstedeChart;
