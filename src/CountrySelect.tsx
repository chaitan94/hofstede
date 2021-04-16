import { Select } from "antd";
import React, { useCallback } from "react";
import { CountryData, HofstedeValues } from "./interfaces";

interface Props {
  countries: CountryData[];
  factorValues: HofstedeValues;
  setFactorValues: (v: HofstedeValues) => void;
}

const CountrySelect: React.FC<Props> = ({ countries, setFactorValues }) => {
  const handleCountrySelected = useCallback(
    (country_id: number) => {
      const idx = countries.findIndex((c) => c.id === country_id);
      if (idx !== -1) {
        setFactorValues(countries[idx]);
      }
    },
    [countries, setFactorValues]
  );

  return (
    <Select
      style={{ width: "100%" }}
      placeholder="Load country data.."
      showSearch
      allowClear
      optionFilterProp="children"
      onChange={handleCountrySelected}
    >
      {countries.map((country) => (
        <Select.Option key={country.id} value={country.id}>
          {country.title}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CountrySelect;
