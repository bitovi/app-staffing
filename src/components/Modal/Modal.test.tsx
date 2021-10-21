import { render, screen } from "@testing-library/react";

import Modal from ".";

describe("Components/Modal", () => {
  it("should be open", () => {
    const mockOnClick = jest.fn();

    render(<Modal title="Testing Modal" isOpen={true} onClose={mockOnClick}>Test Modal</Modal>);

    const modal = screen.getByText(/Testing Modal/i);
    expect(modal).toBeInTheDocument();
  });

  it("should be close", () =>{
    const mockOnClose = jest.fn();

    render(<Modal title="Testing Modal" isOpen={false} onClose={mockOnClose}>Test Modal</Modal>);

    const modal = screen.queryByText(/Testing Modal/i);
    expect(modal).not.toBeInTheDocument();
  });

  // it("should open and close", () => {
  //   expect(screen.queryByText(/Testing Modal/i)).not.toBeInTheDocument();
  //   fireEvent.click(screen.getByText(/Click here/i));
  //   expect(screen.getByText(/Testing Modal/i)).toBeInTheDocument();
  //   fireEvent.click(document);
  //   expect(screen.queryByText(/Testing Modal/i)).not.toBeInTheDocument();
  //   fireEvent.click(screen.getByText(/Click here/i));
  // });
});
