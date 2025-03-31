import { useMemo } from "react";
import { useRoutes } from "react-router-dom";
import routes from "@/config/routes";

const useAppRoutes = () => {
  const elements = useMemo(() => {
    return useRoutes([
      ...routes.mainNav.map(({ path, component }) => ({
        path,
        element: component,
      })),
      ...routes.secondNav.map(({ path, component }) => ({
        path,
        element: component,
      })),
    ]);
  }, []);

  return elements;
};

export default useAppRoutes;
