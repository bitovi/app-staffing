import { render, screen } from "@testing-library/react";
import Table, { Cell, Header, Row } from ".";

describe("Components/Table", () => {
  it("renders child Cell text and elements", async () => {
    render(
      <Table>
        <Header>
          <Cell>Header 1</Cell>
          <Cell>Header 2</Cell>
        </Header>
        <Row>
          <Cell>Row 1 - Cell 1</Cell>
          <Cell>
            <div data-testid="test-div" />
          </Cell>
        </Row>
        <Row>
          <Cell>Row 2 - Cell 1</Cell>
          <Cell>Row 2 - Cell 2</Cell>
        </Row>
      </Table>,
    );

    // Can render headers
    expect(screen.getByText("Header 1")).toBeInTheDocument();
    // Can render cells
    expect(screen.getByText("Row 2 - Cell 2")).toBeInTheDocument();
    // Can render JSX in cells
    expect(screen.getByTestId("test-div")).toBeInTheDocument();
  });
});
