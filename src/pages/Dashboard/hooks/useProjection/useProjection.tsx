import React, { useEffect, useState } from "react";
import { TimescaleData } from "../../../../services/timeReport/timesReport";
import { ProjectedData } from "../../../../services/timeReport/interfaces";
import { useEmployees, useProjects, useRoles } from "../../../../services/api";

type useProjectionProps = {
  timeFrames: TimescaleData[];
};

/**
 * hook used for fetching dashboard data.
 */
function useProjection({
  timeFrames,
}: useProjectionProps): [isLoading: boolean, projectedData?: ProjectedData] {
  const startDate = timeFrames[0];
  const endDate = timeFrames[timeFrames.length - 1];

  const [isLoading, setLoading] = useState<boolean>(true);
  const [projectedData, setProjectedData] = useState<ProjectedData>();

  useEffect(() => {
    // fetch roles;
    const roles = useRoles({});

    // fetch projects;
    const projects = useProjects({
      filter: {}, // fetch projects in range.
    });

    // fetch employees;
    const employees = useEmployees({});
  }, []);

  return [isLoading, projectedData];
}

export default useProjection;
