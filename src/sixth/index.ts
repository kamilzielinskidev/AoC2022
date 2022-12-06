import assert from 'assert';
import fs from 'fs';

import { pipe } from '@mobily/ts-belt';

const checkIfCharactersDuplicate = (arrayToCheck: string[]) => {
  return arrayToCheck.reduce((acc, next, index, arr) => {
    const toCheckArr = arr.slice(index + 1);
    const hasDuplicate = toCheckArr.find((v) => v === next);

    return hasDuplicate !== undefined ? true : acc;
  }, false);
};

assert.deepEqual(checkIfCharactersDuplicate(["a", "b", "c", "d"]), false);
assert.deepEqual(checkIfCharactersDuplicate(["a", "b", "c", "a"]), true);

const findIndexOfNonReapeatingFours = (v: string): number => {
  const arr = v.split("");

  for (let i = 3; i < v.length; i++) {
    const toCheck = arr.slice(i - 3, i + 1);
    if (!checkIfCharactersDuplicate(toCheck)) return i + 1;
  }

  return 0;
};

const findIndexOfNonReapeatingFourteens = (v: string): number => {
  const arr = v.split("");

  for (let i = 13; i < v.length; i++) {
    const toCheck = arr.slice(i - 13, i + 1);
    if (!checkIfCharactersDuplicate(toCheck)) return i + 1;
  }

  return 0;
};

assert.deepEqual(findIndexOfNonReapeatingFourteens("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 19);
assert.deepEqual(findIndexOfNonReapeatingFourteens("bvwbjplbgvbhsrlpgdmjqwftvncz"), 23);
assert.deepEqual(findIndexOfNonReapeatingFourteens("nppdvjthqldpwncqszvftbrmjlhg"), 23);
assert.deepEqual(findIndexOfNonReapeatingFourteens("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 29);
assert.deepEqual(findIndexOfNonReapeatingFourteens("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 26);

pipe(fs.readFileSync(__dirname + "/" + "data", "utf8"), findIndexOfNonReapeatingFourteens, console.log);
