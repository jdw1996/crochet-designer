const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

const NUM_ROWS = 10;
const NUM_COLS = 10;
const STITCH_SIZE = 50;

const COLOUR_PRIMARY = "dimgrey";
const COLOUR_SECONDARY = "whitesmoke";

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

// DRAWING

function drawStitch(stitch) {
  if (stitch.isPrimaryColour) {
    CTX.fillStyle = COLOUR_PRIMARY;
  } else {
    CTX.fillStyle = COLOUR_SECONDARY;
  }
  CTX.fillRect(
    STITCH_SIZE * stitch.col,
    STITCH_SIZE * stitch.row,
    STITCH_SIZE,
    STITCH_SIZE
  );
}

for (let i = 0; i < PROJECT.length; ++i) {
  for (let j = 0; j < PROJECT[i].length; ++j) {
    drawStitch(PROJECT[i][j]);
  }
}
