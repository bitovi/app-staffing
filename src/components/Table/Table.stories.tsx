import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Table, Header, Row, Cell } from ".";

export default {
  title: "Components/Table",
  component: Table,
} as ComponentMeta<typeof Table>;

export const Basic: ComponentStory<typeof Table> = () => (
  <Table>
    <Header>
      <Cell>Color</Cell>
      <Cell>Hex</Cell>
      <Cell> </Cell>
    </Header>
    <Row>
      <Cell>Red</Cell>
      <Cell>#ff0000</Cell>
      <Cell>
        <div
          style={{
            backgroundColor: "#f00",
            width: "100%",
            height: "100%",
          }}
        />
      </Cell>
    </Row>
    <Row>
      <Cell>Green</Cell>
      <Cell>#00ff00</Cell>
      <Cell>
        <div
          style={{
            backgroundColor: "#0f0",
            width: "100%",
            height: "100%",
          }}
        />
      </Cell>
    </Row>
    <Row>
      <Cell>Blue</Cell>
      <Cell>#0000ff</Cell>
      <Cell>
        <div
          style={{
            backgroundColor: "#00f",
            width: "100%",
            height: "100%",
          }}
        />
      </Cell>
    </Row>
  </Table>
);
