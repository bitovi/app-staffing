import { ProjectedData } from "../../timeline";
import { projectedData } from "./fixtures";

export const useProjection = (): { projectedData: ProjectedData[] } => {
  return {
    projectedData,
  };
};
