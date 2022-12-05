import assert from 'assert';
import fs from 'fs';
import { transpose } from 'mathjs';

import { A, G, pipe, S } from '@mobily/ts-belt';

type CratesRow = readonly string[];
type CratesMap = readonly CratesRow[];
type Orders = [number, number, number];

const parseCratesHorizontalRow = (row: readonly string[]): (string | null)[] => {
  return row.reduce((acc, item, index) => {
    if (index % 4 !== 1) return acc;
    if (index % 4 === 1 && item === " ") return [...acc, null];
    return [...acc, item];
  }, [] as (string | null)[]);
};

assert.deepEqual(parseCratesHorizontalRow([" ", " ", " ", " ", "[", "D", "]", " ", " ", " ", " "]), [null, "D", null]);

assert.deepEqual(parseCratesHorizontalRow(["[", "N", "]", " ", "[", "C", "]", " ", " ", " ", " "]), ["N", "C", null]);

const getCrates = (data: readonly string[]): CratesMap => {
  return pipe(
    data,
    A.map(S.split("")),
    A.map(parseCratesHorizontalRow),
    (x) => transpose(x as any),
    (x) => x as CratesMap,
    A.map(A.reverse),
    A.map(A.filter(G.isNotNullable))
  );
};

assert.deepEqual(getCrates(["    [D]    ", "[N] [C]    ", "[Z] [M] [P]"]), [["Z", "N"], ["M", "C", "D"], ["P"]]);

const parseOrders = (data: string): Orders => {
  const arr = pipe(data, S.split(" "));
  return [parseInt(arr[1]), parseInt(arr[3]), parseInt(arr[5])];
};

assert.deepEqual(parseOrders("move 1 from 2 to 1"), [1, 2, 1]);

const moveCrate9000 = (cratesMap: CratesMap, orders: Orders): CratesMap => {
  const cratesMapCopy = structuredClone(cratesMap) as string[][];

  const fromIndex = orders[1] - 1;
  const toIndex = orders[2] - 1;

  for (let i = 0; i < orders[0]; i++) {
    const crate = cratesMapCopy[fromIndex].pop() as string;
    cratesMapCopy[toIndex].push(crate);
  }

  return cratesMapCopy;
};

assert.deepEqual(moveCrate9000([["Z", "N"], ["M", "C", "D"], ["P"]], [1, 2, 1]), [["Z", "N", "D"], ["M", "C"], ["P"]]);

assert.deepEqual(moveCrate9000([["Z", "N", "D"], ["M", "C"], ["P"]], [3, 1, 3]), [
  [],
  ["M", "C"],
  ["P", "D", "N", "Z"],
]);

const moveCrate9001 = (cratesMap: CratesMap, orders: Orders): CratesMap => {
  const cratesMapCopy = structuredClone(cratesMap) as string[][];

  const fromIndex = orders[1] - 1;
  const toIndex = orders[2] - 1;

  const toAdd = [] as string[];

  for (let i = 0; i < orders[0]; i++) {
    const crate = cratesMapCopy[fromIndex].pop() as string;
    toAdd.push(crate);
  }

  toAdd.reverse();

  cratesMapCopy[toIndex].push(...toAdd);

  return cratesMapCopy;
};

assert.deepEqual(moveCrate9001([["Z", "N"], ["M", "C", "D"], ["P"]], [1, 2, 1]), [["Z", "N", "D"], ["M", "C"], ["P"]]);

assert.deepEqual(moveCrate9001([["Z", "N", "D"], ["M", "C"], ["P"]], [3, 1, 3]), [
  [],
  ["M", "C"],
  ["P", "Z", "N", "D"],
]);

pipe(
  fs.readFileSync(__dirname + "/" + "data", "utf8"),
  S.split("\n\n"),
  A.map(S.split("\n")),
  ([cratesData, ordersData]) => ({
    packages: getCrates(cratesData.slice(0, cratesData.length - 1)),
    orders: pipe(ordersData, A.map(parseOrders)),
  }),
  ({ packages, orders }) => orders.reduce((acc, nextOrder) => moveCrate9001(acc, nextOrder), packages),
  A.map(A.last),
  A.join(""),
  console.log
);
