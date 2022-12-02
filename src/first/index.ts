import fs from 'fs';

import { A, N, pipe, S } from '@mobily/ts-belt';

pipe(
  fs.readFileSync(__dirname + "/" + "data", "utf8"),
  S.split("\n\n"),
  A.map(S.split("\n")),
  A.map(A.map((v) => parseInt(v))),
  A.map(A.reduce(0, N.add)),
  A.sort((a, b) => b - a),
  A.take(3),
  A.reduce(0, N.add),
  console.log
);
