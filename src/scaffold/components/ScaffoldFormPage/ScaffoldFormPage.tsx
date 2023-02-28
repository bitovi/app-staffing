import ScaffoldForm from "../ScaffoldForm";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";

const ScaffoldFormPage: React.FC<any> = ({ schema }) => {
  const { Layout } = useScaffoldPresentation();

  return (
    <Layout schema={schema}>
      <ScaffoldForm schema={schema} />
    </Layout>
  );
};

export default ScaffoldFormPage;
