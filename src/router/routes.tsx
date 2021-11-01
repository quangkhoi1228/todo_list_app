import { lazy } from "react";

type Routes = {
  title?: string;
  LoadComponent: React.ComponentType;
  exact: boolean;
  path: string;
};

const routes: Routes[] = [
  {
    title: "Index",
    path: "/",
    LoadComponent: lazy(() => import("../components/pages/index")),
    exact: true,
  },
];

export default routes;
