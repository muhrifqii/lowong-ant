export type Updater<T> = T | ((old: T) => T);
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;
export type RouterlikeType = {
  back: () => void,
  push: (href: string) => void,
  replace: (href: string) => void,
};
export type SlugParam = {
  params: Promise<{ [key: string]: string }>
};
