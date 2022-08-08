import { colors } from "../../../../theme/colors";

// typescript enforces that the key has to match exactly whats in the dictionary.
export function getConfidenceColor(
  confidence: number,
  confidenceType = "startConfidence",
): string {
  confidence = Math.max(0, Math.min(confidence, 1));
  confidence = Math.round(confidence * 10) * 10;
  if (confidenceType == "startConfidence") {
    switch (confidence) {
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
      //   default:
      //     return colors.start_confidence[0];
    }
  } else {
    if (confidence < 31) {
      return colors.end_confidence[30];
    }
    if (confidence < 51) {
      return colors.end_confidence[50];
    }
    if (confidence < 100) {
      return colors.end_confidence[70];
    } else {
      return colors.end_confidence[30];
    }
  }
  return colors.start_confidence[0];
}

export const getRandomSkillColor = () => {
  const options = Object.values(colors.skills);
  const random = options[Math.floor(Math.random() * options.length)];
  return random;
};
export default getConfidenceColor;
