import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import HofstedeExplorer from "./HofstedeExplorer";
import HofstedeMap from "./HofstedeMap";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/explore" exact component={HofstedeExplorer} />
        <Route path="/map" exact component={HofstedeMap} />
        <Route path="*" render={() => <Redirect to="/explore" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
