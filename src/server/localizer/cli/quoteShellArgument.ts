export function quoteShellArgument(value: string) {
  return `'${value.replaceAll("'", "'\\''")}'`;
}
