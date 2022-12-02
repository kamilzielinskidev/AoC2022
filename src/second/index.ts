import fs from 'fs';

import { A, pipe, S } from '@mobily/ts-belt';

type MyFigure = "X" | "Y" | "Z";
type OpponentFigure = "A" | "B" | "C";
type KnownResult = "X" | "Y" | "Z";

const getPointsFromFigure = (a: MyFigure): number =>
  a === "X" ? 1 : a === "Y" ? 2 : 3;

const getResultWhenIPickFigure = ([opponentFigure, myFigure]: [
  OpponentFigure,
  MyFigure
]): number => {
  if (opponentFigure === "A" && myFigure === "X") return 3;
  if (opponentFigure === "A" && myFigure === "Y") return 6;
  if (opponentFigure === "A" && myFigure === "Z") return 0;
  if (opponentFigure === "B" && myFigure === "X") return 0;
  if (opponentFigure === "B" && myFigure === "Y") return 3;
  if (opponentFigure === "B" && myFigure === "Z") return 6;
  if (opponentFigure === "C" && myFigure === "X") return 6;
  if (opponentFigure === "C" && myFigure === "Y") return 0;
  if (opponentFigure === "C" && myFigure === "Z") return 3;
  throw Error("coś nieuwzlgędnione");
};

const getResultWhenResultKnown = (a: KnownResult): number =>
  a === "X" ? 0 : a === "Y" ? 3 : 6;

const calculatePointFromWhatIPickedToAchieveResult = ([
  opponentFigure,
  result,
]: [OpponentFigure, KnownResult]): number => {
  if (opponentFigure === "A" && result === "X") return getPointsFromFigure("Z");
  if (opponentFigure === "A" && result === "Y") return getPointsFromFigure("X");
  if (opponentFigure === "A" && result === "Z") return getPointsFromFigure("Y");
  if (opponentFigure === "B" && result === "X") return getPointsFromFigure("X");
  if (opponentFigure === "B" && result === "Y") return getPointsFromFigure("Y");
  if (opponentFigure === "B" && result === "Z") return getPointsFromFigure("Z");
  if (opponentFigure === "C" && result === "X") return getPointsFromFigure("Y");
  if (opponentFigure === "C" && result === "Y") return getPointsFromFigure("Z");
  if (opponentFigure === "C" && result === "Z") return getPointsFromFigure("X");
  throw Error("coś nieuwzlgędnione");
};

pipe(
  fs.readFileSync(__dirname + "/" + "data", "utf8"),
  S.split("\n"),
  A.map(S.split(" ")),
  A.map((values) => values as [OpponentFigure, MyFigure]),
  A.reduce(
    0,
    (acc, [opponentFigure, result]: [OpponentFigure, MyFigure]) =>
      acc +
      getResultWhenResultKnown(result) +
      calculatePointFromWhatIPickedToAchieveResult([opponentFigure, result])
  ),
  console.log
);
