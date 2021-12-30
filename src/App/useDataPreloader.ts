import { useEffect } from "react";

import { loadFixtures } from "../mocks";

export default function useDataPreloader(): void {
  useEffect(() => {
    loadFixtures();
  }, []);
}
