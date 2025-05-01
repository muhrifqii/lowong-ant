export function getPagination(page: number, size: number = 10) {
  const limit = +size;
  const from = page * limit;
  const to = from + size - 1;

  return { from, to };
}
