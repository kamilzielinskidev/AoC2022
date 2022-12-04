import fs from 'fs';

import { A, pipe, S } from '@mobily/ts-belt';

pipe(
  fs.readFileSync(__dirname + "/" + "data", "utf8"),
  S.split("\n"),
  A.map(S.split(",")),
  A.map(A.map(S.split("-"))),
  A.map(A.map(A.map(parseInt))),
  A.map((v) => v as [[number, number], [number, number]]),
  // A.reduce(0, (acc, pair) => {
  //   if (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) return acc + 1;
  //   if (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) return acc + 1;
  //   return acc;
  // }),
  A.reduce(0, (acc, pair) => {
    if (pair[0][1] >= pair[1][0] && pair[0][0] <= pair[1][1]) return acc + 1;
    return acc;
  }),
  console.log
);
