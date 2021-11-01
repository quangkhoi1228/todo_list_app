import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routeElements from "./router/routeElements";

const App: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          {routeElements()}
          <Route>
            <div>404</div>
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
