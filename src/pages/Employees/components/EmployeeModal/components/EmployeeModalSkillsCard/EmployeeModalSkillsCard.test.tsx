import { Suspense } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import EmployeeModalSkillsCard from "./EmployeeModalSkillsCard";
import { skills } from "../../../../../../mocks/fixtures";
import { EmployeeFormData } from "../../EmployeeModal";

const EmployeeModalSkillCardMock = ({
  mockSetSkills,
}: {
  mockSetSkills?: any;
}) => {
  const { control } = useForm<EmployeeFormData>();

  return (
    <Suspense fallback={<div></div>}>
      <EmployeeModalSkillsCard
        control={control}
        skills={skills}
        setSkills={mockSetSkills}
      />
    </Suspense>
  );
};

describe("EmployeeModalSkillsCard loads", () => {
  it("renders clickable skill checkboxes", async () => {
    const mockSetSkills = jest.fn();
    render(<EmployeeModalSkillCardMock mockSetSkills={mockSetSkills} />);
    const checkboxes = await screen.findAllByRole("checkbox", {
      checked: false,
    });
    const onScreenIds = Array.from(checkboxes).map(
      (checkbox) => (checkbox as HTMLInputElement).value,
    );
    const skillsIds = skills.map((skill) => skill.id);
    expect(skillsIds).toStrictEqual(onScreenIds);
    userEvent.click(checkboxes[0]);

    const selectedSkills = await screen.findAllByRole("checkbox", {
      checked: true,
    });

    expect(selectedSkills.length).toEqual(1);
  });
});
