import { render, screen } from "@testing-library/react";
import {
  String,
  StringList,
  Number,
  NumberList,
  Boolean,
  BooleanList,
  Date,
  DateList,
  Relationship,
  RelationshipList,
} from ".";

describe("scaffold/components/ScaffoldPresentationProvider/DefaultDisplayComponents", () => {
  describe("String", () => {
    it("works", async () => {
      render(<String value="some string" />);
      expect(await screen.findByText("some string")).toBeInTheDocument();
    });
  });

  describe("StringList", () => {
    it("works", async () => {
      render(<StringList values={["first string", "second string"]} />);
      expect(
        await screen.findByText("first string; second string"),
      ).toBeInTheDocument();
    });
  });

  describe("Number", () => {
    it("formats numbers for us", async () => {
      jest.spyOn(navigator, "language", "get").mockImplementation(() => "us");
      render(<Number value={500600.95} />);
      expect(await screen.findByText("500,600.95")).toBeInTheDocument();
    });

    it("formats numbers for de", async () => {
      jest.spyOn(navigator, "language", "get").mockImplementation(() => "de");
      render(<Number value={500600.95} />);
      expect(await screen.findByText("500.600,95")).toBeInTheDocument();
    });
  });

  describe("NumberList", () => {
    it("formats numbers for us", async () => {
      jest.spyOn(navigator, "language", "get").mockImplementation(() => "us");
      render(<NumberList values={[100, 2000, 300.99]} />);
      expect(await screen.findByText("100; 2,000; 300.99")).toBeInTheDocument();
    });

    it("formats numbers for de", async () => {
      jest.spyOn(navigator, "language", "get").mockImplementation(() => "de");
      render(<NumberList values={[100, 2000, 300.99]} />);
      expect(await screen.findByText("100; 2.000; 300,99")).toBeInTheDocument();
    });
  });

  describe("Boolean", () => {
    it("works", async () => {
      render(<Boolean value={true} />);
      expect(await screen.findByText("true")).toBeInTheDocument();
    });
  });

  describe("BooleanList", () => {
    it("works", async () => {
      render(<BooleanList values={[true, false, true]} />);
      expect(await screen.findByText("true, false, true")).toBeInTheDocument();
    });
  });

  describe("Date", () => {
    it("formats date for us", async () => {
      jest.spyOn(navigator, "language", "get").mockImplementation(() => "us");
      render(<Date value="2025-02-08T00:00:00.000Z" />);
      expect(await screen.findByText("2/8/2025")).toBeInTheDocument();
    });

    it("formats date for de", async () => {
      jest.spyOn(navigator, "language", "get").mockImplementation(() => "de");
      render(<Date value="2025-02-08T00:00:00.000Z" />);
      expect(await screen.findByText("8.2.2025")).toBeInTheDocument();
    });
  });

  describe("DateList", () => {
    it("formats date for us", async () => {
      jest.spyOn(navigator, "language", "get").mockImplementation(() => "us");
      render(
        <DateList
          values={["2025-02-08T00:00:00.000Z", "2025-11-28T00:00:00.000Z"]}
        />,
      );
      expect(
        await screen.findByText("2/8/2025; 11/28/2025"),
      ).toBeInTheDocument();
    });

    it("formats date for de", async () => {
      jest.spyOn(navigator, "language", "get").mockImplementation(() => "de");
      render(
        <DateList
          values={["2025-02-08T00:00:00.000Z", "2025-11-28T00:00:00.000Z"]}
        />,
      );
      expect(
        await screen.findByText("8.2.2025; 28.11.2025"),
      ).toBeInTheDocument();
    });
  });

  describe("Relationship", () => {
    it("works", async () => {
      render(<Relationship value={{ id: "1", label: "label-1" }} />);
      expect(await screen.findByText("label-1")).toBeInTheDocument();
    });
  });

  describe("RelationshipList", () => {
    it("works", async () => {
      render(
        <RelationshipList
          values={[
            { id: "1", label: "label-1" },
            { id: "2", label: "label-2" },
          ]}
        />,
      );
      expect(await screen.findByText("label-1, label-2")).toBeInTheDocument();
    });
  });
});
