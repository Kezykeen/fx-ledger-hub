import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { authRoutes, dashboardRoutes } from "./routes";

function generateRoutes(routes) {
  return routes.map((element) => {
    if (element.children && element.children.length > 0) {
      return (
        <Route key={element.path} path={element.path} element={element.element}>
          {generateRoutes(element.children)}
        </Route>
      );
    } else {
      return (
        <Route
          key={element.path}
          path={element.path}
          element={element.element}
        />
      );
    }
  });
}

const generatedAuthRoutes = generateRoutes(authRoutes);

const generatedDashboardRoutes = generateRoutes(dashboardRoutes);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {generatedAuthRoutes}
      {generatedDashboardRoutes}
      <Route path="*" element={<div>page not found</div>} />
    </>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
