import type { Datum } from "../../services/api";

import { useEffect, useState } from "react";
import { getData } from "../../services/api";

export default function Hello({ name }: { name: string }): JSX.Element {
  const [data, setData] = useState<Datum[]>();

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <div>
      <h1>Hello, {name}!</h1>
      {data && (
        <ul>
          {data.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
