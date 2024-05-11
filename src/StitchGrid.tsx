import { OMPattern } from "./util";
import "./StitchGrid.css";

export type StitchGridProps = {
  pattern: OMPattern;
};

export function StitchGrid({ pattern }: StitchGridProps) {
  return (
    <table>
      {pattern.rows.map((row) => (
        <tr>
          {row.stitches.map(() => (
            <td
              style={{
                backgroundColor: row.isPrimaryColour
                  ? pattern.colour_primary
                  : pattern.colour_secondary,
              }}
            ></td>
          ))}
        </tr>
      ))}
    </table>
  );
}
