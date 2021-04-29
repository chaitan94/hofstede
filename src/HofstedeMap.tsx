import { Alert, Card, Col, Empty, Row } from "antd";
import React, { useState } from "react";
import { Circle, MapContainer, SVGOverlay } from "react-leaflet";
import compressed from "./compressed.json";
import CountrySelect from "./CountrySelect";
import { getDF } from "./functions";
import HofstedeChart from "./HofstedeChart";
import { CRS } from "leaflet";
import "./HofstedeMap.css";

/**
 * The data in compressed.json is generated after running t-SNE over the original
 * countries.json data for the first 6 dimensions. The resultant data is 2-dimensional.
 */
const HofstedeMap: React.FC = () => {
  const countries = getDF();
  const data = compressed.map((e, i) => {
    return { ...e, title: countries[i].title };
  });
  const randId = countries[Math.floor(Math.random() * countries.length)].id;
  const [selectedCountryId, setSelectedCountryId] = useState(randId);
  const selectedCountry = countries.find((e) => e.id === selectedCountryId);

  return (
    <Row>
      <Col md={8} sm={24} xs={24}>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexDirection: "column",
            padding: 16,
          }}
        >
          <Alert
            showIcon
            type="info"
            message="The map on the right shows all countries on a 2D map. The closer the countries are, the similar they are in their culture (according to hofstede score in 6 dimensions). This visualization is achieved by doing dimensionality reduction using t-SNE."
          />
          <CountrySelect
            countries={countries}
            onSelect={(e) => setSelectedCountryId(e.id)}
            onClear={() => setSelectedCountryId(0)}
          />
          {selectedCountry ? (
            <Card title={selectedCountry.title}>
              <HofstedeChart countryValues={selectedCountry} />
            </Card>
          ) : (
            <Empty description="Select a country to see data" />
          )}
        </div>
      </Col>
      <Col md={16} sm={24} xs={24}>
        <MapContainer
          center={[1.6, -1]}
          zoomSnap={0.25}
          zoom={5.5}
          style={{ height: "100vh" }}
          crs={CRS.Simple}
        >
          {data.map((e) => {
            const selected = e.id === selectedCountryId;
            const fontSize = selected ? 16 : 12;
            return (
              <>
                <Circle
                  radius={selected ? 0.06 : 0.04}
                  center={[e.x, e.y]}
                  pathOptions={{ color: selected ? "#cc0000" : "#cc6666" }}
                  // onClick={() => setSelectedCountryId(e.id)}
                />
                <SVGOverlay
                  key={e.id}
                  bounds={[
                    [e.x - 10, e.y],
                    [e.x, e.y + 10],
                  ]}
                >
                  <text
                    x={0}
                    y={4 + fontSize}
                    fontSize={fontSize}
                    fontWeight={selected ? 700 : 400}
                    fill={selected ? "black" : "#555"}
                  >
                    {e.title}
                  </text>
                </SVGOverlay>
              </>
            );
          })}
        </MapContainer>
      </Col>
    </Row>
  );
};

export default HofstedeMap;
