import { useState } from "react";
import { StitchGrid } from "./StitchGrid";
import { OMPattern } from "./util";

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
      })),
    })),
  });

  return <StitchGrid pattern={pattern} />;
}

export default App;
