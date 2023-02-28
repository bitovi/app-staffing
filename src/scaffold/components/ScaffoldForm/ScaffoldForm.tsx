import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";

const ScaffoldForm: React.FC<any> = ({ schema }) => {
  const { Form } = useScaffoldPresentation();

  return <Form />;
};

export default ScaffoldForm;
