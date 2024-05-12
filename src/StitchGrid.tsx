import { OMPattern } from "./util";
import "./StitchGrid.css";

export type StitchGridProps = {
  pattern: OMPattern;
  toggleDC_S: (col: number, row: number) => void;
};

export function StitchGrid({ pattern, toggleDC_S }: StitchGridProps) {
  return (
    <table>
      {pattern.rows
        .slice(0)
        .reverse()
        .map((row, i) => (
          <tr key={`${i}`}>
            {row.stitches.map((stitch, j) => (
              <td
                key={`${j}`}
                style={{
                  backgroundColor:
                    row.isPrimaryColour !== stitch.isCovered // XOR
                      ? pattern.colour_primary
                      : pattern.colour_secondary,
                }}
                onClick={() => toggleDC_S(j, pattern.rows.length - i)}
              ></td>
            ))}
          </tr>
        ))}
    </table>
  );
}
