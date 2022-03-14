import { Suspense } from "react";
import { render } from "@testing-library/react";
import { clearFixtures, loadFixtures } from "../../../../mocks";
import { projects } from "../../../../mocks/projects/fixtures";
import Serializer from "../../../../services/api/restBuilder/serializer";
import RoleList from "./RoleList";

describe("Pages/Projects/components/RoleList", function () {
  jest.setTimeout(30000);
  jest.useFakeTimers();
  jest.runAllTimers();

  beforeEach(async () => {
    await loadFixtures();
  });

  afterEach(async () => {
    await clearFixtures();
  });

  it("renders button to add a new role", async function () {
    const project = Serializer.deserialize("projects", { data: projects[0] });

    const { findByRole } = render(
      <Suspense fallback={<div>Loading...</div>}>
        <RoleList project={project} />
      </Suspense>,
    );

    await findByRole("button", { name: "Add Role" });
  });
});
