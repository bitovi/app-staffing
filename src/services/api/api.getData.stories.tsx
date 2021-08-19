import type { Datum } from "./api";

import { Story, Meta } from "@storybook/react";
import { useEffect, useState } from "react";

import { getData } from "./api";

export default {
  title: "Services/API/getData",
} as Meta<{ foo: string }>;

export const Basic: Story<{ foo: string }> = (args) => {
  const [data, setData] = useState<Datum[]>();

  useEffect(() => {
    getData(args.foo).then(setData);
  }, [args.foo]);

  return (
    <ul>
      {data?.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

Basic.args = {
  foo: "hello",
};
