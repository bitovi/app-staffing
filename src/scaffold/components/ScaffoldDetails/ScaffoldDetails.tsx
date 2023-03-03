import { useParams } from "react-router-dom";
import { fetchOne } from "../../services/api/api";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";
import { getDisplays } from "../../services/displays/scaffoldDisplays";

import type { Schema } from "../../schemas/schemas";
import type { FlatRecord, ValueComponent } from "../../presentation/interfaces";

interface ScaffoldDetailsProps {
  schema: Schema;
  valueComponents?: { [attribute: string]: ValueComponent };
  useData?: () => FlatRecord;
  children?: React.ReactNode | null;
}

const ScaffoldDetails: React.FC<ScaffoldDetailsProps> = ({
  schema,
  valueComponents,
  useData,
  children,
}) => {
  const { id } = useParams<{ id: string }>();
  const { Details, defaultValueComponents } = useScaffoldPresentation();
  const displays = getDisplays(
    schema,
    valueComponents,
    defaultValueComponents,
    children,
  );

  if (!useData) {
    const resource = fetchOne(schema, id);
    useData = () => resource.read();
  }

  return <Details displays={displays} useData={useData} />;
};

export default ScaffoldDetails;
