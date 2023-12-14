// Layout
import GuestLayout from "./layout/guest/GuestLayout";

// Component
import NotFound from "./z-global/NotFound";

// Guest Views
import Home from "./views/guest/Home";
import Details from "./views/guest/Details";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

const routerConfig: Record<string, RouteConfig[]> = {
  guest: [
    {
      path: "/",
      element: <GuestLayout />,
      children: [
        // PAGES
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/details/:id",
          element: <Details />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default routerConfig;
