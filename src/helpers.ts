export function flatten<T>(arr: ReadonlyArray<any>): T[] {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val),
    []
  );
}

export function last<T>(arr: ReadonlyArray<T>): T | undefined {
  return arr[arr.length - 1];
}

export function init<T>(arr: ReadonlyArray<T>): ReadonlyArray<T> {
  return arr.slice(0, -1);
}

export function sortWith<T>(
  fns: ReadonlyArray<((a: T, b: T) => number)>,
  list: ReadonlyArray<T>
): T[] {
  return fns.reduce((result, fn) => result.sort(fn), list as Array<T>);
}

export function sortBy<T>(
  fn: ((a: T, b: T) => number),
  list: ReadonlyArray<T>
): T[] {
  return list.slice().sort(fn);
}
