import { Select } from "antd";
import React, { useCallback } from "react";
import { CountryData } from "./interfaces";

interface Props {
  countries: CountryData[];
  onSelect?: (v: CountryData) => void;
  onClear?: () => void;
  placeholder?: string;
}

const CountrySelect: React.FC<Props> = ({
  countries,
  onSelect,
  onClear,
  placeholder,
}) => {
  const handleCountrySelected = useCallback(
    (country_id: number) => {
      const idx = countries.findIndex((c) => c.id === country_id);
      if (idx !== -1) {
        if (onSelect) onSelect(countries[idx]);
      }
    },
    [countries, onSelect]
  );

  return (
    <Select
      style={{ width: "100%" }}
      placeholder={placeholder || "Select a country.."}
      showSearch
      allowClear
      optionFilterProp="children"
      onChange={handleCountrySelected}
      onClear={onClear}
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
