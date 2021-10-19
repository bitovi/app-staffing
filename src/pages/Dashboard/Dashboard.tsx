import Table, { Cell, Header, Row } from "../../components/Table";

export default function Dashboard(): JSX.Element {
  return (
    <div>
      <Table>
        <Header>
          <Cell>Department</Cell>
          <Cell align="right">Week 1</Cell>
          <Cell align="right">Week 2</Cell>
          <Cell align="right">Week 3</Cell>
          <Cell align="right">Week 4</Cell>
          <Cell align="right">Week 5</Cell>
          <Cell align="right">Q1</Cell>
        </Header>
        <Row>
          <Cell>User Experience</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
        </Row>
        <Row>
          <Cell>Angular</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
        </Row>
        <Row>
          <Cell>React</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
          <Cell align="right">1 | 0</Cell>
        </Row>
      </Table>
    </div>
  );
}
