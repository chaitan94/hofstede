import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div
      style={{
        padding: "10vw",
        display: "flex",
        gap: 32,
      }}
    >
      <Link to="/explore">
        <Card title="Explore mode">
          Show top 9 countries matching your criteria
        </Card>
      </Link>
      <Link to="/map">
        <Card title="Map mode">
          Show all countries on a 2D map, culturally distanced
        </Card>
      </Link>
    </div>
  );
};

export default Home;
