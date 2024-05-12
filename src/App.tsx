import { useState } from "react";
import { StitchGrid } from "./StitchGrid";
import { OMDC, OMPattern } from "./util";

function App() {
  const [numRows, setNumRows] = useState(21);
  const [numCols, setNumCols] = useState(21);
  const [pattern, setPattern] = useState<OMPattern>({
    colour_primary: "dimgrey",
    colour_secondary: "whitesmoke",
    rows: Array.from({ length: numRows }, (_, i) => ({
      isPrimaryColour: i % 2 === 0,
      stitches: Array.from({ length: numCols }, (_, j) => ({
        col: j,
        row: i,
        dcs: new Set(),
        isCovered: false,
      })),
    })),
  });

  const toggleDC_S = (col: number, row: number) => {
    if (
      row < 2 ||
      row >= numRows ||
      col < 0 ||
      col >= numCols ||
      (row !== numRows - 1 &&
        pattern.rows[row + 1].stitches[col].dcs.has(OMDC.DC_S)) ||
      pattern.rows[row - 1].stitches[col].dcs.size > 0
    ) {
      console.error(
        `Error attempting to add invalid double crochet at column ${col}, row ${row}`
      );
      return;
    }

    setPattern((oldPattern) => ({
      ...oldPattern,
      rows: oldPattern.rows.map((currentRow, i) => {
        if (i === row) {
          return {
            ...currentRow,
            stitches: currentRow.stitches.map((currentStitch, j) => {
              if (j !== col) {
                return currentStitch;
              }
              const newDcs = new Set(currentStitch.dcs);
              if (currentStitch.dcs.has(OMDC.DC_S)) {
                newDcs.delete(OMDC.DC_S);
              } else {
                newDcs.add(OMDC.DC_S);
              }
              return { ...currentStitch, dcs: newDcs };
            }),
          };
        }
        if (i === row - 1) {
          return {
            ...currentRow,
            stitches: currentRow.stitches.map((currentStitch, j) => {
              if (j !== col) {
                return currentStitch;
              }
              return { ...currentStitch, isCovered: !currentStitch.isCovered };
            }),
          };
        }
        return currentRow;
      }),
    }));
  };

  return <StitchGrid pattern={pattern} toggleDC_S={toggleDC_S} />;
}

export default App;
