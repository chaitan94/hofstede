import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import HofstedeExplorer from "./HofstedeExplorer";
import HofstedeMap from "./HofstedeMap";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/explore" component={HofstedeExplorer} />
        <Route path="/map" component={HofstedeMap} />
        <Route path="*" render={() => <Redirect to="/explore" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
