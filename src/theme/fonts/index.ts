import { textStyles as typography } from "./typography";

export const fonts = {
  heading: "Montserrat, serif",
};
// stylings in /typography.ts were being ignored, so they've been
// imported here and spread within this larger textStyles object
export const textStyles = {
  ...typography,
  h1: {
    fontWeight: "bold",
    fontSize: "5xl",
    lineHeight: 4,
    fontStyle: "normal",
  },
  tableHead: {
    fontWeight: 600,
    fontSize: "md",
    lineHeight: 4,
    fontStyle: "normal",
    color: "#3D3D3D",
  },
  bold: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "md",
    lineHeight: "md",

    color: "#4B4B4B",
  },
  normal: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "md",
    lineHeight: "md",
  },
};
