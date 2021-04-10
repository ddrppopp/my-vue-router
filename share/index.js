export function normalizePath(path, parent) {
  return parent && parent.path ? `${parent.path}/${path}` : path;
}