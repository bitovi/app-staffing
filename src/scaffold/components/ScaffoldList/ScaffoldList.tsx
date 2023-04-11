import { useState } from "react";
import { getDisplays } from "../../services/displays/scaffoldDisplays";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";
import { getMany, suspendPromise } from "../../services/api/api";

import type { Schema } from "../../schemas/schemas";
import type { FlatRecord, ValueComponent } from "../../presentation/interfaces";

interface ScaffoldListProps {
  schema: Schema;
  valueComponents?: { [attribute: string]: ValueComponent };
  useData?: () => FlatRecord[];
  actions?: {
    delete?: () => void;
  };
  children?: React.ReactNode | null;
}

const ScaffoldList: React.FC<ScaffoldListProps> = ({
  schema,
  valueComponents,
  useData,
  actions,
  children,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { List, Modal, defaultValueComponents } = useScaffoldPresentation();
  const displays = getDisplays(
    schema,
    valueComponents,
    defaultValueComponents,
    children,
  );

  // @todo implement this in a better way when data layer is implemented
  if (!useData) {
    const resource = suspendPromise(getMany(schema));
    useData = () => resource.read();
  }

  return (
    <>
      <List displays={displays} useData={useData} />
      {actions?.delete && (
        <Modal
          open={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        />
      )}
    </>
  );
};

export default ScaffoldList;
