import { ComponentChildren } from "npm:preact@10.25.4";

type RemoveIndex<T> = {
  [ K in keyof T as
    string extends K
      ? never
      : number extends K
        ? never
        : symbol extends K
          ? never
          : K
  ]: T[K];
};

declare global {
  export type JSX = ComponentChildren;
  export type PageData<Props extends object = object> = RemoveIndex<Lume.Data> & { children: JSX } & Props;
}
