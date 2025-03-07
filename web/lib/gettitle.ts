import { ROUTE } from "./constants";
type Id = string | number;

const isPathFunction = (
  path: string | ((id: Id) => string)
): path is (id: Id) => string => {
  return typeof path === "function";
};

const matchDynamicRoute = (
  url: string,
  dynamicPath: string | ((id: Id) => string)
): boolean => {
  if (typeof dynamicPath === "string") {
    return url === dynamicPath;
  }

  const dynamicRouteRegex = new RegExp(
    `^${dynamicPath("dummy").replace("dummy", "[^/]+")}$`
  );
  return dynamicRouteRegex.test(url);
};

const getAllRoutes = (routeObj: any): any[] => {
  let routes: any[] = [];

  for (let key in routeObj) {
    const route = routeObj[key];

    if (typeof route === "object" && "path" in route) {
      routes.push(route);
    } else if (typeof route === "object") {
      routes = routes.concat(getAllRoutes(route));
    }
  }

  return routes;
};

export const getTitleFromUrl = (url: string): string => {
  const routes = getAllRoutes(ROUTE);

  for (let route of routes) {
    console.log("title", route.title);
    if (typeof route.path === "string" && route.path === url) {
      return route.title;
    } else if (isPathFunction(route.path)) {
      if (matchDynamicRoute(url, route.path)) {
        return route.title;
      }
    }
  }

  return "Unknown Page";
};
