const NUM_ROWS = 10;
const NUM_COLS = 10;
const PROJECT = Array.from({ length: NUM_ROWS }, (_, i) =>
  Array.from({ length: NUM_COLS }, (_, j) => ({
    row: i,
    col: j,

    hasSW2: false,
    hasSW1: false,
    hasDC: false,
    hasSE1: false,
    hasSE2: false,
    isPrimaryColour: i % 2 === 0,
  }))
);

console.log(PROJECT);
