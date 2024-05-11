export enum OMDC {
  DC_SW2,
  DC_SW1,
  DC_S,
  DC_SE1,
  DC_SE2,
}

export type OMStitch = {
  col: number;
  row: number;
  dcs: Set<OMDC>;
};

export type OMRow = {
  isPrimaryColour: boolean;
  stitches: OMStitch[];
};

export type OMPattern = {
  colour_primary: string;
  colour_secondary: string;
  rows: OMRow[];
};
