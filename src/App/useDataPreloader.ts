import { useEffect } from "react";

import { loadFixtures } from "../mocks/fixtures";

export default function useDataPreloader(): void {
  useEffect(() => {
    loadFixtures();
  }, []);
}
