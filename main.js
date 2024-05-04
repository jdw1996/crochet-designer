const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

const NUM_ROWS = 10;
const NUM_COLS = 10;
const STITCH_SIZE = 10;

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

for (let i = 0; i < PROJECT.length; ++i) {
  if (PROJECT[i].length > 0 && PROJECT[i][0].isPrimaryColour) {
    CTX.fillStyle = "black";
  } else {
    CTX.fillStyle = "grey";
  }
  CTX.fillRect(
    0,
    i * STITCH_SIZE,
    PROJECT[i].length * STITCH_SIZE,
    STITCH_SIZE
  );
}
