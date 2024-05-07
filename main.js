const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

// Values of these don't matter; they're basically an enum.
const DC_SW2 = 0;
const DC_SW1 = 1;
const DC_S = 2;
const DC_SE1 = 3;
const DC_SE2 = 4;

const NUM_ROWS = 10;
const NUM_COLS = 10;
const STITCH_SIZE = 50;

const COLOUR_PRIMARY = "dimgrey";
const COLOUR_SECONDARY = "whitesmoke";

const PROJECT = Array.from({ length: NUM_ROWS }, (_, i) =>
  Array.from({ length: NUM_COLS }, (_, j) => ({
    row: i,
    col: j,

    doubles: new Set(),
    isPrimaryColour: i % 2 === 0,
  }))
);

// DRAWING

function drawStitch(stitch) {
  CTX.fillStyle = stitch.isPrimaryColour ? COLOUR_PRIMARY : COLOUR_SECONDARY;
  CTX.fillRect(
    STITCH_SIZE * stitch.col,
    STITCH_SIZE * (NUM_ROWS - 1 - stitch.row),
    STITCH_SIZE,
    STITCH_SIZE
  );

  if (stitch.doubles.has(DC_S)) {
    CTX.strokeStyle = stitch.isPrimaryColour
      ? COLOUR_PRIMARY
      : COLOUR_SECONDARY;
    CTX.lineWidth = 0.9 * STITCH_SIZE;

    CTX.beginPath();
    CTX.moveTo(
      STITCH_SIZE * (stitch.col + 0.5),
      STITCH_SIZE * (NUM_ROWS - stitch.row - 0.5)
    );
    CTX.lineTo(
      STITCH_SIZE * (stitch.col + 0.5),
      STITCH_SIZE * (NUM_ROWS - stitch.row + 1.5)
    );
    CTX.stroke();
  }
}

for (let i = 0; i < PROJECT.length; ++i) {
  for (let j = 0; j < PROJECT[i].length; ++j) {
    drawStitch(PROJECT[i][j]);
  }
}
