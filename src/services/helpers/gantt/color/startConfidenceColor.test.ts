import { colors } from "../../../../theme/colors";
import getStartConfidenceColor from "./startConfidenceColor";

describe("start confidence color calculation", () => {
  it("should get a valid start confidence color", () => {
    expect(getStartConfidenceColor(0.15)).toEqual(
      colors.start_confidence["20"],
    );
    expect(getStartConfidenceColor(0.14)).toEqual(
      colors.start_confidence["10"],
    );
    expect(getStartConfidenceColor(0.16)).toEqual(
      colors.start_confidence["20"],
    );
    expect(getStartConfidenceColor(1000)).toEqual(
      colors.start_confidence["100"],
    );
    expect(getStartConfidenceColor(-1.1)).toEqual(colors.start_confidence["0"]);
    expect(getStartConfidenceColor(99)).toEqual(colors.start_confidence["100"]);
    expect(getStartConfidenceColor(0)).toEqual(colors.start_confidence["0"]);
    expect(getStartConfidenceColor(0.1)).toEqual(colors.start_confidence["10"]);
  });
});

export {};
