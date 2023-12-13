import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContext } from "./context/AuthContext";
import routerConfig from "./router";

const App: React.FC = () => {
  const { user } = useContext(UserContext);
  let selectedRoute = "guest"; // Default to guest route

  // Check the user's status and role to determine the selected route
  if (user.role === "USER") {
    selectedRoute = "guest";
  }

  const routingConfig = routerConfig[selectedRoute];
  return (
    <BrowserRouter>
      <Routes>
        {routingConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
