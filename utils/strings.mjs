function toCamelCase(kebabCaseString) {
  return kebabCaseString.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export { toCamelCase };