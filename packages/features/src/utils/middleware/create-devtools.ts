import { devtools } from "zustand/middleware";

export const createDevtools =
  (name: string, enabled?: boolean): typeof devtools =>
  (initializer) => {
    let showDevtools = enabled ?? false;

    // check url to show devtools
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const debug = url.searchParams.get("debug");
      if (debug === "true") {
        showDevtools = true;
      }
    }

    return devtools(initializer, {
      name,
      enabled: showDevtools,
    });
  };
