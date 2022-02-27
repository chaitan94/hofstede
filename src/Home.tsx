import { Avatar, List } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import map from './images/map.png';
import compass from './images/compass.png';
import { ArrowRightOutlined } from "@ant-design/icons";

const Home: React.FC = () => {
  const data = [
    { icon: compass, title: "Explore Mode", description: "Show top 9 countries matching your criteria", link: "/explore" },
    { icon: map, title: "Map Mode", description: "Show all countries on a 2D map, culturally distanced", link: "/map" },
  ]
  return (
    <div
      style={{
        padding: "10vw",
        display: "grid",
        gap: 32,
      }}
    >
      <h1>Hofstede</h1>
      <p>Select one of the below to continue.</p>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={data}
        renderItem={item => (
          <Link to={item.link}>
            <List.Item style={{ background: 'white' }} actions={[<ArrowRightOutlined />]}>
              <List.Item.Meta
                avatar={<Avatar shape="square" size="large"  src={item.icon} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
};

export default Home;
