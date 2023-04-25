import { getDisplays } from "../../services/displays/scaffoldDisplays";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";
import { getMany } from "../../services/api/api";

import type { Schema } from "../../schemas/schemas";
import type { FlatRecord, ValueComponent } from "../../presentation/interfaces";

interface ScaffoldListProps {
  schema: Schema;
  valueComponents?: { [attribute: string]: ValueComponent };
  useData?: () => FlatRecord[];
  children?: React.ReactNode | null;
}

const ScaffoldList: React.FC<ScaffoldListProps> = ({
  schema,
  valueComponents,
  useData,
  children,
}) => {
  const { List, defaultValueComponents } = useScaffoldPresentation();
  const displays = getDisplays(
    schema,
    valueComponents,
    defaultValueComponents,
    children,
  );

  // @todo implement this in a better way when data layer is implemented
  if (!useData) {
    const resource = getMany(schema);
    useData = () => resource.read();
  }

  return <List displays={displays} useData={useData} />;
};

export default ScaffoldList;
