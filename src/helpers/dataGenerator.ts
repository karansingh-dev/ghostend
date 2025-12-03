/* eslint-disable @typescript-eslint/no-explicit-any */

import { faker } from "@faker-js/faker";


export function generateData(template: Record<string, string>, count: number) {
  const generateItem = () => {
    const result: Record<string, any> = {};
    for (const key in template) {
      const path = template[key].split(".");
      let fn: any = faker;
      for (const p of path) {
        fn = fn?.[p];
      }
      result[key] = typeof fn === "function" ? fn() : null;
    }
    return result;
  };

  if (count === 1) return generateItem();
  return Array.from({ length: count }, generateItem);
}
