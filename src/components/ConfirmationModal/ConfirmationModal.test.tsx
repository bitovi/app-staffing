import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmationModal from ".";

describe("Components/ConfirmationModal", () => {
  const title = "Delete Project?";
  const message =
    "Are you sure you want to delete the Nike store project? This can’t be undone.";
  const confirmText = "Yes, Remove & Delete";
  const closeText = "No, Return to Page";
  const errorText = "Some Error";

  it("works", async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    render(
      <ConfirmationModal
        title={title}
        message={message}
        closeText={closeText}
        confirmText={confirmText}
        onClose={onClose}
        onConfirm={onConfirm}
        isOpen={true}
        error={errorText}
        confirmButtonVariant="danger"
      />,
    );
    const domTitle = screen.getByText(title);
    expect(domTitle).toBeInTheDocument();

    const domMessage = screen.getByText(message);
    expect(domMessage).toBeInTheDocument();

    const confirmTextButton = screen.getByText(confirmText);
    expect(confirmTextButton).toBeInTheDocument();

    const errorTextDom = screen.getByText(errorText);
    expect(errorTextDom).toBeInTheDocument();

    fireEvent.click(confirmTextButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);

    const closeTextButton = screen.getByText(closeText);
    expect(closeTextButton).toBeInTheDocument();
    fireEvent.click(closeTextButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("If is Loading, disabled buttons", async () => {
    const { rerender } = render(
      <ConfirmationModal
        title={title}
        message={message}
        closeText={closeText}
        confirmText={confirmText}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        isOpen={true}
        isLoading={false}
      />,
    );

    const confirmButton = screen.getByRole("button", {
      name: "confirm button",
    });

    fireEvent.click(confirmButton);

    rerender(
      <ConfirmationModal
        title={title}
        message={message}
        closeText={closeText}
        confirmText={confirmText}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        isOpen={true}
        isLoading={true}
      />,
    );

    expect(confirmButton).toBeDisabled();
  });
});
