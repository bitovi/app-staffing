import { colors } from "../../../../theme/colors";

// typescript enforces that the key has to match exactly whats in the dictionary.
export function getStartConfidenceColor(startConfidence: number): string {
  startConfidence = Math.max(0, Math.min(startConfidence, 1));
  startConfidence = Math.round(startConfidence * 10) * 10;
  switch (startConfidence) {
    case 0:
      return colors.start_confidence[0];
    case 10:
      return colors.start_confidence[10];
    case 20:
      return colors.start_confidence[20];
    case 30:
      return colors.start_confidence[30];
    case 40:
      return colors.start_confidence[40];
    case 50:
      return colors.start_confidence[50];
    case 60:
      return colors.start_confidence[60];
    case 70:
      return colors.start_confidence[70];
    case 80:
      return colors.start_confidence[80];
    case 90:
      return colors.start_confidence[90];
    case 100:
      return colors.start_confidence[100];
    default:
      return colors.start_confidence[0];
  }
}

export default getStartConfidenceColor;
