import { colors } from "../../../../theme/colors";
import getConfidenceColor from "./getConfidenceColor";

describe("start confidence color calculation", () => {
  it("should get a valid start confidence color", () => {
    expect(getConfidenceColor(0.15)).toEqual(colors.start_confidence["20"]);
    expect(getConfidenceColor(0.14)).toEqual(colors.start_confidence["10"]);
    expect(getConfidenceColor(0.16)).toEqual(colors.start_confidence["20"]);
    expect(getConfidenceColor(1000)).toEqual(colors.start_confidence["100"]);
    expect(getConfidenceColor(-1.1)).toEqual(colors.start_confidence["0"]);
    expect(getConfidenceColor(99)).toEqual(colors.start_confidence["100"]);
    expect(getConfidenceColor(0)).toEqual(colors.start_confidence["0"]);
    expect(getConfidenceColor(0.1)).toEqual(colors.start_confidence["10"]);
  });
  it("should get a valid end confidence color", () => {
    expect(getConfidenceColor(0.15, "endConfidence")).toEqual(
      colors.end_confidence["30"],
    );
    expect(getConfidenceColor(45, "endConfidence")).toEqual(
      colors.end_confidence["50"],
    );
    expect(getConfidenceColor(90, "endConfidence")).toEqual(
      colors.end_confidence["70"],
    );
  });
});

export {};
