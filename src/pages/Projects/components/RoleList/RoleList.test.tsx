import { fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { expect, spy } from "chai";
import { projects } from "../../../../services/api/projects/fixtures";
import RoleList from "./RoleList";
const sampleProject = projects[0];
const noRolesProject = JSON.parse(JSON.stringify(sampleProject));
noRolesProject.roles = [];
describe("Pages/Projects/components/RoleLists", () => {
  it("works", () => {
    render(<RoleList
      project={sampleProject}
      onEdit={jest.fn()}
    />);

  });

  it("displays a message if there are no roles", () => {
    const { getByText } = render(
      <RoleList
        project={noRolesProject}
        onEdit={jest.fn()}
      />);

    expect(getByText(/There are no roles/i)).to.have.tagName("div");
  });


  it("calls 'onEdit' when add role button is clicked", () => {
    const onClick = spy();

    const { getByText } = render(<RoleList
      project={sampleProject}
      onEdit={onClick}
    />);

    fireEvent.click(getByText(/Add Role/i));
    expect(onClick).to.have.been.called();

  });
});
