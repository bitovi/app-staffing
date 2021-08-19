import type { CardData } from "./api";

import { Story, Meta } from "@storybook/react";
import { useEffect, useState } from "react";

import { getData } from "./api";

export default {
  title: "Services/API/getData",
} as Meta<{ id: string }>;

export const Basic: Story<{ id: string }> = (args) => {
  const [data, setData] = useState<CardData[]>();

  useEffect(() => {
    getData(args.id).then(setData);
  }, [args.id]);

  return (
    <ul>
      {data?.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

Basic.args = {
  id: "hello",
};
