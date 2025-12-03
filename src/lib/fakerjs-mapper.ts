/* eslint-disable @typescript-eslint/no-explicit-any */

import { faker } from "@faker-js/faker";

export function extractFakerFunctions(root: Record<string, any>): string[] {
  const results: string[] = [];
  const visited = new Set<any>();

  function walk(obj: any, path: string[]) {
    if (!obj || typeof obj !== "object") return;

    if (visited.has(obj)) return;
    visited.add(obj);

    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const nextPath = [...path, key];

      if (typeof value === "function") {
        results.push(nextPath.join("."));
      } else if (value && typeof value === "object") {
        walk(value, nextPath);
      }
    }
  }

  walk(root, []);
  return results;
}



const MAIN_GROUPS = [
  "person",
  "internet",
  "location",
  "commerce",
  "company",
  "image",
  "phone",
  "date",
  "number",
  "lorem",
  "finance",
] as const;

export const fakerOptions: { value: string; label: string }[] = MAIN_GROUPS.flatMap(
  (group) => {
    const api = (faker as any)[group];
    if (!api) return [];
    return Object.keys(api)
      .filter((name) => typeof api[name] === "function")
      .map((name) => ({
        value: `${group}.${name}`,
        label: `${group}.${name}`,
      }));
  }
);