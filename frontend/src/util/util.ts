export function coinDateFormater(date: string, sep = "\n"): string {
  return `${date.slice(0, 10)}${sep}${date.slice(12, 19)}`;
}
