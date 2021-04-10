import Router from "./index.js";
import { normalizePath } from "./share/index.js";
export default function createMatch(routes) {
  const { pathList, pathMap } = createRouteMap(routes);
  console.log(pathList, pathMap);
  function match(location) {
    return pathMap[location];
  }
  function addRoute(parentName, route) {
    if (parentName instanceof Router) {
      route = parentName;
    }
    createRouteMap([route], pathList, pathMap);
  }
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap);
  }
  function getRoutes() {
    return pathMap;
  }
  return {
    match,
    addRoute,
    getRoutes,
  };
}

function addRouteRecord(route, pathList, pathMap, parent) {
  let { path, children = [], component, name } = route;
  const normalizedPath = normalizePath(path, parent);
  const record = {
    path: normalizedPath,
    component,
    name,
  };
  if (!pathMap[normalizedPath]) {
    pathMap[normalizedPath] = record;
    pathList.push(normalizedPath);
  }
  children.forEach((child) => {
    addRouteRecord(child, pathList, pathMap, route);
  });
}
function createRouteMap(routes, oldPathList, oldPathMap) {
  let pathList = oldPathList || [];
  let pathMap = oldPathMap || {};
  routes.forEach((route) => {
    addRouteRecord(route, pathList, pathMap);
  });
  return {
    pathList,
    pathMap,
  };
}
