import assert from 'assert';
import fs from 'fs';

import { A, pipe, S } from '@mobily/ts-belt';

const calculateItemValue = (item: string): number => {
  const ascii = item.charCodeAt(0);
  return ascii > 96 ? ascii - 96 : ascii - 64 + 26;
};

const splitInHalf = (value: string): [string, string] => {
  const halfLen = value.length / 2;
  return [value.slice(0, halfLen), value.slice(halfLen)];
};

const getUniqueCommons = ([firstHalf, secondHalf]: [
  string,
  string
]): string[] => {
  return firstHalf.split("").reduce((acc, item) => {
    if (acc.includes(item)) return acc;

    if (secondHalf.includes(item)) return [...acc, item];

    return acc;
  }, [] as string[]);
};

const getUniqueCommonsInThreeGroups = ([firstPart, secondPart, thirdPart]: [
  string,
  string,
  string
]): string[] => {
  return firstPart.split("").reduce((acc, item) => {
    if (acc.includes(item)) return acc;

    if (secondPart.includes(item) && thirdPart.includes(item))
      return [...acc, item];

    return acc;
  }, [] as string[]);
};

const calculateMultipleValues = (items: readonly string[]): number => {
  return items.reduce((acc, next) => acc + calculateItemValue(next), 0);
};

// TODO: to redo
const groupByThree = <B, A extends B>(v: readonly A[]): [B, B, B][] => {
  const result = [];
  for (let index = 0; index < v.length; index++) {
    const group = Math.floor(index / 3);
    result[group] = result[group] ?? [];
    (result[group] as B[]).push(v[index]);
  }
  return result;
};

pipe(
  fs.readFileSync(__dirname + "/" + "data", "utf8"),
  S.split("\n"),
  groupByThree,
  A.map(getUniqueCommonsInThreeGroups),
  A.flat,
  calculateMultipleValues,
  console.log
);

assert.deepEqual(calculateItemValue("a"), 1);
assert.deepEqual(calculateItemValue("p"), 16);
assert.deepEqual(calculateItemValue("Z"), 52);

assert.deepEqual(splitInHalf("vJrwpWtwJgWrhcsFMMfFFhFp"), [
  "vJrwpWtwJgWr",
  "hcsFMMfFFhFp",
]);

assert.deepEqual(getUniqueCommons(["vJrwpWtwJgWr", "hcsFMMfFFhFp"]), ["p"]);
assert.deepEqual(getUniqueCommons(["vJrwpWtwJghWr", "hcsFMMfFFhFpM"]), [
  "p",
  "h",
]);

assert.deepEqual(calculateMultipleValues(["p", "L", "P"]), 96);

assert.deepEqual(groupByThree([1, 2, 3, 4, 5, 6, 7, 8, 9]), [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);
