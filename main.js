const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

// Values of these don't matter; they're basically an enum.
const DC_SW2 = 0;
const DC_SW1 = 1;
const DC_S = 2;
const DC_SE1 = 3;
const DC_SE2 = 4;

const MILLISECONDS_PER_LOOP = 20;
const NUM_ROWS = 10;
const NUM_COLS = 10;
const STITCH_SIZE = 50;

const COLOUR_PRIMARY = "dimgrey";
const COLOUR_SECONDARY = "whitesmoke";

const PROJECT = Array.from({ length: NUM_ROWS }, (_, i) =>
  Array.from({ length: NUM_COLS }, (_, j) => ({
    col: j,
    row: i,

    dcs: new Set(),
    isPrimaryColour: i % 2 === 0,
  }))
);

// LOGIC

function toggleDC_S(col, row) {
  if (
    row < 2 ||
    row >= NUM_ROWS ||
    col < 0 ||
    col >= NUM_COLS ||
    (row !== NUM_ROWS - 1 && PROJECT[row + 1][col].dcs.has(DC_S)) ||
    PROJECT[row - 1][col].dcs.size > 0
  ) {
    console.error(
      `Error attempting to add invalid double crochet at column ${col}, row ${row}.`
    );
    return;
  }

  const stitch_dcs = PROJECT[row][col].dcs;
  if (stitch_dcs.has(DC_S)) {
    stitch_dcs.delete(DC_S);
  } else {
    stitch_dcs.add(DC_S);
  }
}

// DRAWING

function drawStitch(stitch) {
  CTX.fillStyle = stitch.isPrimaryColour ? COLOUR_PRIMARY : COLOUR_SECONDARY;
  CTX.fillRect(
    STITCH_SIZE * stitch.col,
    STITCH_SIZE * (NUM_ROWS - 1 - stitch.row),
    STITCH_SIZE,
    STITCH_SIZE
  );

  if (stitch.dcs.has(DC_S)) {
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

window.setInterval(() => {
  for (let i = 0; i < PROJECT.length; ++i) {
    for (let j = 0; j < PROJECT[i].length; ++j) {
      drawStitch(PROJECT[i][j]);
    }
  }
}, MILLISECONDS_PER_LOOP);

// EVENT LISTENERS

CANVAS.addEventListener("mousedown", (mouseEvent) => {
  const { offsetX, offsetY } = mouseEvent;
  const col = Math.floor(offsetX / STITCH_SIZE);
  const row = NUM_ROWS - Math.floor(offsetY / STITCH_SIZE);
  toggleDC_S(col, row);
});
