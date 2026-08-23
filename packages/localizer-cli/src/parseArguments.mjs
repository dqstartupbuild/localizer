export function parseArguments(argumentsList) {
  const [command, ...rest] = argumentsList;
  const options = {};
  for (let index = 0; index < rest.length; index += 1) {
    const item = rest[index];
    if (!item?.startsWith("--")) continue;
    const key = item.slice(2);
    const next = rest[index + 1];
    options[key] = next?.startsWith("--") || !next ? true : next;
    if (options[key] !== true) index += 1;
  }
  return { command, options };
}
